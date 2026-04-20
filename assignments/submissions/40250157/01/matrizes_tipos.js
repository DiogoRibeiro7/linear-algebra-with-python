
// T1//

// criar as matrizes //

/* FUNÇÃO PRINCIPAL */

function imprimirMatriz (nome,matriz){
    console.log(`${nome}`);
    matriz.forEach (linha => console.log((linha)));    
}

// UMA MATRIZ 3X4 DE ZEROS //

const matrizZero = [];

for (let i = 0; i < 3; i++) {
  let linha = [];
  for (let j = 0; j < 4; j++) {
    linha.push(0);
  }
  matrizZero.push(linha);
}

// UMA MATRIZ 4X4 IDENTIDADE //

const matrizIdentidade = [];

for (let i = 0; i < 4; i++) {
  let linha = [];

  for (let j = 0; j < 4; j++) {
    if (i === j) {
      linha.push(1);
    } else {
      linha.push(0);
    }
  }

  matrizIdentidade.push(linha);
}

// UMA MATRIZ 3X3 DIAGONAL COM VALORES [2,5,-1] //

const valoresDiagonal = [2, 5, -1];
const matrizDiagonal = [];

for (let i = 0; i < 3; i++) {
  let linha = [];

  for (let j = 0; j < 3; j++) {
    if (i === j) {
      linha.push(valoresDiagonal[i]);
    } else {
      linha.push(0);
    }
  }

  matrizDiagonal.push(linha);
}

// UMA MATRIZ TRIANGULAR SUPERIOR 3X3 //

const matrizTriangularSuperior = [
  [1, 2, 3],
  [0, 4, 5],
  [0, 0, 6]
];


// UMA MATRIZ TRIANGULAR INFERIOR 3X3 //

const matrizTriangularInferior = [
  [1, 0, 0],
  [2, 3, 0],
  [4, 5, 6]
];

// UMA MATRIZ SIMÉTRICA (M + Mᵀ) //

const M = [
  [1, 2, 3],
  [0, 4, 5],
  [1, 0, 6]
];

function transposta(matriz) {
  return matriz[0].map((_, j) => matriz.map(linha => linha[j]));
}

function somarMatrizes(A, B) {
  return A.map((linha, i) =>
    linha.map((valor, j) => valor + B[i][j])
  );
}

const matrizSimetrica = somarMatrizes(M, transposta(M));



imprimirMatriz("Matriz Zero 3x4", matrizZero);
imprimirMatriz("Matriz Identidade 4x4", matrizIdentidade);
imprimirMatriz("Matriz Diagonal 3x3", matrizDiagonal);
imprimirMatriz("Matriz Triangular Superior", matrizTriangularSuperior);
imprimirMatriz("Matriz Triangular Inferior", matrizTriangularInferior);
imprimirMatriz("Matriz Simétrica", matrizSimetrica);


// T2 //

// IMPRIMIR AS DIMENSÕES (LINHAS E COLUNAS) DAS MATRIZES T1 //

function mostrarInfoMatriz(nome, matriz) {
  let linhas = matriz.length;
  let colunas = matriz[0].length;

  console.log(`\n=== ${nome} ===`);
  console.log(`Dimensões: ${linhas} x ${colunas}`);

  // VERIFICA SE EXISTE 23 //

  if (linhas > 2 && colunas > 3) {
    let valor = matriz[2][3];
    console.log(`Elemento [2][3]: ${valor}`);

    // CONDIÇÃO PARA FAZER SENTIDO OU NÃO//

    if (nome.includes("Zero")) {
      console.log("Faz sentido: matriz zero só tem 0.");
    }

    else if (nome.includes("Identidade")) {
      if (valor === 0) {
        console.log("Faz sentido: fora da diagonal é 0.");
      } else {
        console.log(" Não faz sentido para matriz identidade.");
      }
    }

    else if (nome.includes("Diagonal")) {
      if (valor === 0) {
        console.log("Faz sentido: fora da diagonal é 0.");
      } else {
        console.log("Não faz sentido para matriz diagonal.");
      }
    }

    else if (nome.includes("Triangular Superior")) {
      console.log(" Faz sentido dependendo da posição.");
    }

    else if (nome.includes("Triangular Inferior")) {
      console.log(" Faz sentido dependendo da posição.");
    }

    else if (nome.includes("Simétrica")) {
      console.log(" Faz sentido: valores respeitam simetria.");
    }

  } else {
    console.log("Elemento [2][3]: não existe nesta matriz");
    console.log("Faz sentido: matriz é pequena demais.");
  }
}

