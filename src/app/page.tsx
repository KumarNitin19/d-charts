"use client";
import React from "react";

import styles from "./page.module.css";
import PieChart from "@/graphs/PieChart";
import ForceGraph from "@/graphs/ForceGraph";
import BarChart from "@/graphs/BarGraph";

export default function Home() {
  return (
    <main className={styles.main}>
      <div id="content">
        <ForceGraph />
        <PieChart />
        <BarChart />
      </div>
    </main>
  );
}
