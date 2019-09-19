import io

from google.cloud import speech_v1p1beta1
from google.cloud.speech_v1p1beta1 import enums
from google.oauth2 import service_account
from pydub import AudioSegment

CREDENTIALS = service_account.Credentials.from_service_account_file('google_credentials.json')


def convert_ogg2flac(file_path):
    """Takes a .ogg audio file and converts it to .flac"""
    audio = AudioSegment.from_ogg(file_path)
    new_file_path = file_path.split(".")[0] + ".flac"
    audio.export(new_file_path, format="flac")
    return new_file_path


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

    client = speech_v1p1beta1.SpeechClient(credentials=CREDENTIALS)

    config = {
        "enable_speaker_diarization": True,
        "diarization_speaker_count": 2,
        "language_code": "en-US",
        "encoding": enums.RecognitionConfig.AudioEncoding.FLAC,
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

    operation = client.long_running_recognize(config, audio)
    response = operation.result()

    json_out = {}
    for result in response.results:
        alternative = result.alternatives[0]

        json_out["raw_transcript"] = ' '.join([word.word for word in alternative.words])

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

        speaker_tags = [word.speaker_tag for word in alternative.words]
        unique_speakers = set(speaker_tags)
        speaker_ratios = []
        for speaker in unique_speakers:
            speaker_ratios.append({
                "speaker_id": speaker,
                "ratio": round(speaker_tags.count(speaker)/len(speaker_tags), 2)
            })
        json_out["speakers"] = speaker_ratios

    return json_out


def main():
    from pprint import pprint
    file_path = "audio_samples/meeting_ct_02_1mins.ogg"
    pprint(analyze_audio(file_path))


if __name__ == "__main__":
    main()

