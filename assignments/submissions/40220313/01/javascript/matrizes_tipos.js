import * as math from "mathjs";

// =========================
// T1 - Criar matrizes
// =========================

// Matrizes básicas
const matrizZero = math.zeros(3, 4);
const matrizIdentidade = math.identity(4);
const matrizDiagonal = math.diag([2, 5, -1]);

// matriz base (vou usar valores diferentes para variar)
const matrizBase = math.matrix([
  [2, 1, 0],
  [3, 5, 6],
  [7, 8, 4]
]);

// funções para triangular (math.js não tem isto direto)
function fazerUpper(A) {
  const dados = A.toArray();

  return math.matrix(
    dados.map((linha, i) =>
      linha.map((valor, j) => (j < i ? 0 : valor))
    )
  );
}

function fazerLower(A) {
  const dados = A.toArray();

  return math.matrix(
    dados.map((linha, i) =>
      linha.map((valor, j) => (j > i ? 0 : valor))
    )
  );
}

const matrizUpper = fazerUpper(matrizBase);
const matrizLower = fazerLower(matrizBase);

// simétrica
const matrizAleatoria = math.matrix([
  [1, 4, 2],
  [0, 3, 5],
  [7, 1, 6]
]);

const matrizSimetrica = math.add(
  matrizAleatoria,
  math.transpose(matrizAleatoria)
);


// =========================
// T2 - Info das matrizes
// =========================

function mostrarInfo(mat, nome) {
  console.log(`\n===== ${nome} =====`);
  console.table(mat.toArray());

  const [linhas, colunas] = mat.size();
  console.log(`Dimensão: ${linhas} x ${colunas}`);

  // tentar aceder posição [2,3]
  try {
    const valor = mat.get([2, 3]);
    console.log("Valor na posição [2,3]:", valor);
  } catch {
    console.log("Posição [2,3] não existe nesta matriz");
  }
}

const listaMatrizes = {
  "Matriz Zero": matrizZero,
  "Matriz Identidade": matrizIdentidade,
  "Matriz Diagonal": matrizDiagonal,
  "Matriz Triangular Superior": matrizUpper,
  "Matriz Triangular Inferior": matrizLower,
  "Matriz Simétrica": matrizSimetrica
};

for (const nome in listaMatrizes) {
  mostrarInfo(listaMatrizes[nome], nome);
}


// =========================
// T3 - Classificação
// =========================

// função para comparar matrizes (evitar erros de floats)
function saoIguais(A, B) {
  return math.deepEqual(
    math.round(A, 10),
    math.round(B, 10)
  );
}

function classificar_matriz(A) {
  const tipos = [];
  const [linhas, colunas] = A.size();

  // quadrada ou retangular
  if (linhas === colunas) {
    tipos.push("square");
  } else {
    tipos.push("rectangular");
  }

  // zero
  if (saoIguais(A, math.zeros(linhas, colunas))) {
    tipos.push("zero");
  }

  // identidade
  if (linhas === colunas && saoIguais(A, math.identity(linhas))) {
    tipos.push("identity");
  }

  // diagonal
  if (linhas === colunas && saoIguais(A, math.diag(math.diag(A)))) {
    tipos.push("diagonal");
  }

  // simétrica
  if (linhas === colunas && saoIguais(A, math.transpose(A))) {
    tipos.push("symmetric");
  }

  // triangular superior
  if (linhas === colunas && saoIguais(A, fazerUpper(A))) {
    tipos.push("upper_triangular");
  }

  // triangular inferior
  if (linhas === colunas && saoIguais(A, fazerLower(A))) {
    tipos.push("lower_triangular");
  }

  return tipos;
}

console.log("\n===== RESULTADOS DA CLASSIFICAÇÃO =====");

for (const nome in listaMatrizes) {
  const resultado = classificar_matriz(listaMatrizes[nome]);
  console.log(`${nome}:`, resultado);
}


// =========================
// T4 - Erros
// =========================

console.log("\n===== TESTE DE ERROS =====");

// soma inválida
try {
  const A = math.zeros(2, 3);
  const B = math.zeros(4, 2);

  const soma = math.add(A, B);
  console.log(soma);
} catch (erro) {
  console.log("Erro ao somar matrizes incompatíveis:");
  console.log(erro.message);
}

// multiplicação inválida
try {
  const A = math.zeros(2, 3);
  const B = math.zeros(4, 2);

  const mult = math.multiply(A, B);
  console.log(mult);
} catch (erro) {
  console.log("Erro ao multiplicar matrizes incompatíveis:");
  console.log(erro.message);
}