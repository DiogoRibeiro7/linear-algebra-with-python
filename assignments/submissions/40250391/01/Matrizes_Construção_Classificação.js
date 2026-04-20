const zeroMatrix=[
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0]
];

const identityMatrix=[
    [1, 0, 0, 0],
    [0, 1, 0, 0],
    [0, 0, 1, 0],
    [0, 0, 0, 1]
];

const diagonalMatrix=[
    [2, 0, 0],
    [0, 5, 0],
    [0, 0, -1]
];

const upperTriangularMatrix=[
    [1, 4, 7],
    [0, 5, 2],
    [0, 0, 9]
];

const lowerTriangularMatrix = [
  [3, 0, 0],
  [2, 8, 0],
  [4, 1, 6]
];

const M = [
  [1, 2],
  [3, 4]
];


const MT = [
  [1, 3],
  [2, 4]
];


const symmetricMatrix = [
  [M[0][0] + MT[0][0], M[0][1] + MT[0][1]],
  [M[1][0] + MT[1][0], M[1][1] + MT[1][1]]
];


console.log(symmetricMatrix);


function analyzeMatrix(name, matrix) {
  const rows = matrix.length;
  const cols = matrix[0] ? matrix[0].length : 0;
  

  const element = matrix[1]?.[2];
  const displayElement = element !== undefined ? element : "Out of Bounds";

  console.log(`Analysis: ${name} `);
  console.log(`Dimensions: ${rows} × ${cols}`);
  console.log(`Element at [2][3]: ${displayElement}`);
}


analyzeMatrix("Zero Matrix", zeroMatrix);
analyzeMatrix("Identity Matrix", identityMatrix);
analyzeMatrix("Diagonal Matrix", diagonalMatrix);
analyzeMatrix("Upper Triangular Matrix", upperTriangularMatrix);
analyzeMatrix("Lower Triangular Matrix", lowerTriangularMatrix);
analyzeMatrix("Symmetric Matrix", symmetricMatrix);

function classificar_matriz(A) {
  let labels = [];
  let rows = A.length;
  let cols = A[0].length;

  //Verificar se é Quadrada ou Retangular
  if (rows === cols) {
    labels.push("square");
  } else {
    labels.push("rectangular");
  }

  //Verificar se é a Matriz Zero 
  let allZeros = true;
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (A[i][j] !== 0) {
        allZeros = false;
      }
    }
  }
  if (allZeros) labels.push("zero");

  // As próximas classificações só fazem sentido se for quadrada
  if (rows === cols) {
    let isIdentity = true;
    let isDiagonal = true;
    let isUpper = true;
    let isLower = true;
    let isSymmetric = true;

    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        let val = A[i][j];

        //i != j represeta todos os elementos fora da diagonal principal
        if (i !== j) {
          if (val !== 0) {
            isIdentity = false;
            isDiagonal = false;
          }
          if (i > j && val !== 0) isUpper = false; 
          if (i < j && val !== 0) isLower = false; 
        } 
        // Se está na diagonal (i == j)
        else {
          if (val !== 1) isIdentity = false;
        }

        // Simetria
        if (A[i][j] !== A[j][i]) {
          isSymmetric = false;
        }
      }
    }

    if (isIdentity) labels.push("identity");
    if (isDiagonal) labels.push("diagonal");
    if (isUpper) labels.push("upper_triangular");
    if (isLower) labels.push("lower_triangular");
    if (isSymmetric) labels.push("symmetric");
  }

  return labels;
}

classificar_matriz(zeroMatrix);
classificar_matriz(identityMatrix);
classificar_matriz(diagonalMatrix);
classificar_matriz(upperTriangularMatrix);
classificar_matriz(lowerTriangularMatrix);
classificar_matriz(symmetricMatrix);

const A = [[1, 2, 3], [4, 5, 6]]; 
const B = [[1, 1], [1, 1], [1, 1], [1, 1]]; 
function soma(matrizA, matrizB) {
  let resultado = [];
  
  for (let i = 0; i < matrizA.length; i++) {
    let linha = [];
    for (let j = 0; j < matrizA[0].length; j++) {
      
      let soma = matrizA[i][j] + (matrizB[i][j] || 0); 
      linha.push(soma);
    }
    resultado.push(linha);
  }
  return resultado;
}

console.log("Resultado da soma:", soma(A, B));