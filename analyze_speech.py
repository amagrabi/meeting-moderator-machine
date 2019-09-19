import os
import subprocess
import pprint

from pydub import AudioSegment
from google.oauth2 import service_account

CREDENTIALS = service_account.Credentials.from_service_account_file('ct-machine-learning-6795b2605267.json')


def convert_ogg2flac(file_path):
    audio = AudioSegment.from_ogg(file_path)
    new_file_path = file_path.split(".")[0] + ".flac"
    audio.export(new_file_path, format="flac")
    return new_file_path


def analyze_with_speaker_recog(file_path):
    """
    Print confidence level for individual words in a transcription of a short audio
    file
    Separating different speakers in an audio file recording

    Args:
      local_file_path Path to local audio file, e.g. /path/audio.wav
    """
    from google.cloud import speech_v1p1beta1
    from google.cloud.speech_v1p1beta1 import enums
    import io

    file_path = "audio_samples/meeting_ct_02_1mins.ogg"
    # file_path = "gs://cthack19-meeting-moderator-machine/audio_samples/meeting_business_04_2mins_channel1.ogg"
    # file_path = "audio_samples/meeting_business_04_2mins.ogg"
    # file_path = "audio_samples/acetest_ogg.wav"
    # file_path = "audio_samples/meeting_school_01_1mins_mono.flac"
    # local_file_path = os.path.join("audio_samples", "acetest.flac")
    # local_file_path = os.path.join("audio_samples", "meeting_school_01_1mins.mp3")

    if file_path.split(".")[-1] != "flac":
        file_path = convert_ogg2flac(file_path)

    client = speech_v1p1beta1.SpeechClient(credentials=CREDENTIALS)

    config = {
        "enable_speaker_diarization": True,
        "diarization_speaker_count": 2,
        # "audio_channel_count": 1,
        "language_code": "en-US",
        "encoding": enums.RecognitionConfig.AudioEncoding.FLAC,
        # "sample_rate_hertz": 48000,
        "max_alternatives": 1,
        "use_enhanced": True
    }

    # Local file
    with io.open(file_path, "rb") as f:
        content = f.read()
    audio = {"content": content}

    # GCS Storage
    # audio = {"uri": file_path}

    operation = client.long_running_recognize(config, audio)

    print(u"Waiting for operation to complete...")
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
        transcript.append("Speaker " + str(last_speaker) + ": " + ' '.join(sentence))
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

    pprint.pprint(json_out)
