import React from "react";
import {
  Container,
  Header,
  Menu,
  Grid,
  Loader,
  Dimmer
} from "semantic-ui-react";
import * as d3 from "d3";
import Chart from "./Chart";
import AudioControls from "./audio-controls";

const Home = () => {
  const [sentiment, setSentiment] = React.useState({});
  const [speakers, setSpeakers] = React.useState([]);
  const [topics, setTopics] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);

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
      <Grid columns={3} padded>
        <Grid.Row>
          <Grid.Column />
          <Grid.Column>
            <Header>
              <AudioControls
                visualize={analizedAudio => {
                  setSentiment(analizedAudio.sentiment);
                  setSpeakers(analizedAudio.speakers);
                  setTopics(analizedAudio.topics);
                }}
                setIsLoading={setIsLoading}
              />
            </Header>
          </Grid.Column>
          <Grid.Column />
        </Grid.Row>
        {isLoading ? (
          <Grid.Row>
            <Grid.Column />
            <Grid.Column>
              <Container style={{ width: "600px" }}>
                <Dimmer active inverted>
                  <Loader inverted>Loading</Loader>
                </Dimmer>
              </Container>
            </Grid.Column>
          </Grid.Row>
        ) : speakers.length === 0 ? (
          "No data available"
        ) : (
          <Grid.Row>
            <Grid.Column>
              <Container style={{ width: "600px" }}>
                <h1>Sentiment </h1>
                <p>How was the general feeling during the meeting</p>
                <small>Green means more positive, and red means negative</small>
                <img
                  src="//raw.githubusercontent.com/d3/d3-scale-chromatic/master/img/RdYlGn.png"
                  alt="RdYlGn"
                  width="100%"
                  height="40"
                ></img>
                <Chart
                  width={200}
                  height={200}
                  type="bar"
                  data={{
                    datasets: [
                      {
                        label: "Sentiment",
                        data: [sentiment.magnitude],
                        backgroundColor: [
                          d3.interpolateRdYlGn(
                            d3
                              .scaleLinear()
                              .domain([-1, 1])
                              .range([0, 1])(sentiment.score)
                          )
                        ]
                      }
                    ]
                  }}
                  options={{
                    scales: {
                      yAxes: [
                        {
                          ticks: {
                            suggestedMax: 1,
                            suggestedMin: 0
                          }
                        }
                      ]
                    }
                  }}
                />
              </Container>
            </Grid.Column>
            <Grid.Column>
              <Container style={{ width: "600px" }}>
                <h1>Topics covered </h1>
                <p>What was taked about during the meeting</p>
                <small>
                  The size of each part of the Pie, coresponds to how long it
                  was covered
                </small>
                <Chart
                  width={200}
                  height={200}
                  type="pie"
                  data={{
                    datasets: [
                      {
                        data: topics.map(({ ratio }) => ratio),
                        backgroundColor: d3.schemeTableau10
                      }
                    ],

                    // These labels appear in the legend and in the tooltips when hovering different arcs
                    labels: topics.map(({ topic }) => topic)
                  }}
                  options={{
                    scales: {
                      yAxes: [
                        {
                          ticks: {
                            suggestedMax: 1,
                            suggestedMin: 0
                          }
                        }
                      ]
                    }
                  }}
                />
              </Container>
            </Grid.Column>
            <Grid.Column>
              <Container style={{ width: "600px" }}>
                <h1>Speakers contriputions ratio</h1>
                <p>How long each speaker participated to the meeting</p>
                <small>
                  The size of each part of the Pie, coresponds to how long the
                  speaker talked
                </small>
                <Chart
                  width={200}
                  height={200}
                  type="pie"
                  data={{
                    datasets: [
                      {
                        data: speakers.map(({ ratio }) => ratio),
                        backgroundColor: d3.schemeTableau10
                      }
                    ],

                    // These labels appear in the legend and in the tooltips when hovering different arcs
                    labels: speakers.map(({ speaker_id }) => speaker_id)
                  }}
                  options={{
                    scales: {
                      yAxes: [
                        {
                          ticks: {
                            suggestedMax: 1,
                            suggestedMin: 0
                          }
                        }
                      ]
                    }
                  }}
                />
              </Container>
            </Grid.Column>
          </Grid.Row>
        )}
      </Grid>
    </div>
  );
};

export default Home;
