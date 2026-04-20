// Tarefa 1
console.log("=== T1: Criação de Matrizes ===");

const zero34 = math.zeros(3, 4);
const I4 = math.identity(4);
const D3 = math.matrix(math.diag([2, 5, -1]));

const M = math.matrix([
  [1, 2, 3],
  [0, -1, 4],
  [5, 6, 0]
]);

function upperTriangular(A) {
  const [r, c] = A.size();
  const data = A.toArray();
  for (let i = 0; i < r; i++) {
    for (let j = 0; j < c; j++) {
      if (i > j) data[i][j] = 0;
    }
  }
  return math.matrix(data);
}

const U = upperTriangular(M);

function lowerTriangular(A) {
  const [r, c] = A.size();
  const data = A.toArray();
  for (let i = 0; i < r; i++) {
    for (let j = 0; j < c; j++) {
      if (i < j) data[i][j] = 0;
    }
  }
  return math.matrix(data);
}

const L = lowerTriangular(M);

const S = math.add(M, math.transpose(M));

// 🔧 CORREÇÃO: concatenação correta
console.log("Zero 3x4:\n" + zero34.toString());
console.log("Identidade 4x4:\n" + I4.toString());
console.log("Diagonal 3x3:\n" + D3.toString());
console.log("Triangular superior:\n" + U.toString());
console.log("Triangular inferior:\n" + L.toString());
console.log("Simétrica:\n" + S.toString());


// ================= T2 =================

console.log("\n=== T2: Dimensões e elemento (2,3) ===");

function infoMatriz(nome, A) {
  const size = A.size();

  console.log(`\n${nome}`);
  console.log("Dimensões:", size[0], "x", size[1]);

  // 🔧 CORREÇÃO: condição correta para índice [2,3]
  if (size[0] >= 3 && size[1] >= 4) {
    console.log("Elemento (2,3):", A.get([2, 3]));
  } else {
    console.log("Elemento (2,3): não existe");
  }
}

infoMatriz("Zero 3x4", zero34);
infoMatriz("Identidade 4x4", I4);
infoMatriz("Diagonal 3x3", D3);
infoMatriz("Triangular superior", U);
infoMatriz("Triangular inferior", L);
infoMatriz("Simétrica", S);


// ================= T3 =================

console.log("\n=== T3: Classificação de Matrizes ===");

function classificar_matriz(A) {
  const labels = [];
  const [r, c] = A.size();
  const AT = math.transpose(A);

  if (r === c) labels.push("square");
  else labels.push("rectangular");

  if (math.deepEqual(A, math.zeros(r, c))) labels.push("zero");

  if (r === c && math.deepEqual(A, math.identity(r))) {
    labels.push("identity");
  }

  if (r === c) {
    const data = A.toArray();
    let diagonal = true;
    for (let i = 0; i < r; i++) {
      for (let j = 0; j < c; j++) {
        if (i !== j && data[i][j] !== 0) diagonal = false;
      }
    }
    if (diagonal) labels.push("diagonal");
  }

  if (r === c && math.deepEqual(A, AT)) labels.push("symmetric");

  if (r === c) {
    let upper = true;
    const data = A.toArray();
    for (let i = 0; i < r; i++) {
      for (let j = 0; j < i; j++) {
        if (data[i][j] !== 0) upper = false;
      }
    }
    if (upper) labels.push("upper_triangular");
  }

  if (r === c) {
    let lower = true;
    const data = A.toArray();
    for (let i = 0; i < r; i++) {
      for (let j = i + 1; j < c; j++) {
        if (data[i][j] !== 0) lower = false;
      }
    }
    if (lower) labels.push("lower_triangular");
  }

  return labels;
}

[
  ["Zero 3x4", zero34],
  ["Identidade", I4],
  ["Diagonal", D3],
  ["Superior", U],
  ["Inferior", L],
  ["Simétrica", S],
].forEach(([nome, A]) => {
  console.log(nome, "→", classificar_matriz(A));
});


// ================= T4 =================

console.log("\n=== T4: Erros de Dimensão ===");

const A = math.zeros(2, 3);
const B = math.zeros(4, 2);

try {
  math.add(A, B);
} catch (e) {
  console.log("Erro ao somar 2x3 + 4x2:");
  console.log(e.message);
}

try {
  math.multiply(A, B);
} catch (e) {
  console.log("\nErro ao multiplicar 2x3 * 4x2:");
  console.log(e.message);
}