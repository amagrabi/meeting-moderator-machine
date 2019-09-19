import React from "react";
import { Container, Button } from "semantic-ui-react";

const AudioControls = () => {
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [rawTranscript, setRawTranscript] = React.useState("");
  const [transcript, setTranscript] = React.useState([]);
  const [speakers, setSpeakers] = React.useState([]);
  const recorderRef = React.useRef(null);
  const downloadRef = React.useRef(null);

  return (
    <Container text style={{ marginTop: "7em" }}>
      <Button
        primary
        onClick={() => {
          const handleSuccess = function(stream) {
            const activeTracks = stream.getTracks();

            const options = { mimeType: "audio/ogg" };
            const recordedChunks = [];
            recorderRef.current = new MediaRecorder(stream, options);

            recorderRef.current.addEventListener("dataavailable", e => {
              if (e.data.size > 0) {
                recordedChunks.push(e.data);
              }
            });

            recorderRef.current.addEventListener("stop", () => {
              downloadRef.current.href = URL.createObjectURL(
                new Blob(recordedChunks)
              );
              activeTracks.map(track => track.stop());

              downloadRef.current.download = "acetest.wav";
              let form = new FormData();
              form.append("file", new Blob(recordedChunks));
              fetch("/uploadAudio", { method: "post", body: form })
                .then(res => res.json())
                .then(res => {
                  const { raw_transcript, speakers, transcript } = res;
                  setRawTranscript(raw_transcript);
                  setTranscript(transcript);
                  setSpeakers(speakers);
                  // {
                  // "raw_transcript": "hello lit again alone",
                  // "speakers": [
                  //   {
                  //     "ratio": 1.0,
                  //     "speaker_id": 1
                  //   }
                  // ],
                  // "transcript": [
                  //   {
                  //     "line": "hello lit again alone",
                  //     "speaker_id": 1
                  //   }
                  // ]
                  // }
                });
            });

            recorderRef.current.start();
            setIsPlaying(true);
          };

          navigator.mediaDevices
            .getUserMedia({ audio: true, video: false })
            .then(handleSuccess);
        }}
      >
        Start the meeting
      </Button>
      <Button
        disabled={!isPlaying}
        secondary
        onClick={() => {
          setIsPlaying(false);

          recorderRef.current.stop();
        }}
      >
        Stop the meeting
      </Button>
      <Container as="h1">
        <a
          ref={downloadRef}
          href={downloadRef.current && downloadRef.current.href}
        >
          Download
        </a>
      </Container>
      {rawTranscript}
    </Container>
  );
};

export default AudioControls;
