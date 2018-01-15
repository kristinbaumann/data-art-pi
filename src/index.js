import { select } from "d3";
import { calculatePathElements } from "./data";
import { startPoint, step, margin, width, height } from "./defaults";
import { calculateScales, drawAxis } from "./scales";
import { configureChart, drawPath } from "./chart";
import "./style.scss";

// get and clean data
calculatePathElements('100', step, startPoint, (data) => {

    // create svg element
    const svgElement = select("#container").append("svg");
    
    // calculate scales
    const scales = calculateScales(data, width, height);
    
    // set dimensions of chart
    configureChart(svgElement, margin, width, height);
    
    // draw line
    const pathGroup = drawPath(svgElement, data, scales, margin);
    
    // draw axis 
    drawAxis(pathGroup, scales, height);
});

