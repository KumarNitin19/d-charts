import * as d3 from "d3";
import { useEffect } from "react";

const PieChartData = [30, 9, 18, 20, 5];

export default function PieChart() {
  const height = 500,
    width = 500,
    margin = 40;
  const radius = 500 / 2 - margin;

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

    const arcGenerater = d3
      .arc()
      .innerRadius(0)
      .outerRadius(radius * 0.8);
    const outerArc = d3
      .arc()
      .innerRadius(radius * 0.9)
      .outerRadius(radius * 0.9);

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

    svg
      .selectAll("polyline")
      .data(data)
      .enter()
      .append("polyline")
      .attr("fill", "none")
      .attr("stroke", "#000")
      .attr("stroke-width", "2px")
      .attr("points", (d) => {
        const posA = arcGenerater.centroid(d);
        const posB = outerArc.centroid(d);
        const posC = outerArc.centroid(d);
        const midangle = d.startAngle + (d.endAngle - d.startAngle) / 2;
        posC[0] = radius * 0.9 * (midangle < Math.PI ? 1 : -1);
        return [posA, posB, posC];
      });

    svg
      .selectAll(".labels")
      .data(data)
      .enter()
      .append("text")
      .attr("class", "labels")
      .attr("transform", (d) => {
        const pos = outerArc.centroid(d);
        const midangle = d.startAngle + (d.endAngle - d.startAngle) / 2;
        pos[0] = radius * 0.9 * (midangle < Math.PI ? 1 : -1);
        return `translate(${pos[0]}, ${pos[1] + 6})`;
      })
      .attr("text-anchor", (d) => {
        const midangle = d.startAngle + (d.endAngle - d.startAngle) / 2;
        return midangle < Math.PI ? "start" : "end";
      })
      .text((d) => d?.data);
  };

  useEffect(() => {
    drawPieChart();
  }, []);

  return <div id="pie-chart"></div>;
}
