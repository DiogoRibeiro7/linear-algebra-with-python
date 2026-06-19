import * as math from "mathjs";

function det2x2(A) {
  return A[0][0] * A[1][1] - A[0][1] * A[1][0];
}

function det3x3Sarrus(A) {
  const a = A[0][0], b = A[0][1], c = A[0][2];
  const d = A[1][0], e = A[1][1], f = A[1][2];
  const g = A[2][0], h = A[2][1], i = A[2][2];
  return a * e * i + b * f * g + c * d * h - c * e * g - b * d * i - a * f * h;
}

const A2 = [[1, 2], [3, 4]];
const A3 = [[2, 1, 0], [0, 3, 4], [1, 0, 5]];

console.log("det2x2", det2x2(A2));
console.log("det3x3", det3x3Sarrus(A3));
console.log("math.det", math.det(A3));
//=====================================
// ASSIGNMENT 03
//=====================================

//-------------------------
// T1
//-------------------------

function det_2x2(A) {

  return A[0][0] * A[1][1] - A[0][1] * A[1][0];

}

function det_3x3_sarrus(A) {

  const positivo =

    A[0][0] * A[1][1] * A[2][2] +
    A[0][1] * A[1][2] * A[2][0] +
    A[0][2] * A[1][0] * A[2][1];

  const negativo =

    A[0][2] * A[1][1] * A[2][0] +
    A[0][0] * A[1][2] * A[2][1] +
    A[0][1] * A[1][0] * A[2][2];

  return positivo - negativo;

}

const matriz1 = [

  [2, 3],

  [1, 4]

];

const matriz2 = [

  [1, 2],

  [2, 4]

];

console.log(det_2x2(matriz1));

console.log(math.det(matriz1));

console.log(det_2x2(matriz2));

console.log(math.det(matriz2));

const matriz3 = [

  [1, 2, 3],

  [0, 1, 4],

  [5, 6, 0]

];

const matriz4 = [

  [1, 2, 3],

  [2, 4, 6],

  [3, 6, 9]

];

console.log(det_3x3_sarrus(matriz3));

console.log(math.det(matriz3));

console.log(det_3x3_sarrus(matriz4));

console.log(math.det(matriz4));