import React from "react";
import PropTypes from "prop-types";
import { Container, Header, Menu } from "semantic-ui-react";
import ChartJs from "chart.js";
import AudioControls from "./audio-controls";

// var myChart = new Chart(ctx, {...});

const Chart = props => {
  const myChartRef = React.useRef(null);
  React.useEffect(() => {
    new ChartJs(myChartRef.current, {
      type: props.type,
      data: props.data,
      options: props.options
    });
  }, [
    myChartRef,
    props.data,
    props.type,
    props.options,
    props.width,
    props.height
  ]);

  return <canvas width={props.width} height={props.height} ref={myChartRef} />;
};
Chart.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number
};
export default Chart;
