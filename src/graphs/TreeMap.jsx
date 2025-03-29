import { useEffect } from "react";
import * as d3 from "d3";

export default function TreeMap() {
  const margin = { top: 80, right: 80, bottom: 80, left: 80 },
    height = 600 - margin.top - margin.bottom,
    width = 600 - margin.left - margin.right;

  const drawAreaGraph = () => {
    const svg = d3
      .select("#area-graph")
      .append("svg")
      .attr("height", height + margin.top + margin.bottom)
      .attr("width", width + margin.left + margin.right)
      .append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`);

    d3.csv(
      "https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/data_hierarchy_1level.csv"
    ).then((data) => {
      const root = d3
        .stratify()
        .id((d) => d.name)
        .parentId((d) => d.parent)(data);

      root.sum((d) => +d.value);

      d3.treemap().size([height, width]).padding(4)(root);

      svg
        .selectAll("rect")
        .data(root.leaves())
        .join("rect")
        .attr("x", (d) => d.x0)
        .attr("y", (d) => d.y0)
        .attr("width", (d) => d.x1 - d.x0)
        .attr("height", (d) => d.y1 - d.y0)
        .attr("fill", "red");

      svg
        .selectAll("text")
        .data(root.leaves())
        .join("text")
        .attr("x", (d) => d.x0 + 10)
        .attr("y", (d) => d.y0 + 20)
        .attr("font-size", "14px")
        .attr("fill", "#fff")
        .text((d) => d.data.name);
    });
  };

  useEffect(() => {
    drawAreaGraph();
  }, []);

  return <div id="area-graph"></div>;
}
