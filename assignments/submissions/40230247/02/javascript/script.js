import * as math from "https://cdn.jsdelivr.net/npm/mathjs@11/lib/browser/math.js";

// Matrizes
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


// Função para imprimir info
function analyzeMatrix(name, matrix) {
  const [rows, cols] = matrix.size();
  let element;
  let explanation;

  try {
    element = matrix.get([2, 3]);

    // explicação simples
    if (element === 0) {
      explanation = "Faz sentido: posição fora da diagonal ou região ativa.";
    } else {
      explanation = "Faz sentido: posição contém valor definido da matriz.";
    }

  } catch {
    element = "fora dos limites";
    explanation = "Faz sentido: matriz não tem coluna 3 (índice inválido).";
  }

  console.log(`\n${name}`);
  console.log(`Dimensões: ${rows} x ${cols}`);
  console.log(`Elemento [2,3]: ${element}`);
  console.log(`Verificação: ${explanation}`);
}


// Executar
analyzeMatrix("Zero Matrix (3x4)", zeroMatrix);
analyzeMatrix("Identity Matrix (4x4)", identityMatrix);
analyzeMatrix("Diagonal Matrix (3x3)", diagonalMatrix);
analyzeMatrix("Upper Triangular (3x3)", upperTriangular);
analyzeMatrix("Lower Triangular (3x3)", lowerTriangular);
analyzeMatrix("Symmetric Matrix (3x3)", symmetricMatrix);