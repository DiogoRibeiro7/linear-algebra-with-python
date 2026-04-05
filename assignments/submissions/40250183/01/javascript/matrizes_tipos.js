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

//verifica se a posição (2, 3) existe na matriz e retorna o valor ou "N/A" se não existir
function valueAt(A, row, column) {
  const data = A.valueOf();
  const size = math.size(A).valueOf();

  if (row < size[0] && column < size[1]) {
    return data[row][column];
  }

  return "N/A";
}

//impressão das matrizes suas formas, e do valor do elemento pedido em a2,3 para a matriz que tem essa posição
console.log("Zero", shape(zero3x4), zero3x4.valueOf(), "Value a2,3:", valueAt(zero3x4, 2, 3));
console.log("Identity", shape(identity4x4), identity4x4.valueOf(), "Value a2,3:", valueAt(identity4x4, 2, 3));
console.log("Diagonal", shape(diagonal3x3), diagonal3x3.valueOf(), "Value a2,3:", valueAt(diagonal3x3, 2, 3));
console.log("Upper Triangular", shape(upperTriangular3x3), upperTriangular3x3.valueOf(), "Value a2,3:", valueAt(upperTriangular3x3, 2, 3));
console.log("Lower Triangular", shape(lowerTriangular3x3), lowerTriangular3x3.valueOf(), "Value a2,3:", valueAt(lowerTriangular3x3, 2, 3));
console.log("Symmetric", shape(symmetric), symmetric.valueOf(), "Value a2,3:", valueAt(symmetric, 2, 3));

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



