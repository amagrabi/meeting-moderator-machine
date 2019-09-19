"""Audio conversions and everything else related to audio processing."""

from pydub import AudioSegment
import os


def convert_ogg_to_flac(filename, flac_filename= None):

    song = AudioSegment.from_ogg("/Users/evi/code/meeting-moderator-machine/audio_samples/acetest_ogg.wav")

    if not flac_filename:
        flac_filename = (os.path.splitext("/path/to/some/file.txt")[0]) + '.flac'

    song.export(flac_filename, format="flac")

    return flac_filename
