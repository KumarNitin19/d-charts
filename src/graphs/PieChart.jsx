import * as d3 from "d3";
import { useEffect } from "react";

const PieChartData = [30, 9, 18, 20, 5];

export default function PieChart() {
  const height = 500,
    width = 500,
    margin = 40;
  const radius = 500 / 2;

  const drawPieChart = () => {
    const svg = d3
      .select("#pie-chart")
      .append("svg")
      .attr("height", height)
      .attr("width", width)
      .append("g")
      .attr("transform", `translate(${height / 2}, ${width / 2})`);

    const pie = d3.pie().value((d) => d);
    const data = pie(PieChartData);

    const arcGenerater = d3.arc().innerRadius(0).outerRadius(radius);

    const colors = d3
      .scaleOrdinal()
      .domain(["a", "b", "c", "d", "e", "f"])
      .range(d3.schemeDark2);

    const slices = svg
      .selectAll("g")
      .data(data)
      .join("path")
      .attr("d", arcGenerater)
      .attr("fill", (d) => colors(d.data))
      .attr("stroke", "#fff")
      .attr("stroke-width", 2);
  };

  useEffect(() => {
    drawPieChart();
  }, []);

  return <div id="pie-chart"></div>;
}
