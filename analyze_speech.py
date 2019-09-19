import io
import os
# import ffmpeg

from google.oauth2 import service_account

CREDENTIALS = service_account.Credentials.from_service_account_file('ct-machine-learning-6795b2605267.json')


# def convert_audio(file_path, output_type="flac"):
#     from pydub import AudioSegment
#     song = AudioSegment.from_wav(file_path)
#     song.export(f'{file_path}.{output_type}', format=output_type)

def sample_long_running_recognize(storage_uri):
    """
    Transcribe long audio file from Cloud Storage using asynchronous speech
    recognition

    Args:
      storage_uri URI for audio file in Cloud Storage, e.g. gs://[BUCKET]/[FILE]
    """
    from google.cloud import speech_v1
    from google.cloud.speech_v1 import enums

    storage_uri = "gs://cthack19-meeting-moderator-machine/audio_samples/meeting_business_01_6mins.mp3"

    client = speech_v1.SpeechClient(credentials=CREDENTIALS)

    # storage_uri = 'gs://cloud-samples-data/speech/brooklyn_bridge.raw'

    # Sample rate in Hertz of the audio data sent
    sample_rate_hertz = 16000

    # The language of the supplied audio
    language_code = "en-US"

    # Encoding of audio data sent. This sample sets this explicitly.
    # This field is optional for FLAC and WAV audio formats.
    encoding = enums.RecognitionConfig.AudioEncoding.FLAC
    config = {
        "sample_rate_hertz": sample_rate_hertz,
        "language_code": language_code,
        "encoding": encoding,
    }
    audio = {"uri": storage_uri}

    operation = client.long_running_recognize(config, audio)

    print(u"Waiting for operation to complete...")
    response = operation.result()

    for result in response.results:
        # First alternative is the most probable result
        alternative = result.alternatives[0]
        print(u"Transcript: {}".format(alternative.transcript))


def analyze_with_speaker_recog(local_file_path):
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

    # local_file_path = os.path.join("audio_samples", "acetest.wav")
    local_file_path = os.path.join("audio_samples", "meeting_school_01_1mins.mp3")

    client = speech_v1p1beta1.SpeechClient(credentials=CREDENTIALS)

    # If enabled, each word in the first alternative of each result will be
    # tagged with a speaker tag to identify the speaker.
    enable_speaker_diarization = True

    # Optional. Specifies the estimated number of speakers in the conversation.
    diarization_speaker_count = 2

    # The language of the supplied audio
    language_code = "en-US"
    encoding = enums.RecognitionConfig.AudioEncoding.MP3

    config = {
        "enable_speaker_diarization": enable_speaker_diarization,
        "diarization_speaker_count": diarization_speaker_count,
        "language_code": language_code,
        "encoding": encoding,
    }
    with io.open(local_file_path, "rb") as f:
        content = f.read()
    audio = {"content": content}

    operation = client.long_running_recognize(config, audio)

    print(u"Waiting for operation to complete...")
    response = operation.result()

    for result in response.results:
        # First alternative has words tagged with speakers
        alternative = result.alternatives[0]
        print(u"Transcript: {}".format(alternative.transcript))
        # Print the speaker_tag of each word
        for word in alternative.words:
            print(u"Word: {}".format(word.word))
            print(u"Speaker tag: {}".format(word.speaker_tag))
