const { log } = require("mathjs");

//T1

const A = [
  [1, 2, 3],
  [4, 5, 6]
];
const B = [
  [6, 5, 4],
  [3, 2, 1]
];

const add = A.map((row, i) => row.map((val, j) => val + B[i][j]));
const sub = A.map((row, i) => row.map((val, j) => val - B[i][j]));
const triple = A.map(row => row.map(val => 3 * val));

console.log("----------------------------------------------");

console.log("A + B =", add);
console.log("A - B =", sub);
console.log("3A =", triple);
console.assert(add.length === A.length && add[0].length === A[0].length, "Dimensões preservadas");

//T2

const C = [
  [1, 0],
  [0, 1],
  [2, -1]
];

function multiply(X, Y) {
  return X.map(row => Y[0].map((_, j) => row.reduce((sum, val, k) => sum + val * Y[k][j], 0)));
}

const AC = multiply(A, C);
const CA = multiply(C, A);

console.log("----------------------------------------------");

console.log("AC =", AC);
console.log("CA =", CA);
console.log("Dimensões AC:", AC.length, "x", AC[0].length);
console.log("Dimensões CA:", CA.length, "x", CA[0].length);

console.log("----------------------------------------------");

//T3

const P = [
  [2, 1],
  [0, 3]
];
const Q = [
  [1, 4],
  [2, 0]
];
const I = [
  [1, 0],
  [0, 1]
];

const PQ = multiply(P, Q);
const QP = multiply(Q, P);
const commutator = PQ.map((row, i) => row.map((val, j) => val - QP[i][j]));

console.log("PQ =", PQ);
console.log("QP =", QP);
console.log("[P, Q] =", commutator);
console.log("PI =", multiply(P, I));

console.log("IP =", multiply(I, P));

//T4

function transpose(M) {
  return M[0].map((_, i) => M.map(row => row[i]));
}

const At = transpose(A);
const Bt = transpose(B);
const Ct = transpose(C);

const propA = JSON.stringify(transpose(At)) === JSON.stringify(A);
const propB = JSON.stringify(transpose(add)) === JSON.stringify(add.map((_, i) => A.map(row => row[i] + B[i][row.indexOf(row)])));
const propC = JSON.stringify(transpose(multiply(A, C))) === JSON.stringify(multiply(Ct, At));

console.log("(Aᵀ)ᵀ = A ?", propA);
console.log("(A + B)ᵀ = Aᵀ + Bᵀ ?", propB);
console.log("(AC)ᵀ = CᵀAᵀ ?", propC);

// T5

function randomMatrix(n) {
  return Array.from({ length: n }, () => Array.from({ length: n }, () => Math.floor(Math.random() * 10)));
}

const M = randomMatrix(3);
const Mt = transpose(M);
const S = M.map((row, i) => row.map((val, j) => val + Mt[i][j]));

const symmetric = JSON.stringify(S) === JSON.stringify(transpose(S));
console.log("S é simétrica?", symmetric);

const A3 = randomMatrix(3);
const x = [2, -1, 3];
const Ax = A3.map(row => row.reduce((sum, val, j) => sum + val * x[j], 0));

const linearCombo = A3[0].map((_, j) => A3.map(row => row[j]).reduce((sum, colVal, i) => sum + colVal * x[i], 0));

console.log("A3x =", Ax);
console.log("Combinação linear =", linearCombo);