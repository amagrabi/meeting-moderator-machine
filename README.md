# Meeting Moderator Machine

Voice-based bot that listens to meetings and helps to improve them in the following ways: 

1) Avoid imbalanced meetings in which one person talks too much.
2) Avoid chaotic meetings in which people do not stay on topic.
3) Avoid negative meetings when people are too pessimistic.

File uploads only work with Ogg audio files at the moment.

## Demo Screenshot

![demo](demo.png)

## Environment Setup

Using [Anaconda](https://www.anaconda.com/distribution):

```python
conda create -n meeting-moderator-machine python=3.7
conda activate meeting-moderator-machine
pip install -r requirements.txt
```

For audio file conversion you need to install ffmpeg:  
`brew install ffmpeg`

The backend calls several APIs of the [Google Cloud Platform](https://cloud.google.com/). 
To enable them, you need to create a google cloud project and generate a credentials file with permissions for the Speech, Language and Storage APIs.
This file has to be in the root directory of the repository as `google_credentials.json`.

Audio data uploaded to a GCS storage bucket and analyzed from there. To make this work, create a storage bucket in your GCP project and configure the `GCS_BUCKET_NAME` variable in `analyze_speech.py` accordingly. 

## Running the Website

```python
python main.py
```
