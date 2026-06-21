const math = require('mathjs');

// ─── T1: Regra de Cramer ──────────────────────────────────────────────────────

function cramer_2x2(A, b) {
  const detA = A[0][0] * A[1][1] - A[0][1] * A[1][0];
  if (Math.abs(detA) < 1e-10) throw new Error('Sistema singular, Cramer não aplicável');
  const A1 = [[b[0], A[0][1]], [b[1], A[1][1]]];
  const A2 = [[A[0][0], b[0]], [A[1][0], b[1]]];
  const det1 = A1[0][0] * A1[1][1] - A1[0][1] * A1[1][0];
  const det2 = A2[0][0] * A2[1][1] - A2[0][1] * A2[1][0];
  return [det1 / detA, det2 / detA];
}

function cramer_3x3(A, b) {
  const detA = math.det(A);
  if (Math.abs(detA) < 1e-10) throw new Error('Sistema singular, Cramer não aplicável');
  const n = 3;
  const result = [];
  for (let i = 0; i < n; i++) {
    const Ai = A.map((row, r) => row.map((val, c) => c === i ? b[r] : val));
    result.push(math.det(Ai) / detA);
  }
  return result;
}

const A2 = [[2, 1], [5, 3]];
const b2 = [1, 2];
const sol2 = cramer_2x2(A2, b2);
console.log('Cramer 2x2:', sol2);
console.log('Verificação math.lusolve:', math.lusolve(A2, b2).flat());

const A3 = [[2, -1, 1], [3, 2, -1], [1, -1, 2]];
const b3 = [3, 1, 4];
const sol3 = cramer_3x3(A3, b3);
console.log('\nCramer 3x3:', sol3);
console.log('Verificação math.lusolve:', math.lusolve(A3, b3).flat());

// ─── T2: Decomposição LU ──────────────────────────────────────────────────────

function luDecompose(A) {
  const n = A.length;
  const L = Array.from({length: n}, (_, i) => Array.from({length: n}, (_, j) => i === j ? 1 : 0));
  const U = A.map(row => [...row]);
  const P = Array.from({length: n}, (_, i) => Array.from({length: n}, (_, j) => i === j ? 1 : 0));

  for (let k = 0; k < n; k++) {
    // partial pivoting
    let maxVal = Math.abs(U[k][k]);
    let maxRow = k;
    for (let i = k + 1; i < n; i++) {
      if (Math.abs(U[i][k]) > maxVal) { maxVal = Math.abs(U[i][k]); maxRow = i; }
    }
    if (maxRow !== k) {
      [U[k], U[maxRow]] = [U[maxRow], U[k]];
      [P[k], P[maxRow]] = [P[maxRow], P[k]];
      for (let j = 0; j < k; j++) [L[k][j], L[maxRow][j]] = [L[maxRow][j], L[k][j]];
    }
    for (let i = k + 1; i < n; i++) {
      L[i][k] = U[i][k] / U[k][k];
      for (let j = k; j < n; j++) U[i][j] -= L[i][k] * U[k][j];
    }
  }
  return { P, L, U };
}

const Alu = [[2, 1, -1], [-3, -1, 2], [-2, 1, 2]];
const { P, L, U } = luDecompose(Alu);

console.log('\n─── T2: Decomposição LU ───');
console.log('P:'); console.table(P);
console.log('L:'); console.table(L);
console.log('U:'); console.table(U);

const PA = math.multiply(P, Alu);
const LU = math.multiply(L, U);
const eq = (X, Y) => math.deepEqual(math.round(math.matrix(X), 8), math.round(math.matrix(Y), 8));
console.log('PA == LU?', eq(PA, LU));

// det(A) = produto da diagonal de U
const detFromU = U.reduce((acc, row, i) => acc * row[i], 1);
console.log('det(A) via diagonal de U:', detFromU);
console.log('det(A) via math.det:', math.det(Alu));

// ─── T3: Benchmark ────────────────────────────────────────────────────────────

function randomMatrix(n) {
  return Array.from({length: n}, () => Array.from({length: n}, () => Math.random() * 10));
}

function randomVector(n) {
  return Array.from({length: n}, () => Math.random() * 10);
}

function timeit(fn, reps = 5) {
  let best = Infinity;
  for (let i = 0; i < reps; i++) {
    const t0 = process.hrtime.bigint();
    fn();
    const t1 = process.hrtime.bigint();
    const ms = Number(t1 - t0) / 1e6;
    if (ms < best) best = ms;
  }
  return best;
}

const sizes = [2, 3, 5, 10, 20, 50, 100];
console.log('\n─── T3: Benchmark ───');
console.log('n\tCramer(ms)\tLusolve(ms)');

for (const n of sizes) {
  const Am = randomMatrix(n);
  const bv = randomVector(n);

  let tCramer = 'N/A';
  if (n <= 3) {
    tCramer = timeit(() => n === 2 ? cramer_2x2(Am, bv) : cramer_3x3(Am, bv)).toFixed(4);
  }
  const tLu = timeit(() => math.lusolve(Am, bv)).toFixed(4);
  console.log(`${n}\t${tCramer}\t\t${tLu}`);
}

// ─── T4: Múltiplos segundos membros com LU ───────────────────────────────────

console.log('\n─── T4: Multi-RHS com LU ───');
const Afixed = [[4, 3, 2], [1, 5, 3], [2, 1, 6]];
const bs = [[1, 0, 0], [0, 1, 0], [1, 2, 3]];

const t0multi = process.hrtime.bigint();
const lufact = math.lup(Afixed);
for (const bv2 of bs) {
  math.lusolve(lufact, bv2);
}
const t1multi = process.hrtime.bigint();
console.log('Tempo com LU reutilizado:', Number(t1multi - t0multi) / 1e6, 'ms');

const t0scratch = process.hrtime.bigint();
for (const bv2 of bs) {
  math.lusolve(Afixed, bv2);
}
const t1scratch = process.hrtime.bigint();
console.log('Tempo resolvendo do zero cada vez:', Number(t1scratch - t0scratch) / 1e6, 'ms');

// ─── T5: Heatmap (output texto para Node) ─────────────────────────────────────

console.log('\n─── T5: Estrutura das matrizes A, L, U ───');
['A', 'L', 'U'].forEach((name, idx) => {
  const mat = [Alu, L, U][idx];
  console.log(`\n${name}:`);
  mat.forEach(row => console.log(row.map(v => v.toFixed(2).padStart(7)).join(' ')));
});
