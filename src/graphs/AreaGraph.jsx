import { useEffect } from "react";
import * as d3 from "d3";

const API_URL =
  "https://raw.githubusercontent.com/holtzy/data_to_viz/master/Example_dataset/3_TwoNumOrdered_comma.csv";

export default function AreaGraph() {
  const drawAreaGraph = () => {
    const margin = { top: 40, right: 40, left: 80, bottom: 80 },
      height = 500 - margin.top - margin.bottom,
      width = 800 - margin.left - margin.right;

    const svg = d3
      .select("#area-graph")
      .append("svg")
      .attr("height", height + margin.top + margin.bottom)
      .attr("width", width + margin.left + margin.right)
      .append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`);

    d3.csv(API_URL, (d) => {
      return {
        date: d3.timeParse("%Y-%m-%d")(d.date),
        value: +d.value,
      };
    }).then((data) => {
      const xAxis = d3
        .scaleTime()
        .range([0, width])
        .domain(d3.extent(data, (d) => d.date));

      const yAxis = d3
        .scaleLinear()
        .range([height, 0])
        .domain([0, d3.max(data, (d) => d.value)]);

      svg
        .append("g")
        .attr("transform", `translate(0, ${height})`)
        .call(d3.axisBottom(xAxis));

      svg.append("g").call(d3.axisLeft(yAxis));

      svg
        .append("path")
        .datum(data)
        .attr(
          "d",
          d3
            .area()
            .x0((d) => xAxis(d.date))
            .y0(yAxis(0))
            .y1((d) => yAxis(d.value))
        )
        .attr("fill", "red")
        .attr("stroke", "#000")
        .attr("stroke-width", "1px");
    });
  };

  useEffect(() => {
    drawAreaGraph();
  }, []);

  return <div id="area-graph"></div>;
}
