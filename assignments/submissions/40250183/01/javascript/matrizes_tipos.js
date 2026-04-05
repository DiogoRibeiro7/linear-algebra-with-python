import * as math from "mathjs";

// criação de matriz de zeros 3x4
const zero3x4 = math.zeros(3, 4);

//criação de matriz identidade 4x4
const identity4x4 = math.identity(4);

//criação de matriz diagonal 3x3 com entradas [2, 5, -1]
const diagonal3x3 = math.diag([2, 5, -1]);

//criação de matriz triangular superior 3x3
const upperTriangular3x3 = math.matrix([[1, 2, 3], [0, 4, 5], [0, 0, 6],]);

//criação de matriz triangular inferior 3x3
const lowerTriangular3x3 = math.matrix([[1, 0, 0], [2, 3, 0], [4, 5, 6],]);

//criação de matriz M 3x3
const M = math.matrix([[1, 2, 0], [-3, 4, 5], [6, 1, -2],]);

//criação de matriz simétrica a partir de M + M^T
const symmetric = math.add(M, math.transpose(M));

//função para obter a forma de uma matriz (Ex: "3x4")
function shape(A) {
  const size = math.size(A).valueOf();
  return `${size[0]}x${size[1]}`;
}

//impressão das matrizes e suas formas
console.log("Zero", shape(zero3x4), zero3x4.valueOf());
console.log("Identity", shape(identity4x4), identity4x4.valueOf());
console.log("Diagonal", shape(diagonal3x3), diagonal3x3.valueOf());
console.log("Upper Triangular", shape(upperTriangular3x3), upperTriangular3x3.valueOf());
console.log("Lower Triangular", shape(lowerTriangular3x3), lowerTriangular3x3.valueOf());
console.log("Symmetric", shape(symmetric), symmetric.valueOf());

//tentativa de adicionar matrizes de formas incompatíveis
try {
  math.add(math.zeros(2, 3), math.zeros(4, 2));
} catch (erro) {
    //impressão da mensagem de erro
  console.log("Addition error (expected)", erro.message);
}

//tentativa de multiplicar matrizes de formas incompatíveis
try {
  math.multiply(math.zeros(2, 3), math.zeros(4, 2));
} catch (erro) {
    //impressão da mensagem de erro 
  console.log("Multiplication error (expected)", erro.message);
}



