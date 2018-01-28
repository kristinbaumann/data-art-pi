import { line, easeLinear } from "d3";

// set width and height of chart
export const configureChart = (svgElement, margin, width, height) => {
  svgElement
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom);
};

const colorPath = (colorMode, digit, index, maxLength) => {
  switch(colorMode){
    case "colorByDigit": return `line-digit-${digit}`;
    case "colorByRange": return `line-digit-${Math.round(index / (maxLength + 1) * 9)}`;
    default: return ``;
  }
}

export const drawPath = (
  svgElement,
  data,
  scales,
  margin,
  colorMode,
  velocity,
  startPoint
) => {
  // define the line function
  const valueline = line()
    .x(d => scales.scaleX(d.x))
    .y(d => scales.scaleY(d.y));

  // append a group element and move it to the top left margin
  const pathGroup = svgElement
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  // create path for each digit  
  for (let i = 0; i < data.length; i++) {
    const dataItem = [
      { x: data[i].startPoint.x, y: data[i].startPoint.y },
      { x: data[i].endPoint.x, y: data[i].endPoint.y }
    ];

    var path = pathGroup
      .append("path")
      .data([dataItem])
      .attr("d", valueline)
      .attr("class", () => `line ${colorPath(colorMode, data[i].digit, i, data.length)}`)
      .style("opacity", 0)
      .transition()
      .delay(d => i * velocity)
      .style("opacity", 1);

    // add animation of the whole path
    if (velocity && velocity > 0) {
      const totalLength = path.node().getTotalLength();
      path
        .attr("stroke-dasharray", totalLength + " " + totalLength)
        .attr("stroke-dashoffset", totalLength)
        .transition()
        .duration(velocity)
        .ease(easeLinear)
        .attr("stroke-dashoffset", 0);
    }
  }

  // add start marker
  pathGroup.append('path')
    .attr('d', d => { 
      const step = 0.09;
      let path = 'M' + scales.scaleX(startPoint.x) +','+ scales.scaleY(startPoint.y - 0.03);
      path += 'L' + scales.scaleX(startPoint.x-step) + ',' + scales.scaleY(startPoint.y-step);
      path += 'L' + scales.scaleX(startPoint.x+step) + ',' + scales.scaleY(startPoint.y-step) + 'z';
      return path;
    })
    .attr('class', 'startMarker')

  return pathGroup;
};
