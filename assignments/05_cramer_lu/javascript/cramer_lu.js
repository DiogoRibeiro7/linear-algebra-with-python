import * as math from "mathjs";

function cramer2x2(A, b) {
  const detA = math.det(A);
  if (Math.abs(detA) < 1e-12) return null;
  const A1 = [[b[0], A[0][1]], [b[1], A[1][1]]];
  const A2 = [[A[0][0], b[0]], [A[1][0], b[1]]];
  return [math.det(A1) / detA, math.det(A2) / detA];
}

const A = [[2, 1], [1, 3]];
const b = [1, 2];
console.log("Cramer", cramer2x2(A, b));
console.log("LU solve", math.lusolve(A, b).valueOf());
//====================================
// ASSIGNMENT 05
//====================================

//----------------------
// CRAMER 2x2
//----------------------

function cramer2x2(A, b) {

  let det = math.det(A);

  if (det == 0) {

    return null;

  }

  let A1 = [

    [b, [A[0][1], A[1][1]]]

  ];

  A1 = [

    [b[0], A[0][1]],

    [b[1], A[1][1]]

  ];

  let A2 = [

    [A[0][0], b[0]],

    [A[1][0], b[1]]

  ];

  let x = math.det(A1) / det;

  let y = math.det(A2) / det;

  return [x, y];

}

//----------------------
// CRAMER 3x3
//----------------------

function substituirColuna(A, b, col) {

  let C = A.map(l => l.slice());

  for (let i = 0; i < 3; i++) {

    C[i][col] = b[i];

  }

  return C;

}

function cramer3x3(A, b) {

  let det = math.det(A);

  if (det == 0) {

    return null;

  }

  let x =

    math.det(substituirColuna(A, b, 0)) / det;

  let y =

    math.det(substituirColuna(A, b, 1)) / det;

  let z =

    math.det(substituirColuna(A, b, 2)) / det;

  return [x, y, z];

}

//----------------------
// TESTES
//----------------------

const A2 = [

  [2, 1],

  [5, 3]

];

const b2 = [5, 13];

console.log(cramer2x2(A2, b2));

console.log(math.lusolve(A2, b2));

const A3 = [

  [2, 1, -1],

  [-3, -1, 2],

  [-2, 1, 2]

];

const b3 = [8, -11, -3];

console.log(cramer3x3(A3, b3));

console.log(math.lusolve(A3, b3));

//----------------------
// LU manual
//----------------------

function LU(A) {

  let n = A.length;

  let L = math.identity(n)._data;

  let U = A.map(l => l.slice());

  for (let k = 0; k < n - 1; k++) {

    for (let i = k + 1; i < n; i++) {

      let f = U[i][k] / U[k][k];

      L[i][k] = f;

      for (let j = k; j < n; j++) {

        U[i][j] -= f * U[k][j];

      }

    }

  }

  return { L, U };

}

const matriz = [

  [2, 1, 1],

  [4, -6, 0],

  [-2, 7, 2]

];

const resultado = LU(matriz);

console.log("L");

console.table(resultado.L);

console.log("U");

console.table(resultado.U);

//----------------------
// Determinante
//----------------------

let det = 1;

for (let i = 0; i < resultado.U.length; i++) {

  det *= resultado.U[i][i];

}

console.log(det);

//----------------------
// Benchmark
//----------------------

let tamanhos = [2, 3, 5, 10];

let tempos = [];

for (let n of tamanhos) {

  let M = math.random([n, n]);

  let b = math.random([n]);

  let inicio = performance.now();

  math.lusolve(M, b);

  let fim = performance.now();

  tempos.push(fim - inicio);

}

Plotly.newPlot(

  "benchmark",

  [

    {

      x: tamanhos,

      y: tempos,

      type: "bar"

    }

  ]

);

//----------------------
// Vários RHS
//----------------------

const b1 = [8, -11, -3];

const b22 = [1, 2, 3];

const b33 = [5, 7, 9];

console.log(math.lusolve(A3, b1));

console.log(math.lusolve(A3, b22));

console.log(math.lusolve(A3, b33));

//----------------------
// Heatmap
//----------------------

let traceA = {

  z: matriz,

  type: "heatmap",

  name: "A"

};

let traceL = {

  z: resultado.L,

  type: "heatmap",

  name: "L"

};

let traceU = {

  z: resultado.U,

  type: "heatmap",

  name: "U"

};

Plotly.newPlot(

  "heatmap",

  [traceA, traceL, traceU]

);

console.log("Assignment 05 concluído");