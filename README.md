# Meeting Moderator Machine

Build a voice-based bot that listens to our meetings and helps to improve them. 

**Potential features**: 
1) Avoid imbalanced meetings in which one person talks too much.
2) Avoid chaotic meetings in which people do not stay on topic.
3) Avoid negative meetings when people.

![demo][demo.png]

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
