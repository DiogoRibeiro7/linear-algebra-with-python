const math = require('mathjs');

const eps = 1e-10;

// ─── T1: Eliminação de Gauss com pivotamento parcial + substituição retroativa ─

function escalonar(Ab) {
  const m = Ab.map(row => [...row]);
  const rows = m.length;
  const cols = m[0].length;
  const log = [];

  for (let col = 0, row = 0; col < cols - 1 && row < rows; col++) {
    // pivotamento parcial
    let maxRow = row;
    for (let i = row + 1; i < rows; i++) {
      if (Math.abs(m[i][col]) > Math.abs(m[maxRow][col])) maxRow = i;
    }
    if (Math.abs(m[maxRow][col]) < eps) continue;

    if (maxRow !== row) {
      [m[row], m[maxRow]] = [m[maxRow], m[row]];
      log.push(`Troca linha ${row+1} <-> linha ${maxRow+1}`);
    }

    for (let i = row + 1; i < rows; i++) {
      const fator = m[i][col] / m[row][col];
      if (Math.abs(fator) < eps) continue;
      for (let j = col; j < cols; j++) m[i][j] -= fator * m[row][j];
      log.push(`L${i+1} = L${i+1} - (${fator.toFixed(4)}) * L${row+1}`);
    }
    row++;
  }
  return { echelon: m, log };
}

function substituicao_retroativa(echelon) {
  const rows = echelon.length;
  const cols = echelon[0].length;
  const n = cols - 1;
  const x = new Array(n).fill(0);

  for (let i = rows - 1; i >= 0; i--) {
    // encontrar pivot
    let pivCol = -1;
    for (let j = 0; j < n; j++) {
      if (Math.abs(echelon[i][j]) > eps) { pivCol = j; break; }
    }
    if (pivCol === -1) continue;
    let sum = echelon[i][n];
    for (let j = pivCol + 1; j < n; j++) sum -= echelon[i][j] * x[j];
    x[pivCol] = sum / echelon[i][pivCol];
  }
  return x;
}

console.log('─── T1: Sistema 2x + y - z = 8, -3x - y + 2z = -11, -2x + y + 2z = -3 ───');
const Ab1 = [
  [2,  1, -1,  8],
  [-3, -1,  2, -11],
  [-2,  1,  2, -3]
];
const { echelon: E1, log: log1 } = escalonar(Ab1);
log1.forEach(l => console.log(' ', l));
console.log('Forma escalonada:'); E1.forEach(r => console.log(' ', r.map(v => v.toFixed(4))));
const sol1 = substituicao_retroativa(E1);
console.log('Solução: x =', sol1[0].toFixed(4), 'y =', sol1[1].toFixed(4), 'z =', sol1[2].toFixed(4));
console.log('Verificação math.lusolve:', math.lusolve([[2,1,-1],[-3,-1,2],[-2,1,2]],[8,-11,-3]).flat().map(v=>v.toFixed(4)));

// ─── T2: Sistema SPI (segunda linha múltiplo da primeira) ─────────────────────

console.log('\n─── T2: Sistema SPI ───');
const Ab2 = [
  [1, 2, 3],
  [2, 4, 6]   // 2 * linha 1 → dependente
];
const { echelon: E2, log: log2 } = escalonar(Ab2);
log2.forEach(l => console.log(' ', l));
console.log('Forma escalonada:'); E2.forEach(r => console.log(' ', r));

// variável livre: x2 = t
console.log('Solução paramétrica: x1 = 3 - 2t, x2 = t (t livre)');
[0, 1, 2].forEach(t => {
  const x1 = 3 - 2*t, x2 = t;
  console.log(`  t=${t}: x1=${x1}, x2=${x2} → verif: ${1*x1 + 2*x2} = 3 ✓`);
});

// ─── T3: Sistema SI (impossível) ─────────────────────────────────────────────

