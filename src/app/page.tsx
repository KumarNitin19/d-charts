"use client";
import React, { useEffect } from "react";
import * as d3 from "d3";
import styles from "./page.module.css";

export default function Home() {
  let width = 600,
    height = 400;

  const draw = () => {
    let colorScale = ["orange", "lightblue", "#B19CD9"];
    let xCenter = [100, 300, 500];
    let numNodes = 100;
    let nodes = d3.range(numNodes).map(function (d, i) {
      return {
        radius: Math.random() * 25,
        category: i % 3,
        value: Math.random(),
      };
    });

    var forceStrength = 0.2;
    var center = { x: width / 2, y: height / 2 };

    function charge(d) {
      return -Math.pow(d.radius, 2.0) * forceStrength;
    }

    // simulation.stop();

    d3.select(".tabs")
      .selectAll(".tab")
      .on("click", function (e) {
        simulate(e.target.id);
      });

    simulate("1");

    function simulate(type) {
      let simulation = d3
        .forceSimulation(nodes)
        .velocityDecay(0.5)
        .force("x", d3.forceX().strength(forceStrength).x(center.x))
        .force("y", d3.forceY().strength(forceStrength).y(center.y))
        .force("charge", d3.forceManyBody().strength(charge))
        .force(
          "collision",
          d3.forceCollide().radius(function (d) {
            return d.radius;
          })
        )
        .on("tick", ticked);
      if (type === "1") {
        simulation.force("center", d3.forceCenter(width / 2, height / 2));
      } else if (type === "2") {
        simulation.force(
          "x",
          d3.forceX().x(function (d) {
            return xCenter[d.category];
          })
        );
      } else {
        // appendScale();
        let xScale = d3.scaleLinear().domain([0, 1]).range([0, 600]);
        simulation
          .force(
            "x",
            d3.forceX().x(function (d) {
              return xScale(d.value);
            })
          )
          .force(
            "y",
            d3.forceY().y(function (d) {
              return 0;
            })
          );
      }
    }

    function ticked() {
      let u = d3
        .select("svg g")
        .selectAll("circle")
        .data(nodes)
        .join("circle")
        .attr("r", function (d) {
          return d.radius;
        })
        .style("fill", function (d) {
          return colorScale[d.category];
        })
        .attr("cx", function (d) {
          return d.x;
        })
        .attr("cy", function (d) {
          return d.y;
        });
    }
  };

  useEffect(() => {
    draw();
  }, []);

  return (
    <main className={styles.main}>
      <div id="content">
        <div className="tabs">
          <button id="1" className="tab">
            State 1
          </button>
          <button id="2" className="tab">
            State 2
          </button>
          <button id="3" className="tab">
            State 3
          </button>
        </div>
        <svg width="700" height="600">
          <g transform="translate(50, 200)"></g>
        </svg>
      </div>
    </main>
  );
}
