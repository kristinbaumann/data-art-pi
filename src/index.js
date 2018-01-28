import * as d3 from "d3";
import { calculatePathElements } from "./data";
import { startPoint, step, margin, width, height } from "./defaults";
import { calculateScales, drawAxis } from "./scales";
import { configureChart, drawPath } from "./chart";
import "./style.scss";

var amount = 100;
var velocity = 100;
var colorSetting = 'colorByDigit';

// get and clean data
calculatePathElements(amount, step, startPoint, (data) => {

    // create svg element
    const svgElement = d3.select("#container").append("svg");
    
    // calculate scales
    const scales = calculateScales(data, width, height);
    
    // set dimensions of chart
    configureChart(svgElement, margin, width, height);
    
    // draw line
    const pathGroup = drawPath(svgElement, data, scales, margin, colorSetting, velocity);
    
    // draw axis 
    // drawAxis(pathGroup, scales, height);
});
