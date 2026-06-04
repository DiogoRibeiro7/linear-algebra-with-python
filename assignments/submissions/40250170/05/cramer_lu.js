import * as math from "mathjs";

// -------------------------------------------
// T1 — CRAMER
// -------------------------------------------

console.log("--------------- T1: CRAMER ----------------");

function det2(A) {
  return A[0][0] * A[1][1] - A[0][1] * A[1][0];
}

function cramer_2x2(A, b) {
  const D = det2(A);
  if (D === 0) throw new Error("Sistema sem solução única");

  const Ax = [
    [b[0], A[0][1]],
    [b[1], A[1][1]],
  ];
  const Ay = [
    [A[0][0], b[0]],
    [A[1][0], b[1]],
  ];

  return {
    x: det2(Ax) / D,
    y: det2(Ay) / D,
  };
}

function cramer_3x3(A, b) {
  const D = math.det(A);
  if (D === 0) throw new Error("Sistema sem solução única");

  const replace = (A, col, b) =>
    A.map((row, i) => row.map((v, j) => (j === col ? b[i] : v)));

  return {
    x: math.det(replace(A, 0, b)) / D,
    y: math.det(replace(A, 1, b)) / D,
    z: math.det(replace(A, 2, b)) / D,
  };
}

const A2 = [
  [2, 1],
  [5, 3],
];
const b2 = [1, 4];

console.log("Cramer 2x2:", cramer_2x2(A2, b2));
console.log("Verificação:", math.lusolve(A2, b2).toString());

const A3 = [
  [1, 2, 3],
  [0, 1, 4],
  [5, 6, 0],
];
const b3 = [7, 8, 9];

console.log("Cramer 3x3:", cramer_3x3(A3, b3));
console.log("Verificação:", math.lusolve(A3, b3).toString());

// -------------------------------------------
// T2 — LU
// -------------------------------------------

console.log("--------------- T2: LU ----------------");

const A = math.matrix([
  [2, 3, 1],
  [4, 7, 2],
  [6, 18, -1],
]);

const { L, U, P } = math.lup(A);

console.log("P =", P.toString());
console.log("L =", L.toString());
console.log("U =", U.toString());

console.log("PA =", math.multiply(P, A).toString());
console.log("LU =", math.multiply(L, U).toString());

console.log("det(A) =", math.det(A));
console.log("det(A) via U =", math.det(U));

// -------------------------------------------
// T3 — BENCHMARK
// -------------------------------------------

console.log("--------------- T3: BENCHMARK ----------------");

function randomMatrix(n) {
  return Array.from({ length: n }, () =>
    Array.from({ length: n }, () => Math.random() * 10)
  );
}

function randomVector(n) {
  return Array.from({ length: n }, () => Math.random() * 10);
}

function time(fn) {
  const t0 = performance.now();
  fn();
  return performance.now() - t0;
}

const sizes = [2, 3, 5, 10, 20, 50, 100];

for (const n of sizes) {
  const A = randomMatrix(n);
  const b = randomVector(n);

  const tCramer = n <= 5 ? time(() => math.det(A)) : "—";
  const tGauss = time(() => math.lusolve(A, b));
  const tBuiltin = time(() => math.lusolve(A, b));

  console.log(
    `n=${n} | Cramer=${tCramer} ms | Gauss=${tGauss} ms | Built-in=${tBuiltin} ms`
  );
}

// -------------------------------------------
// T4 — Multi-RHS
// -------------------------------------------

console.log("--------------- T4: Multi-RHS ----------------");

const A4 = math.matrix([
  [3, 1, -1],
  [2, 4, 1],
  [1, -1, 3],
]);

const b1 = [1, 2, 3];
const b2 = [4, 0, -1];
const b3 = [5, 1, 1];

const { L: L4, U: U4, P: P4 } = math.lup(A4);

function solveLU(L, U, P, b) {
  return math.lusolve(math.multiply(P, A4), b);
}

console.log("b1:", solveLU(L4, U4, P4, b1).toString());
console.log("b2:", solveLU(L4, U4, P4, b2).toString());
console.log("b3:", solveLU(L4, U4, P4, b3).toString());

// -------------------------------------------
// T5 — Heatmap HTML
// -------------------------------------------

console.log("--------------- T5: Heatmap ----------------");

function heatmapHTML(A, title) {
  let html = `<h2>${title}</h2><table border="1" style="border-collapse:collapse;">`;
  A.forEach(row => {
    html += "<tr>";
    row.forEach(v => {
      const color = `rgb(${255 - Math.abs(v) * 10}, 200, 200)`;
      html += `<td style="padding:10px;background:${color}">${v.toFixed(2)}</td>`;
    });
    html += "</tr>";
  });
  html += "</table>";
  return html;
}

const html =
  heatmapHTML(A4._data, "A") +
  heatmapHTML(L4._data, "L") +
  heatmapHTML(U4._data, "U");

console.log("HTML gerado para heatmap:");
console.log(html);