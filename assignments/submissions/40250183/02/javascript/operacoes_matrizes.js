import * as math from "mathjs";

const A = math.matrix([[1, 2, 3], [4, 5, 6]]);
const B = math.matrix([[6, 5, 4], [3, 2, 1]]);
const C = math.matrix([[1, 0], [0, 1], [1, 1]]);

// T1 - Soma e multiplicação escalar
console.log("\nT1 - Soma e multiplicação escalar");

console.log("A+B", math.add(A, B).valueOf());
console.log("A-B", math.subtract(A, B).valueOf());
console.log("3A", math.multiply(3, A).valueOf());

console.log("Dimensão preservada (2x3):", math.deepEqual(math.size(A).valueOf(), [2, 3]));

// T2 - Produto AC e CA
console.log("\nT2 - Produto AC e CA");

const AC = math.multiply(A, C);
const CA = math.multiply(C, A);
console.log("A*C", AC.valueOf());
console.log("C*A", CA.valueOf());

console.log("AC é 2x2, CA é 3x3 - dimensões diferentes, logo AC ≠ CA");

// T3 - Comutador [P,Q] e identidade
console.log("\nT3 - Comutador [P,Q] e identidade");

const P = math.matrix([[1, 2], [3, 4]]);
const Q = math.matrix([[2, 0], [1, 2]]);

const PQ = math.multiply(P, Q);
const QP = math.multiply(Q, P);
const comutador = math.subtract(PQ, QP);
const I = math.identity(2);

console.log("[P,Q]", comutador.valueOf());
console.log("PI = P:", math.deepEqual(math.round(math.multiply(P, I), 10), math.round(P, 10)));
console.log("IP = P:", math.deepEqual(math.round(math.multiply(I, P), 10), math.round(P, 10)));

// T4 - Propriedades da transposta
console.log("\nT4 - Propriedades da transposta");

const A2 = math.matrix([[1, 2], [3, 4]]);
const B2 = math.matrix([[5, 6], [7, 8]]);

console.log("(A+B)^T = A^T + B^T:", math.deepEqual(
  math.round(math.transpose(math.add(A2, B2)), 10),
  math.round(math.add(math.transpose(A2), math.transpose(B2)), 10)
));

console.log("(AB)^T = B^T A^T:", math.deepEqual(
  math.round(math.transpose(math.multiply(A2, B2)), 10),
  math.round(math.multiply(math.transpose(B2), math.transpose(A2)), 10)
));

// T5 - Matriz simétrica e Ax
console.log("\nT5 - Matriz simétrica e Ax");

const M = math.random([3, 3], 0, 10);
const S = math.add(M, math.transpose(M));
console.log("S é simétrica:", math.deepEqual(math.round(S, 10), math.round(math.transpose(S), 10)));

const x = math.matrix([2, -1, 3]);
const Ax = math.multiply(S, x);
console.log("Ax:", Ax.valueOf());
