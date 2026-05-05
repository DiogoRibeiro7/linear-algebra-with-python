import * as math from 'mathjs';

console.log("-------------------------------------------")

const zero = math.zeros(3, 4);

console.log(math.size(zero).toString());
console.log("Elemento a23:", zero.get([1, 2]));

console.log("-------------------------------------------")

const identity = math.identity(4);

console.log(math.size(identity).toString());
console.log("Elemento a23:", identity.get([1, 2]));

console.log("-------------------------------------------")

const diagonal = math.matrix(math.diag([2, 5, -1]));

console.log(math.size(diagonal).toString());
console.log("Elemento a23:", diagonal.get([1, 2]));

console.log("-------------------------------------------")

const upper = math.matrix([
  [1, 2, 3],
  [0, 4, 5],
  [0, 0, 6],
]);
console.log(math.size(upper).toString());
console.log("Elemento a23:", upper.get([1, 2]));

console.log("-------------------------------------------")

const lower = math.matrix([
  [7, 0, 0],
  [8, 9, 0],
  [1, 2, 3],
]);
console.log(math.size(lower).toString());
console.log("Elemento a23:", lower.get([1, 2]));

console.log("-------------------------------------------")

const M = math.matrix([
  [1, 2, -1],
  [0, 3, 4],
  [2, 1, 0],
]);
console.log(math.size(M).toString());
console.log("Elemento a23:", M.get([1, 2]));

console.log("-------------------------------------------")

const symmetric = math.add(M, math.transpose(M));

console.log(math.size(symmetric).toString());
console.log("Elemento a23:", symmetric.get([1, 2]));

//Classificar Matrizes

function classificar_matriz(A) {
  const labels = [];

  // Aqui está a correção:
  const [rows, cols] = math.size(A);

  //Quadrada e Retangular
  if (rows === cols) labels.push("square");
  else labels.push("rectangular");

  //Nula
  if (math.equal(A, math.zeros(rows, cols))) {
    labels.push("zero");
  }

  //Identidade
  if (rows === cols && math.equal(A, math.identity(rows))) {
    labels.push("identity");
  }

  //Diagonal
  if (rows === cols) {
    let isDiagonal = true;
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        if (i !== j && A.get([i, j]) !== 0) {
          isDiagonal = false;
          break;
        }
      }
    }
    if (isDiagonal) labels.push("diagonal");
  }

  //Simétrica
  if (rows === cols) {
    if (math.equal(A, math.transpose(A))) {
      labels.push("symmetric");
    }
  }

  //Triangular Superior
  if (rows === cols) {
    let isUpper = true;
    for (let i = 1; i < rows; i++) {
      for (let j = 0; j < i; j++) {
        if (A.get([i, j]) !== 0) {
          isUpper = false;
          break;
        }
      }
    }
    if (isUpper) labels.push("upper_triangular");
  }

  //Triangular Inferior
  if (rows === cols) {
    let isLower = true;
    for (let i = 0; i < rows; i++) {
      for (let j = i + 1; j < cols; j++) {
        if (A.get([i, j]) !== 0) {
          isLower = false;
          break;
        }
      }
    }
    if (isLower) labels.push("lower_triangular");
  }

  return labels;
}


console.log("zero:", classificar_matriz(zero));
console.log("identity:", classificar_matriz(identity));
console.log("diagonal:", classificar_matriz(diagonal));
console.log("upper:", classificar_matriz(upper));
console.log("lower:", classificar_matriz(lower));
console.log("M:", classificar_matriz(M));
console.log("symmetric:", classificar_matriz(symmetric));

console.log("-------------------------------------------")

const A = math.zeros(2, 3);
const B = math.zeros(4, 2);

// Soma incompatível
try {
  const soma = math.add(A, B);
  console.log("Resultado da soma:", soma);
} catch (error) {
  console.log("Erro na soma (2x3 + 4x2):", error.message);
}

// Multiplicação incompatível
try {
  const mult = math.multiply(A, B);
  console.log("Resultado da multiplicação:", mult);
} catch (error) {
  console.log("Erro na multiplicação (2x3 * 4x2):", error.message);
}
