import { useEffect } from "react";
import * as d3 from "d3";

export default function BarChart() {
  const margin = { top: 40, right: 40, bottom: 80, left: 80 },
    height = 500 - margin.top - margin.bottom,
    width = 960 - margin.left - margin.right;

  const drawBarChart = () => {
    const svg = d3
      .select("#bar-chart")
      .append("svg")
      .attr("height", height + margin.top + margin.bottom)
      .attr("width", width + margin.left + margin.right)
      .append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`);

    d3.csv(
      "https://raw.githubusercontent.com/holtzy/data_to_viz/master/Example_dataset/7_OneCatOneNum_header.csv"
    ).then(function (data) {
      // X axis
      const x = d3
        .scaleBand()
        .range([0, width])
        .domain(data.map((d) => d.Country))
        .padding(0.2);

      svg
        .append("g")
        .attr("transform", `translate(0,${height})`)
        .call(d3.axisBottom(x))
        .selectAll("text")
        .attr("transform", "translate(-10,0)rotate(-45)")
        .attr("text-anchor", "end");
    });
  };

  useEffect(() => {
    drawBarChart();
  }, []);

  return <div id="bar-chart"></div>;
}
