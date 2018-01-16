import * as d3 from "d3";

// append the svg obgect to the body of the page
// appends a 'group' element to 'svg'
// moves the 'group' element to the top left margin
export const configureChart = (svgElement, margin, width, height) => {
  svgElement
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom);
};

export const drawPath = (
  svgElement,
  data,
  scales,
  margin,
  colorSetting,
  velocity
) => {
  // define the line
  const valueline = d3
    .line()
    .x(d => scales.scaleX(d.x))
    .y(d => scales.scaleY(d.y));

  const pathGroup = svgElement
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  for (let i = 0; i < data.length; i++) {

    const dataItem = [
      { x: data[i].x1, y: data[i].y1 },
      { x: data[i].x2, y: data[i].y2 }
    ];

    var path = pathGroup
      .append("path")
      .data([dataItem])
      .attr("d", valueline)
      .attr("class", d => {
        if (colorSetting === "colorByDigit") {
          return `line line-digit-${data[i].digit}`;
        } else if (colorSetting === "colorByRange") {
          return `line line-digit-${Math.round(i / (data.length + 1) * 9)}`;
        } else {
          return `line line-default`;
        }
      })
      .style("opacity", 0)
      .transition()
      .delay(d => i * velocity)
      .style("opacity", 1);

    if (velocity && velocity > 0) {
      const totalLength = path.node().getTotalLength();
      path
        .attr("stroke-dasharray", totalLength + " " + totalLength)
        .attr("stroke-dashoffset", totalLength)
        .transition()
        .duration(velocity)
        .ease(d3.easeLinear)
        .attr("stroke-dashoffset", 0);
    }
  }
  return pathGroup;
};
