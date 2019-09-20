import React from "react";
import {
  Container,
  Header,
  Menu,
  Grid,
  Loader,
  Dimmer,
  Label,
  Input
} from "semantic-ui-react";
import * as d3 from "d3";
import Chart from "./Chart";
import AudioControls from "./audio-controls";

const Home = () => {
  const [speakersCount, setSpeakersCount] = React.useState(3);
  const [sentiment, setSentiment] = React.useState({});
  const [spakersNamesMap, setSpakersNamesMap] = React.useState({});
  const [speakers, setSpeakers] = React.useState([]);
  const [topics, setTopics] = React.useState([]);
  const [transcript, setTranscript] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const getSpeakerColorByRatio = d3
    .scaleLinear()
    .domain(speakers.map(({ ratio }) => ratio))
    .range(d3.schemeSet3);
  const getSpeakerColorByUserId = userId => {
    const speaker = speakers.find(({ speaker_id }) => speaker_id === userId);
    return getSpeakerColorByRatio(speaker.ratio);
  };
  const getSpeakerName = id => spakersNamesMap[id] || id;
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
                  setTranscript(analizedAudio.transcript);
                }}
                setIsLoading={setIsLoading}
                speakersCount={speakersCount}
                setSpeakersCount={setSpeakersCount}
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
          <>
            <Grid.Row>
              <Grid.Column>
                <Container>
                  <details>
                    <summary>Set speakers name</summary>
                    {speakers.map(speaker => (
                      <Label key={speaker.speaker_id}>
                        {speaker.speaker_id}
                        <Input
                          value={getSpeakerName(speaker.speaker_id)}
                          onChange={e => {
                            setSpakersNamesMap({
                              ...spakersNamesMap,
                              [speaker.speaker_id]: e.target.value
                            });
                          }}
                        ></Input>
                      </Label>
                    ))}
                  </details>
                </Container>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column>
                <Container style={{ width: "600px" }}>
                  <h1>Sentiment </h1>
                  <p>How was the general feeling during the meeting</p>
                  <small>
                    Green means more positive, and red means negative
                  </small>
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
                          backgroundColor: d3.schemeSet3
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
                          backgroundColor: d3.schemeSet3
                        }
                      ],

                      // These labels appear in the legend and in the tooltips when hovering different arcs
                      labels: speakers.map(({ speaker_id }) =>
                        getSpeakerName(speaker_id)
                      )
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
            <Grid.Row>
              <Grid.Column>
                <h1>Transcript</h1>
                <Container as="ol">
                  {transcript.map(line => (
                    <li
                      key={line.speaker_id}
                      style={{
                        padding: "10px",
                        borderRadius: "30px",
                        background: getSpeakerColorByUserId(line.speaker_id)
                      }}
                    >
                      <Label style={{ marginRight: "20px" }}>
                        <strong>{`<${getSpeakerName(
                          line.speaker_id
                        )}>`}</strong>
                      </Label>
                      {line.line}
                    </li>
                  ))}
                </Container>
              </Grid.Column>
            </Grid.Row>
          </>
        )}
      </Grid>
    </div>
  );
};

export default Home;
