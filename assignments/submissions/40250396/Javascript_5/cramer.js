// A05 - Cramer e Decomposição LU
const math = require("mathjs");

// multiplica duas matrizes
function multiplica(A, B) {
  const n = A.length;
  const p = B[0].length;
  const q = B.length;
  const C = [];
  for (let i = 0; i < n; i++) {
    C[i] = [];
    for (let j = 0; j < p; j++) {
      let soma = 0;
      for (let k = 0; k < q; k++) {
        soma += A[i][k] * B[k][j];
      }
      C[i][j] = soma;
    }
  }
  return C;
}

// determinante por Gauss (reutilizado em vários sítios)
function det_gauss(A) {
  const n = A.length;
  const M = A.map(r => [...r]);
  let det = 1;
  let trocas = 0;
  for (let col = 0; col < n; col++) {
    let maxRow = col;
    for (let r = col + 1; r < n; r++) {
      if (Math.abs(M[r][col]) > Math.abs(M[maxRow][col])) maxRow = r;
    }
    if (maxRow !== col) {
      [M[col], M[maxRow]] = [M[maxRow], M[col]];
      trocas++;
    }
    if (Math.abs(M[col][col]) < 1e-12) return 0;
    det *= M[col][col];
    for (let r = col + 1; r < n; r++) {
      const fator = M[r][col] / M[col][col];
      for (let k = col; k < n; k++) {
        M[r][k] -= fator * M[col][k];
      }
    }
  }
  if (trocas % 2 !== 0) det = -det;
  return det;
}

// T1 - Regra de Cramer
function cramer_2x2(A, b) {
  const d = A[0][0] * A[1][1] - A[0][1] * A[1][0];
  if (Math.abs(d) < 1e-12) return null;
  const x = (b[0] * A[1][1] - A[0][1] * b[1]) / d;
  const y = (A[0][0] * b[1] - b[0] * A[1][0]) / d;
  return [x, y];
}

function cramer_3x3(A, b) {
  const d = det_gauss(A);
  if (Math.abs(d) < 1e-12) return null;
  const resultado = [];
  for (let i = 0; i < 3; i++) {
    // substitui a coluna i por b
    const Ai = A.map(linha => [...linha]);
    for (let r = 0; r < 3; r++) {
      Ai[r][i] = b[r];
    }
    resultado.push(det_gauss(Ai) / d);
  }
  return resultado;
}

console.log("=== T1: Regra de Cramer ===");
const A2 = [[2, 1], [1, 3]];
const b2 = [5, 10];
const sol2 = cramer_2x2(A2, b2);
console.log("2x2: x=" + sol2[0] + ", y=" + sol2[1]);
console.log("math.js: " + math.lusolve(A2, b2).map(v => v[0]));

const A3 = [[1, 2, 1], [2, 1, 1], [1, 1, 2]];
const b3 = [8, 9, 7];
const sol3 = cramer_3x3(A3, b3);
console.log("3x3: " + sol3.map(v => v.toFixed(4)));
console.log("math.js: " + math.lusolve(A3, b3).map(v => v[0].toFixed(4)));

// T2 - Decomposição LU
function lu_decomp(A) {
  const n = A.length;
  // L começa como identidade, U como cópia de A, P como identidade
  const L = [];
  const U = A.map(r => [...r]);
  const P = [];
  for (let i = 0; i < n; i++) {
    L[i] = [];
    P[i] = [];
    for (let j = 0; j < n; j++) {
      L[i][j] = (i === j) ? 1 : 0;
      P[i][j] = (i === j) ? 1 : 0;
    }
  }

  let trocas = 0;
  for (let col = 0; col < n; col++) {
    let maxRow = col;
    for (let r = col + 1; r < n; r++) {
      if (Math.abs(U[r][col]) > Math.abs(U[maxRow][col])) maxRow = r;
    }
    if (maxRow !== col) {
      [U[col], U[maxRow]] = [U[maxRow], U[col]];
      [P[col], P[maxRow]] = [P[maxRow], P[col]];
      // troca também a parte já preenchida de L
      for (let k = 0; k < col; k++) {
        [L[col][k], L[maxRow][k]] = [L[maxRow][k], L[col][k]];
      }
      trocas++;
    }
    for (let r = col + 1; r < n; r++) {
      const fator = U[r][col] / U[col][col];
      L[r][col] = fator;
      for (let k = col; k < n; k++) {
        U[r][k] -= fator * U[col][k];
      }
    }
  }
  return { P: P, L: L, U: U, trocas: trocas };
}

// resolve L*y = Pb e depois U*x = y
function lu_solve(L, U, Pb) {
  const n = L.length;
  const y = [];
  for (let i = 0; i < n; i++) {
    let soma = Pb[i];
    for (let j = 0; j < i; j++) soma -= L[i][j] * y[j];
    y[i] = soma;
  }
  const x = [];
  for (let i = n - 1; i >= 0; i--) {
    let soma = y[i];
    for (let j = i + 1; j < n; j++) soma -= U[i][j] * x[j];
    x[i] = soma / U[i][i];
  }
  return x;
}

