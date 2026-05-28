import * as math from "mathjs";

const A = math.matrix([
  [1, 2, 3],
  [4, 5, 6],
]);
const B = math.matrix([
  [6, 5, 4],
  [3, 2, 1],
]);
const C = math.matrix([
  [1, 0],
  [0, 1],
  [1, 1],
]);

const soma = math.add(A, B);
console.log("A+B", math.add(A, B).valueOf());
console.log("A-B", math.subtract(A, B).valueOf());
console.log("3A", math.multiply(3, A).valueOf());

console.log("A*C", math.multiply(A, C).valueOf());
console.log("C*A", math.multiply(C, A).valueOf());

console.log("Dimensão A+B é 2x3?", math.deepEqual(math.size(soma).valueOf(), [2, 3]));

const AC = math.multiply(A, C);
const CA = math.multiply(C, A);
console.log("A*C", AC.valueOf());
console.log("C*A", CA.valueOf());

const P = math.matrix([
  [1, 2],
  [3, 4],
]);
const Q = math.matrix([
  [2, 0],
  [1, 2],
]);
const I = math.identity(2);

const PQ = math.multiply(P, Q);
const QP = math.multiply(Q, P);
const comm = math.subtract(PQ, QP);
console.log("[P,Q]", comm.valueOf());
console.log("PI = IP = P?", math.deepEqual(math.multiply(P, I), P));


const AT = math.transpose(A);
const BT = math.transpose(B);
const CT = math.transpose(C);

console.log("(A^T)^T = A?", math.deepEqual(math.transpose(AT), A));
console.log("(A+B)^T = A^T + B^T?", math.deepEqual(math.transpose(soma), math.add(AT, BT)));
console.log("(AC)^T = C^T * A^T?", math.deepEqual(math.round(math.transpose(AC), 10), math.round(math.multiply(CT, AT), 10)));


const M = math.random([3, 3]);
const S = math.add(M, math.transpose(M)); // Garantindo simetria
console.log("S symmetric", math.deepEqual(math.round(S, 10), math.round(math.transpose(S), 10)));

const x = math.matrix([1, 2, 3]);
const Ax = math.multiply(S, x);

const col1 = math.column(S, 0).map(v => v[0]);
const col2 = math.column(S, 1).map(v => v[0]);
const col3 = math.column(S, 2).map(v => v[0]);

const combLinear = math.add(
  math.multiply(x.get([0]), col1),
  math.add(math.multiply(x.get([1]), col2), math.multiply(x.get([2]), col3))
);

console.log("Ax coincide com combinação linear?", math.deepEqual(math.round(Ax, 10), math.round(combLinear, 10)));