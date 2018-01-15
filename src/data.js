import { json } from "d3";

function movePointAtAngle(point, digit, distance) {
  var angle = (90 - digit * 36) * (Math.PI / 180);
  return {
    x: point.x + Math.cos(angle) * distance,
    y: point.y + Math.sin(angle) * distance
  };
}

export const calculatePathElements = (amount, step, initialStart, callback) => {
  json("../data/piDigits.json", (error, digitsFromFile) => {
    let digits = digitsFromFile["digits" + amount];

    let data = [];
    let currentStart = initialStart;
    for (let i = 0; i < digits.length; i++) {
      const endPoint = movePointAtAngle(currentStart, digits[i], step);
      data.push({
        x1: currentStart.x,
        y1: currentStart.y,
        x2: endPoint.x,
        y2: endPoint.y,
        digit: digits[i]
      });
      currentStart = endPoint;
    }

    callback(data);
  });
};
