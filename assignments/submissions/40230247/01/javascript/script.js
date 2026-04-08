import * as math from "https://cdn.jsdelivr.net/npm/mathjs@11/lib/browser/math.js";

//////////////////////
// T1 — MATRIZES
//////////////////////

const zeroMatrix = math.zeros(3, 4);
const identityMatrix = math.identity(4);
const diagonalMatrix = math.diag([2, 5, -1]);

const upperTriangular = math.matrix([
  [1, 2, 3],
  [0, 4, 5],
  [0, 0, 6]
]);

const lowerTriangular = math.matrix([
  [1, 0, 0],
  [2, 3, 0],
  [4, 5, 6]
]);

const M = math.matrix([
  [1, 2, 3],
  [0, 4, 5],
  [7, 8, 9]
]);

const symmetricMatrix = math.add(M, math.transpose(M));


//////////////////////
// T2 — DIMENSÕES + ELEMENTO
//////////////////////

function analyzeMatrix(name, matrix) {
  const [rows, cols] = matrix.size();
  let element;

  try {
    element = matrix.get([2, 3]);
  } catch {
    element = "fora dos limites";
  }

  console.log(`\n=== ${name} ===`);
  console.log(`Dimensões: ${rows} x ${cols}`);
  console.log(`Elemento [2,3]: ${element}`);
}

analyzeMatrix("Zero Matrix", zeroMatrix);
analyzeMatrix("Identity Matrix", identityMatrix);
analyzeMatrix("Diagonal Matrix", diagonalMatrix);
analyzeMatrix("Upper Triangular", upperTriangular);
analyzeMatrix("Lower Triangular", lowerTriangular);
analyzeMatrix("Symmetric Matrix", symmetricMatrix);


//////////////////////
// T3 — CLASSIFICAR MATRIZ
//////////////////////

function classificar_matriz(A) {
  const [rows, cols] = A.size();
  const labels = [];

  const isSquare = rows === cols;
  if (isSquare) labels.push("square");
  else labels.push("rectangular");

  // zero
  if (A.toArray().flat().every(v => v === 0)) {
    labels.push("zero");
  }

  // identidade
  if (isSquare && math.deepEqual(A, math.identity(rows))) {
    labels.push("identity");
  }

  // diagonal
  if (isSquare) {
    let isDiagonal = true;
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        if (i !== j && A.get([i, j]) !== 0) {
          isDiagonal = false;
        }
      }
    }
    if (isDiagonal) labels.push("diagonal");
  }

  // simétrica
  if (isSquare && math.deepEqual(A, math.transpose(A))) {
    labels.push("symmetric");
  }

  // triangular superior
  if (isSquare) {
    let upper = true;
    for (let i = 1; i < rows; i++) {
      for (let j = 0; j < i; j++) {
        if (A.get([i, j]) !== 0) upper = false;
      }
    }
    if (upper) labels.push("upper_triangular");
  }

  // triangular inferior
  if (isSquare) {
    let lower = true;
    for (let i = 0; i < rows; i++) {
      for (let j = i + 1; j < cols; j++) {
        if (A.get([i, j]) !== 0) lower = false;
      }
    }
    if (lower) labels.push("lower_triangular");
  }

  return labels;
}


// Testes T3
console.log("\n=== CLASSIFICAÇÃO ===");
console.log("Zero:", classificar_matriz(zeroMatrix));
console.log("Identity:", classificar_matriz(identityMatrix));
console.log("Diagonal:", classificar_matriz(diagonalMatrix));
console.log("Upper:", classificar_matriz(upperTriangular));
console.log("Lower:", classificar_matriz(lowerTriangular));
console.log("Symmetric:", classificar_matriz(symmetricMatrix));


//////////////////////
// T4 — ERROS DE DIMENSÃO
//////////////////////

console.log("\n=== T4 ERROS ===");

// Soma incompatível
try {
  const A = math.zeros(2, 3);
  const B = math.zeros(4, 2);
  math.add(A, B);
} catch (err) {
  console.log("Erro na soma (2x3 + 4x2):", err.message);
}

// Multiplicação incompatível
try {
  const A = math.zeros(2, 3);
  const B = math.zeros(4, 2);
  math.multiply(A, B);
} catch (err) {
  console.log("Erro na multiplicação:", err.message);
}