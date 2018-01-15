import { line } from "d3";

// append the svg obgect to the body of the page
// appends a 'group' element to 'svg'
// moves the 'group' element to the top left margin
export const configureChart = (svgElement, margin, width, height) => {
  svgElement
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom);
};

export const drawPath = (svgElement, data, scales, margin) => {
  // define the line
  const valueline = line()
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

    pathGroup
      .append("path")
      .data([dataItem])
      .attr("d", valueline)
      .attr("class", `line line-digit-${data[i].digit}`)
    //   .each(function(d) {
    //     d.totalLength = this.getTotalLength();
    //   })
    //   .attr("data-length", (d) => d.totalLength);
  }
  return pathGroup;
};
