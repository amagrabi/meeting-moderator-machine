
from google.cloud import speech_v1
from google.cloud.speech_v1 import enums

credentials_location = 'ct-machine-learning-speech-credentials.json'
# client = speech_v1.SpeechClient()


def sample_recognize(storage_uri):
    """
    Transcribe short audio file from Cloud Storage using synchronous speech
    recognition

    Args:
      storage_uri URI for audio file in Cloud Storage, e.g. gs://[BUCKET]/[FILE]
    """

    client = speech_v1.SpeechClient(credentials='ct-machine-learning-speech-credentials.json')

    # storage_uri = 'gs://cloud-samples-data/speech/brooklyn_bridge.raw'

    # Sample rate in Hertz of the audio data sent
    sample_rate_hertz = 16000

    # The language of the supplied audio
    language_code = "en-US"

    # Encoding of audio data sent. This sample sets this explicitly.
    # This field is optional for FLAC and WAV audio formats.
    encoding = enums.RecognitionConfig.AudioEncoding.LINEAR16
    config = {
        "sample_rate_hertz": sample_rate_hertz,
        "language_code": language_code,
        "encoding": encoding,
    }
    audio = {"uri": storage_uri}

    response = client.recognize(config, audio)
    for result in response.results:
        # First alternative is the most probable result
        alternative = result.alternatives[0]
        print(u"Transcript: {}".format(alternative.transcript))


sample_recognize('audio_samples/meeting_school_01_1mins.mp3')


sample_recognize('audio_samples/9s.flac')


import io
import os

# Imports the Google Cloud client library
from google.cloud import speech
from google.cloud.speech import enums
from google.cloud.speech import types

# Instantiates a client
client = speech.SpeechClient(credentials='ct-machine-learning-speech-credentials.json')

# The name of the audio file to transcribe
file_name = os.path.join(
    os.path.dirname(__file__),
    'audio_samples',
    '9s.m4a')

# Loads the audio into memory
with io.open(file_name, 'rb') as audio_file:
    content = audio_file.read()
    audio = types.RecognitionAudio(content=content)

config = types.RecognitionConfig(
    encoding=enums.RecognitionConfig.AudioEncoding.LINEAR16,
    sample_rate_hertz=16000,
    language_code='en-US')

# Detects speech in the audio file
response = client.recognize(config, audio)

for result in response.results:
    print('Transcript: {}'.format(result.alternatives[0].transcript))


#

from google.cloud import speech_v1
from google.cloud.speech_v1 import enums

client = speech_v1.SpeechClient(credentials='ct-machine-learning-speech-credentials.json')

encoding = enums.RecognitionConfig.AudioEncoding.FLAC
sample_rate_hertz = 44100
language_code = 'en-US'
config = {'encoding': encoding, 'sample_rate_hertz': sample_rate_hertz, 'language_code': language_code}
uri = 'audio_samples/9s.m4a'
audio = {'uri': uri}

response = client.recognize(config, audio)

#


from google.cloud import speech_v1
from google.cloud.speech_v1 import enums
import io


def sample_recognize(local_file_path):
    """
    Transcribe a short audio file using synchronous speech recognition

    Args:
      local_file_path Path to local audio file, e.g. /path/audio.wav
    """

    client = speech_v1.SpeechClient()

    # local_file_path = 'resources/brooklyn_bridge.raw'

    # The language of the supplied audio
    language_code = "en-US"

    # Sample rate in Hertz of the audio data sent
    sample_rate_hertz = 16000

    # Encoding of audio data sent. This sample sets this explicitly.
    # This field is optional for FLAC and WAV audio formats.
    encoding = enums.RecognitionConfig.AudioEncoding.LINEAR16
    config = {
        "language_code": language_code,
        "sample_rate_hertz": sample_rate_hertz,
        "encoding": encoding,
    }
    with io.open(local_file_path, "rb") as f:
        content = f.read()
    audio = {"content": content}

    response = client.recognize(config, audio)
    for result in response.results:
        # First alternative is the most probable result
        alternative = result.alternatives[0]
        print(u"Transcript: {}".format(alternative.transcript))
