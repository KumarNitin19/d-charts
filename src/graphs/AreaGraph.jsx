import { useEffect } from "react";

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
  };

  useEffect(() => {
    drawAreaGraph();
  }, []);

  return <div id="area-graph"></div>;
}
