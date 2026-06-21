import * as math from "mathjs";

const zero = math.zeros(3, 4);
const identity = math.identity(4);
const diagonal = math.diag([2, 5, -1]);
const upper = math.matrix([
  [1, 2, 3],
  [0, 4, 5],
  [0, 0, 6],
]);
const lower = math.matrix([
  [7, 0, 0],
  [8, 9, 0],
  [1, 2, 3],
]);
const M = math.matrix([
  [1, 2, -1],
  [0, 3, 4],
  [2, 1, 0],
]);
const symmetric = math.add(M, math.transpose(M));

function shape(A) {
  const size = math.size(A).valueOf();
  return `${size[0]}x${size[1]}`;
}

console.log("Zero", shape(zero), zero.valueOf());
console.log("Identity", shape(identity), identity.valueOf());
console.log("Diagonal", shape(diagonal), diagonal.valueOf());
console.log("Upper", shape(upper), upper.valueOf());
console.log("Lower", shape(lower), lower.valueOf());
console.log("Symmetric", shape(symmetric), symmetric.valueOf());

try {
  math.add(math.zeros(2, 3), math.zeros(4, 2));
} catch (err) {
  console.log("Add error (expected)", err.message);
}

try {
  math.multiply(math.zeros(2, 3), math.zeros(4, 2));
} catch (err) {
  console.log("Multiply error (expected)", err.message);
}
//========================
// T1
//========================

// matriz zero 3x4

const matrizZero = math.zeros(3, 4)._data;

// identidade 4x4

const identidade = math.identity(4)._data;

// diagonal

const diagonal = math.diag([2, 5, -1])._data;

// triangular superior

const triangularSuperior = [

  [1, 2, 3],

  [0, 4, 5],

  [0, 0, 6]

];

// triangular inferior

const triangularInferior = [

  [1, 0, 0],

  [2, 3, 0],

  [4, 5, 6]

];

// matriz qualquer

const M = [

  [1, 2, 3],

  [4, 5, 6],

  [7, 8, 9]

];

// simétrica

const simetrica = math.add(M, math.transpose(M));

console.log("Matriz Zero");

console.table(matrizZero);

console.log("Identidade");

console.table(identidade);

console.log("Diagonal");

console.table(diagonal);

console.log("Triangular Superior");

console.table(triangularSuperior);

console.log("Triangular Inferior");

console.table(triangularInferior);

console.log("Simétrica");

console.table(simetrica);