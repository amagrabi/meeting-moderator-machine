import React from "react";
import { Container, Header, Menu, Grid } from "semantic-ui-react";
import * as d3 from "d3";
import Chart from "./Chart";
import AudioControls from "./audio-controls";

const sentimentScale = d3
  .scaleLinear()
  .domain([-1, 1])
  .range(["green", "red"]);

const normalizer = d3
  .scaleLinear()
  .domain([3, 12])
  .range([0, 1]);

const Home = () => {
  const speakers = ["Evi", "Islam", "Amadeus"];
  const topics = ["AI", "Commercetools", "Pizza", "Weather", "Global warming"];

  const data = React.useMemo(
    () => ({
      datasets: [
        {
          label: "AI",
          data: [12, 19, 3, 5, 2, 3],
          backgroundColor: "blue"
        },
        {
          label: "Commercetools",

          data: [12, 19, 3, 5, 2, 3].map(x => x * Math.random()),
          backgroundColor: "red"
        }
      ],
      labels: speakers
    }),
    []
  );
  const options = React.useMemo(
    () => ({
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true
            }
          }
        ]
      }
    }),
    []
  );
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
          <Grid.Column></Grid.Column>
          <Grid.Column>
            <Header>
              <AudioControls />
            </Header>
          </Grid.Column>
          <Grid.Column></Grid.Column>
        </Grid.Row>

        <Grid.Row>
          <Grid.Column>
            <Container style={{ width: "600px" }}>
              <Chart
                width={200}
                height={200}
                type="horizontalBar"
                data={data}
                options={options}
              />
            </Container>
          </Grid.Column>
          <Grid.Column>
            <Container style={{ width: "600px" }}>
              <Chart
                width={200}
                height={200}
                type="pie"
                data={{
                  datasets: [
                    {
                      data: [10, 20, 30],
                      backgroundColor: [
                        "rgba(255, 99, 132, 0.2)",
                        "rgba(54, 162, 235, 0.2)",
                        "rgba(255, 206, 86, 0.2)",
                        "rgba(75, 192, 192, 0.2)",
                        "rgba(153, 102, 255, 0.2)",
                        "rgba(255, 159, 64, 0.2)"
                      ]
                    }
                  ],

                  // These labels appear in the legend and in the tooltips when hovering different arcs
                  labels: ["Red", "Yellow", "Blue"]
                }}
                options={options}
              />
            </Container>
          </Grid.Column>
          <Grid.Column>
            <Container style={{ width: "600px" }}>
              <Chart
                width={200}
                height={200}
                type="horizontalBar"
                data={data}
                options={options}
              />
            </Container>
          </Grid.Column>
        </Grid.Row>

        <Grid.Row>
          <Grid.Column>
            <Container style={{ width: "600px" }}>
              <Chart
                width={200}
                height={200}
                type="bar"
                data={data}
                options={options}
              />
            </Container>
          </Grid.Column>
          <Grid.Column>
            <Container style={{ width: "600px" }}>
              <Chart
                width={200}
                height={200}
                type="bar"
                data={data}
                options={options}
              />
            </Container>
          </Grid.Column>
          <Grid.Column>
            <Container style={{ width: "600px" }}>
              <Chart
                width={200}
                height={200}
                type="bar"
                data={data}
                options={options}
              />
            </Container>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  );
};

export default Home;
