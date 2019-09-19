import React from "react";
import { Container, Header, Menu } from "semantic-ui-react";
// import Chart from 'chart.js';
import AudioControls from "./audio-controls";

// var myChart = new Chart(ctx, {...});

const Home = () => {
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
