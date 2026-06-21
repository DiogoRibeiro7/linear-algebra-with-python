// A04 - Sistemas Lineares: Gauss e Classificação
const math = require("mathjs");

// T1 - Escalonamento (eliminação de Gauss com pivot parcial)
function escalonar(Ab) {
  const m = Ab.length;
  const n = Ab[0].length;
  const M = Ab.map(r => [...r]); // cópia para não estragar o original
  const log = [];
  let pivo = 0;

  for (let col = 0; col < n - 1 && pivo < m; col++) {
    // procura a maior linha nesta coluna (estabilidade numérica)
    let maxRow = pivo;
    for (let r = pivo + 1; r < m; r++) {
      if (Math.abs(M[r][col]) > Math.abs(M[maxRow][col])) maxRow = r;
    }

    // coluna toda zero, salta
    if (Math.abs(M[maxRow][col]) < 1e-12) continue;

    if (maxRow !== pivo) {
      [M[pivo], M[maxRow]] = [M[maxRow], M[pivo]];
      log.push("Troca R" + (pivo + 1) + " com R" + (maxRow + 1));
    }

    // zera tudo abaixo do pivot
    for (let r = pivo + 1; r < m; r++) {
      if (Math.abs(M[r][col]) < 1e-12) continue;
      const fator = M[r][col] / M[pivo][col];
      for (let k = col; k < n; k++) {
        M[r][k] -= fator * M[pivo][k];
      }
      log.push("R" + (r + 1) + " <- R" + (r + 1) + " - (" + fator.toFixed(3) + ")*R" + (pivo + 1));
    }
    pivo++;
  }
  return { echelon: M, log: log };
}

// T1 - Substituição retroativa
function substituicao_retroativa(U, b) {
  const n = U.length;
  const x = [];
  for (let i = 0; i < n; i++) x.push(0);

  for (let i = n - 1; i >= 0; i--) {
    let soma = b[i];
    for (let j = i + 1; j < n; j++) {
      soma -= U[i][j] * x[j];
    }
    x[i] = soma / U[i][i];
  }
  return x;
}

// conta linhas não nulas na forma escalonada
function caracteristica(A) {
  const n = A[0].length;
  const r = escalonar(A.map(row => [...row, 0])).echelon;
  let count = 0;
  for (let i = 0; i < r.length; i++) {
    let nula = true;
    for (let j = 0; j < n; j++) {
      if (Math.abs(r[i][j]) > 1e-10) nula = false;
    }
    if (!nula) count++;
  }
  return count;
}

// T4 - Classificação por Rouché-Capelli
function classificar_sistema(A, b) {
  const n = A[0].length;
  const Ab = A.map((row, i) => [...row, b[i]]);
  const rA = caracteristica(A);
  const rAb = caracteristica(Ab);

  if (rAb > rA) return "SI";
  if (rA === n) return "SPD";
  return "SPI";
}

// ---------- T1 ----------
console.log("=== T1: Eliminação de Gauss ===");
const Ab1 = [
  [2, 1, -1, 8],
  [-3, -1, 2, -11],
  [-2, 1, 2, -3]
];
const res1 = escalonar(Ab1);
res1.log.forEach(s => console.log("  " + s));

console.log("Forma escalonada:");
for (let i = 0; i < res1.echelon.length; i++) {
  console.log("  R" + (i + 1) + ": [" + res1.echelon[i].map(v => v.toFixed(4)).join(", ") + "]");
}

const U1 = res1.echelon.map(r => r.slice(0, 3));
const b1 = res1.echelon.map(r => r[3]);
const sol1 = substituicao_retroativa(U1, b1);
console.log("Solução: x=" + sol1[0].toFixed(4) + ", y=" + sol1[1].toFixed(4) + ", z=" + sol1[2].toFixed(4));

// ---------- T2 ----------
console.log("\n=== T2: Sistema SPI ===");
const Ab2 = [
  [1, 2, -1, 3],
  [2, 4, -2, 6]  // segunda linha = 2x a primeira
];
const res2 = escalonar(Ab2);
console.log("Forma escalonada:");
for (let i = 0; i < res2.echelon.length; i++) {
  console.log("  R" + (i + 1) + ": [" + res2.echelon[i].map(v => v.toFixed(4)).join(", ") + "]");
}
console.log("A 2a linha anula-se -> y e z são livres. x = 3 - 2y + z");
console.log("Soluções particulares:");
const livres = [[0, 0], [1, 0], [0, 1]];
for (let i = 0; i < livres.length; i++) {
  const y = livres[i][0];
  const z = livres[i][1];
  const x = 3 - 2 * y + z;
  console.log("  y=" + y + ", z=" + z + " -> (" + x + ", " + y + ", " + z + ")");
}

// ---------- T3 ----------
console.log("\n=== T3: Sistema SI ===");
const Ab3 = [
  [1, 2, 3],
  [2, 4, 7]
];
const res3 = escalonar(Ab3);
console.log("Forma escalonada:");
for (let i = 0; i < res3.echelon.length; i++) {
  console.log("  R" + (i + 1) + ": [" + res3.echelon[i].map(v => v.toFixed(4)).join(", ") + "]");
}
console.log("Última linha dá 0 = 1 (contradição) -> sistema impossível");
console.log("Geometricamente são duas retas paralelas que nunca se cruzam");

// ---------- T4 ----------
console.log("\n=== T4: Classificação de sistemas ===");

const sistemas = [
  { A: [[2, 1, -1], [-3, -1, 2], [-2, 1, 2]], b: [8, -11, -3], nome: "3x3" },
  { A: [[1, 2, -1], [2, 4, -2]], b: [3, 6], nome: "2x3 dependente" },
  { A: [[1, 2], [2, 4]], b: [3, 7], nome: "2x2 paralelas" },
  { A: [[1, 0, 0, 0], [0, 1, 0, 0], [0, 0, 1, 0], [0, 0, 0, 1]], b: [1, 2, 3, 4], nome: "4x4 identidade" },
  { A: [[1, 1], [2, 2]], b: [2, 5], nome: "2x2 inconsistente" }
];

for (let i = 0; i < sistemas.length; i++) {
  const s = sistemas[i];
  console.log("  " + s.nome + " -> " + classificar_sistema(s.A, s.b));
}

// ---------- T5 ----------
console.log("\n=== T5: Solução paramétrica ===");
console.log("Sistema: x + y + z = 6,  2x + y - z = 3");
console.log("Resolvendo em função de z=t:  x = 2t - 3,  y = 9 - 3t,  z = t");
const ts = [0, 3, 5];
for (let i = 0; i < ts.length; i++) {
  const t = ts[i];
  const x = 2 * t - 3;
  const y = 9 - 3 * t;
  const z = t;
  console.log("  t=" + t + ": (" + x + ", " + y + ", " + z + ")  eq1=" + (x + y + z) + " eq2=" + (2 * x + y - z));
}

// ---------- T6 ----------
console.log("\n=== T6: Comparação com solver do math.js ===");
const A6 = [[2, 1, -1], [-3, -1, 2], [-2, 1, 2]];
const b6 = [8, -11, -3];
const nativo = math.lusolve(A6, b6).map(v => v[0]);
console.log("Gauss:  " + sol1.map(v => v.toFixed(4)));
console.log("math.js:" + nativo.map(v => v.toFixed(4)));

console.log("Com sistema singular:");
try {
  math.lusolve([[1, 2], [2, 4]], [3, 7]);
} catch (e) {
  console.log("  Erro: " + e.message);
}