mostrarInfoMatriz("Matriz Zero 3x4", matrizZero);
mostrarInfoMatriz("Matriz Identidade 4x4", matrizIdentidade);
mostrarInfoMatriz("Matriz Diagonal 3x3", matrizDiagonal);
mostrarInfoMatriz("Matriz Triangular Superior", matrizTriangularSuperior);
mostrarInfoMatriz("Matriz Triangular Inferior", matrizTriangularInferior);
mostrarInfoMatriz("Matriz Simétrica", matrizSimetrica);

// T3 //

// CLASSIFICAR MATRIZES //

function classificarMatriz(A) {
  let rotulos = [];
  let linhas = A.length;
  let colunas = A[0].length;

  // PARA SER QUADRADA OU RETANGULAR //
  if (linhas === colunas) {
    rotulos.push("quadrada");
  } else {
    rotulos.push("retangular");
  }

  // PARA SER ZERO //
  let ehZero = true;
  for (let i = 0; i < linhas; i++) {
    for (let j = 0; j < colunas; j++) {
      if (A[i][j] !== 0) {
        ehZero = false;
      }
    }
  }
  if (ehZero) {
    rotulos.push("zero");
  }

  // MATRIZES IDENTIDADE E DIAGONAL SÓ EXISTEM SE A MATRIZ FOR QUADRADA //

  if (linhas === colunas) {
    // IDENTIDADE //

    let ehIdentidade = true;
    for (let i = 0; i < linhas; i++) {
      for (let j = 0; j < colunas; j++) {
        if (i === j && A[i][j] !== 1) {
          ehIdentidade = false;
        }
        if (i !== j && A[i][j] !== 0) {
          ehIdentidade = false;
        }
      }
    }
    if (ehIdentidade) {
      rotulos.push("identidade");
    }

    // DIAGONAL //

    let ehDiagonal = true;
    for (let i = 0; i < linhas; i++) {
      for (let j = 0; j < colunas; j++) {
        if (i !== j && A[i][j] !== 0) {
          ehDiagonal = false;
        }
      }
    }
    if (ehDiagonal) {
      rotulos.push("diagonal");
    }

    // SIMETRICA //

    let ehSimetrica = true;
    for (let i = 0; i < linhas; i++) {
      for (let j = 0; j < colunas; j++) {
        if (A[i][j] !== A[j][i]) {
          ehSimetrica = false;
        }
      }
    }
    if (ehSimetrica) {
      rotulos.push("simétrica");
    }

    // TRRIANGULAR SUPERIOR //

    let ehTriangularSuperior = true;
    for (let i = 0; i < linhas; i++) {
      for (let j = 0; j < i; j++) {
        if (A[i][j] !== 0) {
          ehTriangularSuperior = false;
        }
      }
    }
    if (ehTriangularSuperior) {
      rotulos.push("triangular_superior");
    }

    // TRIANGULAR INFERIOR //

    let ehTriangularInferior = true;
    for (let i = 0; i < linhas; i++) {
      for (let j = i + 1; j < colunas; j++) {
        if (A[i][j] !== 0) {
          ehTriangularInferior = false;
        }
      }
    }
    if (ehTriangularInferior) {
      rotulos.push("triangular_inferior");
    }
  }

  return rotulos;
}

console.log("Matriz Zero 3x4:", classificarMatriz(matrizZero));
console.log("Matriz Identidade 4x4:", classificarMatriz(matrizIdentidade));
console.log("Matriz Diagonal 3x3:", classificarMatriz(matrizDiagonal));
console.log("Matriz Triangular Superior 3x3:", classificarMatriz(matrizTriangularSuperior));
console.log("Matriz Triangular Inferior 3x3:", classificarMatriz(matrizTriangularInferior));
console.log("Matriz Simétrica 3x3:", classificarMatriz(matrizSimetrica));

// T4 //

// T4 //

// FUNÇÃO PARA MULTIPLICAR MATRIZES //

function multiplicarMatrizes(A, B) {
  if (A[0].length !== B.length) {
    throw new Error("Erro: não é possível multiplicar matrizes com dimensões incompatíveis.");
  }

  let resultado = [];

  for (let i = 0; i < A.length; i++) {
    let linha = [];

    for (let j = 0; j < B[0].length; j++) {
      let soma = 0;

      for (let k = 0; k < A[0].length; k++) {
        soma += A[i][k] * B[k][j];
      }

      linha.push(soma);
    }

    resultado.push(linha);
  }

  return resultado;
}

// MATRIZES PARA TESTAR ERROO
const A = [
  [1, 2],
  [3, 4]
];

const B = [
  [1, 2, 3],
  [4, 5, 6]
];

// TESTE DE ERRO PARA A SOMA //
try {
  let resultado = somarMatrizes(A, B);
  console.log(resultado);
} catch (erro) {
  console.log(erro.message);
}

// TESTE DE ERRO PARA A MULTIPLICAÇÃO //
try {
  let resultado = multiplicarMatrizes(A, B);
  console.log(resultado);
} catch (erro) {
  console.log(erro.message);
}


