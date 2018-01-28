import { select } from "d3";
import { calculatePathElements } from "./data";
import { startPoint, step, margin, width, height } from "./defaults";
import { calculateScales } from "./scales";
import { configureChart, drawPath } from "./chart";
import "./style.scss";

document.querySelector(".startButton").onclick = () => {
    // get settings
    var digits = Number(document.querySelector('#setting-digits').value);
    var colorMode = document.querySelector('#setting-colormode').value;
    var animation = document.querySelector('#setting-animation').value;

    // call drawing function
    startVis(digits, colorMode, animation);
}

const startVis = (digits, colorMode, velocity) => {
    // remove previous data vis
    select("#chart svg").remove();

    // get and clean data
    calculatePathElements(digits, step, startPoint, (data) => {

        // create svg element
        const svgElement = select("#chart").append("svg");
        
        // set dimensions of chart
        configureChart(svgElement, margin, width, height);
        
        // calculate scales
        const scales = calculateScales(data, width, height);
        
        // draw lines
        drawPath(svgElement, data, scales, margin, colorMode, velocity);
    });
}