// multiplica matriz por vetor
function matVec(A, v) {
  const r = [];
  for (let i = 0; i < A.length; i++) {
    let soma = 0;
    for (let j = 0; j < v.length; j++) soma += A[i][j] * v[j];
    r[i] = soma;
  }
  return r;
}

function mostraMatriz(M) {
  for (let i = 0; i < M.length; i++) {
    console.log("  [" + M[i].map(v => v.toFixed(4)).join(", ") + "]");
  }
}

console.log("\n=== T2: Decomposição LU ===");
const ALU = [[2, 1, 0], [1, 3, 1], [0, 1, 2]];
const lu = lu_decomp(ALU);
console.log("P:"); mostraMatriz(lu.P);
console.log("L:"); mostraMatriz(lu.L);
console.log("U:"); mostraMatriz(lu.U);

const PA = multiplica(lu.P, ALU);
const LU = multiplica(lu.L, lu.U);
let igual = true;
for (let i = 0; i < PA.length; i++) {
  for (let j = 0; j < PA.length; j++) {
    if (Math.abs(PA[i][j] - LU[i][j]) > 1e-10) igual = false;
  }
}
console.log("PA = LU ? " + igual);

let detU = 1;
for (let i = 0; i < lu.U.length; i++) detU *= lu.U[i][i];
if (lu.trocas % 2 !== 0) detU = -detU;
console.log("det(A) pela diagonal de U = " + detU.toFixed(4));
console.log("det(A) por Gauss = " + det_gauss(ALU).toFixed(4));

// T3 - Benchmark
function matrizAleatoria(n) {
  const M = [];
  for (let i = 0; i < n; i++) {
    M[i] = [];
    for (let j = 0; j < n; j++) {
      M[i][j] = (Math.random() - 0.5) * 10;
    }
  }
  return M;
}

function gauss_solve(A, b) {
  const n = A.length;
  const Ab = A.map((r, i) => [...r, b[i]]);
  for (let col = 0; col < n; col++) {
    let maxRow = col;
    for (let r = col + 1; r < n; r++) {
      if (Math.abs(Ab[r][col]) > Math.abs(Ab[maxRow][col])) maxRow = r;
    }
    [Ab[col], Ab[maxRow]] = [Ab[maxRow], Ab[col]];
    for (let r = col + 1; r < n; r++) {
      const fator = Ab[r][col] / Ab[col][col];
      for (let k = col; k <= n; k++) Ab[r][k] -= fator * Ab[col][k];
    }
  }
  const x = [];
  for (let i = n - 1; i >= 0; i--) {
    let soma = Ab[i][n];
    for (let j = i + 1; j < n; j++) soma -= Ab[i][j] * x[j];
    x[i] = soma / Ab[i][i];
  }
  return x;
}

function cramer_n(A, b) {
  const d = det_gauss(A);
  if (Math.abs(d) < 1e-12) return null;
  const x = [];
  for (let i = 0; i < b.length; i++) {
    const Ai = A.map(r => [...r]);
    for (let r = 0; r < A.length; r++) Ai[r][i] = b[r];
    x.push(det_gauss(Ai) / d);
  }
  return x;
}

console.log("\n=== T3: Benchmark (ms por solução) ===");
const tamanhos = [2, 3, 5, 10, 20];
const repeticoes = 200;
console.log("n\tCramer\t\tGauss\t\tLU");
for (let t = 0; t < tamanhos.length; t++) {
  const n = tamanhos[t];
  const A = matrizAleatoria(n);
  const b = [];
  for (let i = 0; i < n; i++) b.push(Math.random() * 10);

  let tempoCramer = "N/A";
  if (n <= 10) {
    const ini = performance.now();
    for (let i = 0; i < repeticoes; i++) cramer_n(A, b);
    tempoCramer = ((performance.now() - ini) / repeticoes).toFixed(4);
  }

  let ini = performance.now();
  for (let i = 0; i < repeticoes; i++) gauss_solve(A, b);
  const tempoGauss = ((performance.now() - ini) / repeticoes).toFixed(4);

  const fat = lu_decomp(A);
  ini = performance.now();
  for (let i = 0; i < repeticoes; i++) lu_solve(fat.L, fat.U, matVec(fat.P, b));
  const tempoLU = ((performance.now() - ini) / repeticoes).toFixed(4);

  console.log(n + "\t" + tempoCramer + "\t\t" + tempoGauss + "\t\t" + tempoLU);
}

// T4 - Vários b com uma só fatorização
console.log("\n=== T4: Vários b com a mesma LU ===");
const Amulti = [[2, 1, 0], [1, 3, 1], [0, 1, 2]];
const bs = [[3, 8, 5], [1, 2, 3], [4, 6, 2]];
const fatMulti = lu_decomp(Amulti);

for (let i = 0; i < bs.length; i++) {
  const x = lu_solve(fatMulti.L, fatMulti.U, matVec(fatMulti.P, bs[i]));
  const verif = matVec(Amulti, x);
  console.log("b" + (i + 1) + "=" + JSON.stringify(bs[i]) + " -> x=" + x.map(v => v.toFixed(4)) + "  Ax=" + verif.map(v => v.toFixed(4)));
}
