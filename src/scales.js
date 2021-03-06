import { 
  scaleLinear,
  min, max, 
  // axisBottom, axisLeft 
} from "d3";

const getMax = (d, dir) => {
  return d.startPoint[dir] > d.endPoint[dir]
    ? d.startPoint[dir]
    : d.endPoint[dir];
};

const getMin = (d, dir) => {
  return d.startPoint[dir] > d.endPoint[dir]
    ? d.endPoint[dir]
    : d.startPoint[dir];
};

export const calculateScales = (data, width, height) => {
  const minX = min(data, d => getMin(d, "x"));
  const maxX = max(data, d => getMax(d, "x"));

  const minY = min(data, d => getMin(d, "y"));
  const maxY = max(data, d => getMax(d, "y"));

  const minTotal = minX <= minY ? minX : minY;
  const maxTotal = maxX <= maxY ? maxY : maxX;

  const scaleX = scaleLinear()
    .range([0, width])
    .domain([minTotal, maxTotal]);

  const scaleY = scaleLinear()
    .range([height, 0])
    .domain([minTotal, maxTotal]);

  return { scaleX, scaleY };
};

// export const drawAxis = (svgElement, scales, height) => {
//   // Draw the X Axis
//   svgElement
//     .append("g")
//     .attr("transform", "translate(0," + height + ")")
//     .call(axisBottom(scales.scaleX));

//   // Draw the Y Axis
//   svgElement
//     .append("g")
//     .call(axisLeft(scales.scaleY));
// };
