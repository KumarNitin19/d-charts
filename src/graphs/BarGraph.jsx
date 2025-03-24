import { useEffect } from "react";

export default function BarChart() {
  const height = 500,
    width = 960,
    margin = 40;

  const drawBarChart = () => {
    const svg = d3
      .select("#bar-chart")
      .append("svg")
      .attr("height", height)
      .attr("width", width)
      .append("g")
      .attr("transform", `translate(${margin}, ${margin})`);
  };

  useEffect(() => {
    drawBarChart();
  }, []);

  return <div id="bar-chart"></div>;
}
