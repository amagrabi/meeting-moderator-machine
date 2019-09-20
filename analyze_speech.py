import io

from google.cloud import speech_v1p1beta1
from google.cloud import language_v1
from google.oauth2 import service_account
from pydub import AudioSegment

CREDENTIALS = service_account.Credentials.from_service_account_file('google_credentials.json')


def convert_ogg2flac(file_path):
    """Takes a .ogg audio file and converts it to .flac"""
    audio = AudioSegment.from_ogg(file_path)
    new_file_path = file_path.split(".")[0] + ".flac"
    audio.export(new_file_path, format="flac")
    return new_file_path


def analyze_text(text, max_topics=5):
    """Takes a text and outputs statistics on sentiments and topics.

        Args:
            text (str)
            max_topics (int)

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
    ratio_sum = sum([topic["ratio"] for topic in topics_out])
    for topic in topics_out:
        topic["ratio"] = round(topic["ratio"]/ratio_sum, 3)

    return sentiment_out, topics_out


def analyze_audio(file_path):
    """Takes an audio file and outputs meeting statistics as a dictionary.

    Args:
        file_path (str)

    Returns:
        Dict[str, Any]

    """

    # Convert files to flac
    if file_path.split(".")[-1] != "flac":
        file_path = convert_ogg2flac(file_path)

    speech_client = speech_v1p1beta1.SpeechClient(credentials=CREDENTIALS)

    config = {
        "enable_speaker_diarization": True,
        "diarization_speaker_count": 2,
        "language_code": "en-US",
        "encoding": speech_v1p1beta1.enums.RecognitionConfig.AudioEncoding.FLAC,
        "max_alternatives": 1,
        "use_enhanced": True
        # "audio_channel_count": 1,
        # "sample_rate_hertz": 48000,
    }

    # Local file
    with io.open(file_path, "rb") as f:
        content = f.read()
    audio = {"content": content}

    # GCS Storage
    # audio = {"uri": file_path}

    operation = speech_client.long_running_recognize(config, audio)
    response = operation.result()

    json_out = {}
    result = response.results[-1]
    alternative = result.alternatives[0]

    json_out["google_transcript"] = alternative.transcript

    json_out["raw_transcript"] = ' '.join([word.word for word in alternative.words])

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

    return json_out


def main():
    from pprint import pprint
    file_path = "audio_samples/meeting_ct_02_1mins.ogg"
    pprint(analyze_audio(file_path))


if __name__ == "__main__":
    main()

