import { useEffect } from "react";
import * as d3 from "d3";

export default function ScatterPlotGraph() {
  const margin = { top: 80, right: 80, bottom: 80, left: 80 },
    height = 500 - margin.top - margin.bottom,
    width = 800 - margin.left - margin.right;

  const drawScatterPlotGraph = () => {
    const svg = d3
      .select("#scatter-plot-graph")
      .append("svg")
      .attr("height", height + margin.top + margin.bottom)
      .attr("width", width + margin.right + margin.left)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    d3.csv(
      "https://raw.githubusercontent.com/holtzy/data_to_viz/master/Example_dataset/2_TwoNum.csv"
    ).then((data) => {
      const xAxis = d3
        .scaleLinear()
        .range([0, width])
        .domain(d3.extent(data, (d) => +d.GrLivArea));

      const yAxis = d3
        .scaleLinear()
        .range([height, 0])
        .domain(d3.extent(data, (d) => +d.SalePrice));

      svg
        .append("g")
        .attr("transform", `translate(0, ${height})`)
        .call(d3.axisBottom(xAxis));

      svg.append("g").call(d3.axisLeft(yAxis));

      svg
        .selectAll(".circles")
        .data(data)
        .enter()
        .append("circle")
        .attr("class", "circles")
        .attr("r", 2)
        .attr("cx", (d) => xAxis(d.GrLivArea))
        .attr("cy", (d) => yAxis(d.SalePrice))
        .attr("fill", "red")
        .transition()
        .duration(1000);

      const tooltip = d3
        .select("body")
        .append("div")
        .attr("class", "tooltip")
        .style("opacity", 0)
        .style("background-color", "#000")
        .style("border-radius", "6px")
        .style("color", "#fff")
        .style("padding", "4px")
        .style("width", "fit-content")
        .style("position", "absolute");

      d3.selectAll(".circles")
        .on("mouseover", (event, d) => {
          tooltip
            .style("opacity", 1)
            .html(`Value: ${d.GrLivArea}`)
            .style("left", event.screenX + "px")
            .style("top", event.screenY + "px");
        })
        .on("mouseout", () => tooltip.style("opacity", 0));
    });
  };

  useEffect(() => {
    drawScatterPlotGraph();
  }, []);

  return <div id="scatter-plot-graph"></div>;
}
