import React from "react";
import { Container, Button, Input, Label } from "semantic-ui-react";

const AudioControls = props => {
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [speakersCount, setSpeakersCount] = React.useState(3);
  const recorderRef = React.useRef(null);

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
              // downloadRef.current.href = URL.createObjectURL(
              //   new Blob(recordedChunks)
              // );
              activeTracks.map(track => track.stop());

              // downloadRef.current.download = "acetest.wav";
              let form = new FormData();
              form.append("file", new Blob(recordedChunks));
              form.append("speakers_count", speakersCount);
              props.setIsLoading(true);
              fetch("/uploadAudio", { method: "post", body: form })
                .then(res => res.json())
                .then(res => {
                  props.visualize(res);
                })
                .finally(() => {
                  props.setIsLoading(false);
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
      <Label>
        Speakers count
        <Input
          min={0}
          value={speakersCount}
          onChange={e => setSpeakersCount(e.target.value)}
          icon="users"
          iconPosition="left"
          placeholder="speakers count..."
          type="number"
        ></Input>
      </Label>
    </Container>
  );
};

export default AudioControls;
