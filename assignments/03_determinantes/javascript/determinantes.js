import * as math from "mathjs";

function det2x2(A) {
  return A[0][0] * A[1][1] - A[0][1] * A[1][0];
}

function det3x3Sarrus(A) {
  const a = A[0][0], b = A[0][1], c = A[0][2];
  const d = A[1][0], e = A[1][1], f = A[1][2];
  const g = A[2][0], h = A[2][1], i = A[2][2];
  return a*e*i + b*f*g + c*d*h - c*e*g - b*d*i - a*f*h;
}

const A2 = [[1, 2], [3, 4]];
const A3 = [[2, 1, 0], [0, 3, 4], [1, 0, 5]];

console.log("det2x2", det2x2(A2));
console.log("det3x3", det3x3Sarrus(A3));
console.log("math.det", math.det(A3));
