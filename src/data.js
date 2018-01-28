import { json } from "d3";

function movePointAtAngle(point, digit, distance) {
  var angle = (90 - digit * 36) * (Math.PI / 180);
  return {
    x: point.x + Math.cos(angle) * distance,
    y: point.y + Math.sin(angle) * distance
  };
}


export const calculatePathElements = (amount, step, initialStart, callback) => {
  // read all digits from data file as JSON
  json("../data/piDigits.json", (error, digitsFromFile) => {
    // select needed amount of digitis
    let digits = digitsFromFile["digits" + amount];

    // calculate x and y position of line start and end depending on digit
    // using a specific start point and step length
    // e.g. input: first digit of PI (1)
    // e.g. result: { digit:"1", startPoint:{x: 0, y: 0} , endPoint: {x: 0.29389262614623657, y: 0.4045084971874737} }
    let data = [];
    let currentStart = initialStart;
    for (let i = 0; i < digits.length; i++) {
      const endPoint = movePointAtAngle(currentStart, digits[i], step);
      data.push({
        startPoint: currentStart,
        endPoint: endPoint,
        digit: digits[i]
      });
      currentStart = endPoint;
    }

    callback(data);
  });
};
