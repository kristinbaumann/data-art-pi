import { select } from "d3";
import { calculatePathElements } from "./data";
import { startPoint, step, margin, width, height } from "./defaults";
import { calculateScales } from "./scales";
import { configureChart, drawPath } from "./chart";
import "./style.scss";

import legendByDigit from "./images/legendByDigit.png";
import legendByRange from "./images/legendByRange.png";

const cleanVis = () => {
  select("#chart svg").remove();
};

const runVis = () => {
  // get settings
  var digits = Number(document.querySelector("#setting-digits").value);
  var colorMode = document.querySelector("#setting-colormode").value;
  var animation = document.querySelector("#setting-animation").value;

  // call drawing function
  startVis(digits, colorMode, animation);

  // show legend
  const legend = document.querySelector(".legend");
  legend.src = colorMode === "colorByDigit" ? legendByDigit : legendByRange;
  legend.classList.remove("legendByDigit", "legendByRange");
  legend.classList.add(
    colorMode === "colorByDigit" ? "legendByDigit" : "legendByRange"
  );
};

const startVis = (digits, colorMode, velocity) => {
  // remove previous data vis
  cleanVis();

  // get and clean data
  calculatePathElements(digits, step, startPoint, data => {
    // create svg element
    const svgElement = select("#chart").append("svg");

    // set dimensions of chart
    configureChart(svgElement, margin, width, height);

    // calculate scales
    const scales = calculateScales(data, width, height);

    // draw lines
    drawPath(svgElement, data, scales, margin, colorMode, velocity, startPoint);
  });
};

// run vis when clicking generate button
document.querySelector(".startButton").onclick = () => runVis();

// run vis on first load
runVis();

// remove previous data vis when settings change
document.querySelector("#setting-digits").onchange = () => cleanVis();
document.querySelector("#setting-colormode").onchange = () => cleanVis();
document.querySelector("#setting-colormode").onchange = () => cleanVis();

