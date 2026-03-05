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

console.log("A+B", math.add(A, B).valueOf());
console.log("A-B", math.subtract(A, B).valueOf());
console.log("3A", math.multiply(3, A).valueOf());

console.log("A*C", math.multiply(A, C).valueOf());
console.log("C*A", math.multiply(C, A).valueOf());

const P = math.matrix([
  [1, 2],
  [3, 4],
]);
const Q = math.matrix([
  [2, 0],
  [1, 2],
]);
const comm = math.subtract(math.multiply(P, Q), math.multiply(Q, P));
console.log("[P,Q]", comm.valueOf());

const S = math.add(A, math.transpose(A));
console.log("S symmetric", math.deepEqual(math.round(S, 10), math.round(math.transpose(S), 10)));
