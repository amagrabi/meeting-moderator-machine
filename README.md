# Meeting Moderator Machine

Build a voice-based bot that listens to our meetings and helps to improve them. 

**Potential features**: 
1) Track topics being talked about and alert when people do not stay on topic.
2) Track speaking time of different people and alert when one person talks too much.
3) Send transcript of meeting via email to all participants afterwards.

## Environment Setup

Using [Anaconda](https://www.anaconda.com/distribution):

```python
conda create -n meeting-moderator-machine python=3.7
conda activate meeting-moderator-machine
pip install -r requirements.txt
```

For audio file conversion you need to install ffmpeg:  
`brew install ffmpeg`

## Running the Website

```python
python main.py
```
