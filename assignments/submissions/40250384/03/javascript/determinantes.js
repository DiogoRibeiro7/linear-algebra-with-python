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

function detGauss(A) {
  let n = A.length;
  let M = A.map(row => [...row]);
  let det = 1;

  for (let i = 0; i < n; i++) {
    let pivot = M[i][i];
    if (pivot === 0) return 0;
    for (let j = i + 1; j < n; j++) {
      let factor = M[j][i] / pivot;
      for (let k = i; k < n; k++) M[j][k] -= factor * M[i][k];
    }
    det *= pivot;
  }
  return det;
}


function verifyProperties(A, B, k) {
  console.log("det(AB) =", math.det(math.multiply(A, B)), "vs det(A)*det(B) =", math.det(A)*math.det(B));
  console.log("det(A^T) =", math.det(math.transpose(A)), "vs det(A) =", math.det(A));
  console.log("det(kA) =", math.det(math.multiply(A, k)), "vs k^n*det(A) =", Math.pow(k, A.length)*math.det(A));
}


function isInvertible(A) {
  const det = math.det(A);
  const cond = math.cond(A);
  return { invertible: det !== 0, conditionNumber: cond };
}


function inverseGaussJordan(A) {
  const n = A.length;
  let M = A.map((row, i) => [...row, ...Array(n).fill(0).map((_, j) => i === j ? 1 : 0)]);

  for (let i = 0; i < n; i++) {
    let pivot = M[i][i];
    for (let j = 0; j < 2*n; j++) M[i][j] /= pivot;
    for (let k = 0; k < n; k++) {
      if (k !== i) {
        let factor = M[k][i];
        for (let j = 0; j < 2*n; j++) M[k][j] -= factor * M[i][j];
      }
    }
  }
  return M.map(row => row.slice(n));
}


function visualizeTransformation(A) {
  const points = [[0,0],[1,0],[1,1],[0,1]];
  const transformed = points.map(([x,y]) => [
    A[0][0]*x + A[0][1]*y,
    A[1][0]*x + A[1][1]*y
  ]);
  const areaScale = Math.abs(det2x2(A));
  console.log("Area scale factor =", areaScale);
}

const A = [[2, 1], [1, 3]];
const B = [[1, 2], [3, 4]];

console.log("det2x2(A):", det2x2(A));
console.log("det3x3Sarrus([[1,2,3],[4,5,6],[7,8,9]]):", det3x3Sarrus([[1,2,3],[4,5,6],[7,8,9]]));
console.log("detGauss(A):", detGauss(A));
verifyProperties(A, B, 2);
console.log(isInvertible(A));
console.log(inverseGaussJordan(A));
visualizeTransformation(A);



  const square = [
    [0, 0],
    [1, 0],
    [1, 1],
    [0, 1],
    [0, 0] 
  ];


  const transformed = square.map(([x, y]) => [
    A[0][0] * x + A[0][1] * y,
    A[1][0] * x + A[1][1] * y
  ]);

  const x1 = square.map(p => p[0]);
  const y1 = square.map(p => p[1]);

  const x2 = transformed.map(p => p[0]);
  const y2 = transformed.map(p => p[1]);

  const areaScale = Math.abs(det2x2(A));

  const traceOriginal = {
    x: x1,
    y: y1,
    fill: "toself",
    name: "Unit Square",
    line: { color: "blue", width: 3 }
  };

  const traceTransformed = {
    x: x2,
    y: y2,
    fill: "toself",
    name: "Transformed Parallelogram",
    line: { color: "red", width: 3 }
  };

