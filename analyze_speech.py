
from google.cloud import speech_v1p1beta1
from google.cloud import language_v1
from google.cloud import storage
from google.oauth2 import service_account
from pydub import AudioSegment

CREDENTIALS = service_account.Credentials.from_service_account_file('google_credentials.json')
GCS_BUCKET_NAME = 'cthack19-meeting-moderator-machine'


def convert_ogg2flac(file_path):
    """Takes a .ogg audio file and converts it to .flac"""
    audio = AudioSegment.from_ogg(file_path)
    new_file_path = file_path.split(".")[0] + ".flac"
    audio.export(new_file_path, format="flac")
    return new_file_path


def analyze_text(text, max_topics=5):
    """Takes a text and outputs statistics on sentiments and topics.

        Args:
            text (str): Raw text to be analzyed.
            max_topics (int): Maximum number of topics shown in the visualization.

        Returns:
            Dict[str, Any]

        """
    language_client = language_v1.LanguageServiceClient(credentials=CREDENTIALS)
    document = {"content": text, "type": language_v1.enums.Document.Type.PLAIN_TEXT, "language": "en"}

    # Analyze sentiment
    sentiment = language_client.analyze_sentiment(document=document).document_sentiment
    sentiment_out = {"score": round(sentiment.score, 2), "magnitude": round(sentiment.magnitude, 2)}

    # Analyze topics
    response = language_client.analyze_entity_sentiment(document, encoding_type=language_v1.enums.EncodingType.UTF8)
    topics = []
    for entity in response.entities:
        topics.append({'topic': entity.name,
                       'ratio': round(entity.salience, 3),
                       'sentiment': round(entity.sentiment.score,3)})
    topics_out = sorted(topics, key=lambda k: k['ratio'], reverse=True)
    topics_out = topics_out[0:max_topics]

    return sentiment_out, topics_out


def analyze_speaker_sentiment(annotated_transcript):
    """Concatenates each speaker's sentences in one text and gets the sentiment score (magnitude is ignored)."""

    language_client = language_v1.LanguageServiceClient(credentials=CREDENTIALS)
    speaker_concatenated_text = {}

    for row in annotated_transcript:
        speaker_id = row['speaker_id']
        line = row['line']
        if speaker_id in speaker_concatenated_text.keys():
            speaker_concatenated_text[speaker_id] = speaker_concatenated_text[speaker_id] + "." + line
        else:
            speaker_concatenated_text[speaker_id] = line

    speaker_sentiment = {}
    for speaker_id in speaker_concatenated_text.keys():
        document = {"content": speaker_concatenated_text[speaker_id],
                    "type": language_v1.enums.Document.Type.PLAIN_TEXT,
                    "language": "en"}
        # Analyze speaker sentiment
        sentiment = language_client.analyze_sentiment(document=document).document_sentiment
        speaker_sentiment[speaker_id] = round(sentiment.score, 2)

    return speaker_sentiment


def analyze_audio(ogg_file_path, speaker_count=3):
    """Takes an audio file and outputs meeting statistics as a dictionary.

    Args:
        ogg_file_path (str): Path to the audio file in ogg-format.
        speaker_count (int): Number of people participating in the meeting.

    Returns:
        Dict[str, Any]

    """

    # Convert audio files to flac
    if ogg_file_path.split(".")[-1] != "flac":
        ogg_file_path = convert_ogg2flac(ogg_file_path)

    speech_client = speech_v1p1beta1.SpeechClient(credentials=CREDENTIALS)

    config = {
        "enable_speaker_diarization": True,
        "diarization_speaker_count": speaker_count,
        "language_code": "en-US",
        "encoding": speech_v1p1beta1.enums.RecognitionConfig.AudioEncoding.FLAC,
        "max_alternatives": 1,
        "use_enhanced": True,
        "sample_rate_hertz": 48000,
    }

    # Upload file to GCS Storage bucket
    client = storage.Client(credentials=CREDENTIALS)
    bucket = client.get_bucket(GCS_BUCKET_NAME)
    blob = bucket.blob(ogg_file_path)
    blob.upload_from_filename(ogg_file_path)
    audio = {"uri": f"gs://{GCS_BUCKET_NAME}/{ogg_file_path}"}

    operation = speech_client.long_running_recognize(config, audio)
    response = operation.result()

    # Empty response when speech to text failed
    if not response.results:
        json_out = {
            "google_transcript": "",
            "raw_transcript": "",
            "transcript": [],
            "speakers": [],
            "topics": [],
            "sentiment": {"score": 0, "magnitude": 0},
        }
        return json_out

    result = response.results[-1]
    alternative = result.alternatives[0]

    json_out = {
        "google_transcript": alternative.transcript,
        "raw_transcript": ' '.join([word.word for word in alternative.words])
    }

    # Get transcript distributed by speakers
    transcript = []
    sentence = []
    last_speaker = alternative.words[0].speaker_tag
    for word in alternative.words:
        current_speaker = word.speaker_tag
        if current_speaker == last_speaker:
            sentence.append(word.word)
        else:
            transcript.append({
                "speaker_id": last_speaker,
                "line": ' '.join(sentence)
            })
            sentence = [word.word]
            last_speaker = current_speaker
    transcript.append({
                "speaker_id": last_speaker,
                "line": ' '.join(sentence)
            })
    json_out["transcript"] = transcript

    # Analyze speakers
    speaker_tags = [word.speaker_tag for word in alternative.words]
    unique_speakers = set(speaker_tags)
    speaker_ratios = []
    for speaker in unique_speakers:
        speaker_ratios.append({
            "speaker_id": speaker,
            "ratio": round(speaker_tags.count(speaker)/len(speaker_tags), 2)
        })
    json_out["speakers"] = speaker_ratios

    # Analyze sentiment and topics
    sentiment, topics = analyze_text(json_out["raw_transcript"])
    json_out["sentiment"] = sentiment
    json_out["topics"] = topics
    # Include speaker sentiment
    speaker_sentiment = analyze_speaker_sentiment(json_out['transcript'])
    for line in json_out['speakers']:
        line.update({'sentiment_score': speaker_sentiment[line['speaker_id']]})

    return json_out


def main():
    from pprint import pprint
    file_path = "audio_samples/01_kitchen.wav"
    pprint(analyze_audio(file_path, speaker_count=2))


if __name__ == "__main__":
    main()