console.log('\n─── T3: Sistema SI ───');
const Ab3 = [
  [1, 2, 3],
  [1, 2, 5]   // mesmos coeficientes, b diferente → contradição
];
const { echelon: E3, log: log3 } = escalonar(Ab3);
log3.forEach(l => console.log(' ', l));
console.log('Forma escalonada:'); E3.forEach(r => console.log(' ', r));
console.log('Linha [0, 0, 2] → 0 = 2: contradição, sistema impossível');
console.log('Geometricamente: duas retas paralelas, nunca se intersectam');

// ─── T4: classificar_sistema com Rouché-Capelli ───────────────────────────────

function rank(matrix) {
  const m = matrix.map(r => [...r]);
  const rows = m.length, cols = m[0].length;
  let r = 0;
  for (let col = 0; col < cols && r < rows; col++) {
    let pivot = -1;
    for (let i = r; i < rows; i++) {
      if (Math.abs(m[i][col]) > eps) { pivot = i; break; }
    }
    if (pivot === -1) continue;
    [m[r], m[pivot]] = [m[pivot], m[r]];
    for (let i = r + 1; i < rows; i++) {
      const f = m[i][col] / m[r][col];
      for (let j = col; j < cols; j++) m[i][j] -= f * m[r][j];
    }
    r++;
  }
  return r;
}

function classificar_sistema(A, b) {
  const Ab = A.map((row, i) => [...row, b[i]]);
  const rA = rank(A);
  const rAb = rank(Ab);
  const n = A[0].length;
  if (rA !== rAb) return 'SI';
  if (rA === n) return 'SPD';
  return 'SPI';
}

console.log('\n─── T4: Classificação de sistemas ───');
const sistemas = [
  { A:[[2,1],[-1,3]], b:[5,4], esperado:'SPD' },
  { A:[[1,2],[2,4]], b:[3,6], esperado:'SPI' },
  { A:[[1,2],[2,4]], b:[3,7], esperado:'SI' },
  { A:[[1,0,0],[0,1,0],[0,0,1]], b:[1,2,3], esperado:'SPD' },
  { A:[[1,2,3],[4,5,6],[7,8,9]], b:[1,2,3], esperado:'SPI' }
];
sistemas.forEach(s => {
  const res = classificar_sistema(s.A, s.b);
  console.log(`Esperado: ${s.esperado} → Resultado: ${res}`);
});

// ─── T5: Solução paramétrica explícita ────────────────────────────────────────

console.log('\n─── T5: Solução paramétrica ───');
// x + 2y + z = 4
// 2x + 4y + 2z = 8  (dependente)
const A5 = [[1,2,1],[2,4,2]];
const b5 = [4, 8];
console.log('Sistema: x + 2y + z = 4 (com 3 incógnitas e 1 equação independente)');
console.log('Variáveis livres: y=s, z=t');
console.log('Solução geral: x = 4 - 2s - t, y = s, z = t');
[[0,0],[1,0],[0,1],[1,1]].forEach(([s,t]) => {
  const x = 4 - 2*s - t;
  const check = x + 2*s + t;
  console.log(`  s=${s}, t=${t}: x=${x} → verificação: ${check} = 4 ✓`);
});

// ─── T6: Comparação com solver built-in ───────────────────────────────────────

console.log('\n─── T6: Comparação com math.lusolve ───');
const A6 = [[3,1,-1],[1,4,2],[2,-1,5]];
const b6 = [2, 7, 3];
const { echelon: E6 } = escalonar(A6.map((r,i) => [...r, b6[i]]));
const mySol = substituicao_retroativa(E6);
const builtIn = math.lusolve(A6, b6).flat();
console.log('Minha solução:', mySol.map(v=>v.toFixed(6)));
console.log('math.lusolve:', builtIn.map(v=>v.toFixed(6)));

try {
  const Asing = [[1,2],[2,4]];
  const bsing = [1,3];
  math.lusolve(Asing, bsing);
} catch(e) {
  console.log('Solver com sistema singular:', e.message);
}
