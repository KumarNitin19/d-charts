import * as d3 from "d3";
import { useEffect } from "react";

const PieChartData = [30, 9, 18, 20, 5];

export default function PieChart() {
  const margin = 40,
    height = 500,
    width = 500;
  const radius = 500 / 2 - margin;

  const drawPieChart = () => {
    const svg = d3
      .select("#pie-chart")
      .append("svg")
      .attr("height", height)
      .attr("width", width)
      .append("g")
      .attr("transform", `translate(${height / 2}, ${width / 2})`);

    const pie = d3.pie();
    const data_ready = pie(PieChartData);

    const arc = d3
      .arc()
      .innerRadius(0)
      .outerRadius(radius * 0.8);
    const outerArc = d3
      .arc()
      .innerRadius(radius * 0.9)
      .outerRadius(radius * 0.9);

    const colors = d3
      .scaleOrdinal()
      .domain(["a", "b", "c", "d", "e"])
      .range(d3.schemeDark2);

    svg
      .selectAll("path")
      .data(data_ready)
      .join("path")
      .attr("d", arc)
      .attr("stroke", "#fff")
      .attr("stroke-width", "2px")
      .attr("fill", (d) => colors(d.data));

    svg
      .selectAll("polyline")
      .data(data_ready)
      .enter()
      .append("polyline")
      .attr("points", (d) => {
        const posA = arc.centroid(d);
        const posB = outerArc.centroid(d);
        const posC = outerArc.centroid(d);

        const midAngle = d.startAngle + (d.endAngle - d.startAngle) / 2;
        posC[0] = radius * 0.9 * (midAngle < Math.PI ? 1 : -1);
        return [posA, posB, posC];
      })
      .attr("fill", "none")
      .attr("stroke", "#000")
      .attr("stroke-width", "2px");

    svg
      .selectAll("text")
      .data(data_ready)
      .enter()
      .append("text")
      .attr("transform", (d) => {
        const pos = outerArc.centroid(d);

        const midAngle = d.startAngle + (d.endAngle - d.startAngle) / 2;
        pos[0] = radius * 0.9 * (midAngle < Math.PI ? 1 : -1);
        return `translate(${pos[0]}, ${pos[1] + 6})`;
      })
      .attr("text-anchor", (d) => {
        const midAngle = d.startAngle + (d.endAngle - d.startAngle) / 2;
        return midAngle < Math.PI ? "start" : "end";
      })
      .text((d) => d.data);
  };

  useEffect(() => {
    drawPieChart();
  }, []);

  return <div id="pie-chart"></div>;
}
