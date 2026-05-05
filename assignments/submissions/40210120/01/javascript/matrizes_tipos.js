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

const getTriu = (A) => math.map(A, (val, idx) => (idx[0] <= idx[1] ? val : 0));
const getTril = (A) => math.map(A, (val, idx) => (idx[0] >= idx[1] ? val : 0));

function inspecao(nome, A) {
  const s = math.size(A).valueOf();
  const rows = s[0], cols = s[1];
  
  //  a2,3 (linha 2, col 3 - 0-based)
  let element = (rows > 2 && cols > 3) ? A.get([2, 3]) : "Fora de alcance";
  
  console.log(`${nome}: ${rows}x${cols} | Elemento a[2,3]: ${element}`);
}

console.log("--- T2: inspecao ---");
inspecao("Zero", zero);
inspecao("Identity", identity);
inspecao("Diagonal", diagonal);


function classificar_matriz(A) {
  const s = math.size(A).valueOf();
  const r = s[0], c = s[1];
  const labels = [];

  // Verificações Básicas
  if (r === c) labels.push("square");
  else labels.push("rectangular");

  if (math.deepEqual(A, math.zeros(r, c))) labels.push("zero");

  if (r === c) {
    // Tolerância para float: math.round(A, 10)
    if (math.deepEqual(A, math.transpose(A))) labels.push("symmetric");
    if (math.deepEqual(A, math.identity(r))) labels.push("identity");
    if (math.deepEqual(A, math.diag(math.diag(A)))) labels.push("diagonal");
    if (math.deepEqual(A, getTriu(A))) labels.push("upper_triangular");
    if (math.deepEqual(A, getTril(A))) labels.push("lower_triangular");
  }
  return labels;
}

console.log("\n--- T3: Classificação ---");
const todas = { zero, identity, diagonal, upper, lower, symmetric };
for (let [nome, mat] of Object.entries(todas)) {
  console.log(`${nome}: [${classificar_matriz(mat).join(", ")}]`);
}

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


console.log("\n--- T4: Erros de Dimensão ---");
try {
  math.add(math.zeros(2, 3), math.zeros(4, 2));
} catch (err) {
  console.log("Erro na Soma:", err.message);
}

try {
  math.multiply(math.zeros(2, 3), math.zeros(4, 2));
} catch (err) {
  console.log("Erro na Multiplicação:", err.message);
}
