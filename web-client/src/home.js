import React from "react";
import AudioControls from "./audio-controls";
import Chart from "chart.js";

// var myChart = new Chart(ctx, {...});

const Home = () => {
  const [isPlaying, setIsPlaying] = React.useState(false);
  const recorderRef = React.useRef(null);
  const downloadRef = React.useRef(null);

  return (
    <div>
      <Menu fixed="top" inverted>
        <Container>
          <Menu.Item as="a" header>
            Meeting moderator
          </Menu.Item>
          <Menu.Item as="a">Home</Menu.Item>
        </Container>
      </Menu>

      <Container>
        <Header>
          <AudioControls />
        </Header>
      </Container>
    </div>
  );
};

export default Home;
