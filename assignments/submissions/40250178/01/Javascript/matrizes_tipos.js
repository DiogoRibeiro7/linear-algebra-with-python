const math = require('mathjs');

// ─── T1: Criar matrizes especiais ─────────────────────────────────────────────

const zeroMatrix = math.zeros(3, 4);
console.log('Matriz Zero (3x4):');
console.table(zeroMatrix.toArray());

const identityMatrix = math.identity(4);
console.log('Matriz Identidade (4x4):');
console.table(identityMatrix.toArray());

const diagonalMatrix = math.diag([2, 5, -1]);
console.log('Matriz Diagonal [2, 5, -1]:');
console.table(diagonalMatrix.toArray());

const upperTriangular = [
  [1, 2, 3],
  [0, 4, 5],
  [0, 0, 6]
];
console.log('Matriz Triangular Superior (3x3):');
console.table(upperTriangular);

const lowerTriangular = [
  [1, 0, 0],
  [2, 3, 0],
  [4, 5, 6]
];
console.log('Matriz Triangular Inferior (3x3):');
console.table(lowerTriangular);

const M = math.matrix([[1, 2, 3], [4, 5, 6], [7, 8, 9]]);
const symmetricMatrix = math.add(M, math.transpose(M));
console.log('Matriz Simétrica (M + M^T):');
console.table(symmetricMatrix.toArray());

// ─── T2: Dimensões e elemento a[2][3] ─────────────────────────────────────────

function printInfo(name, matrix) {
  const arr = Array.isArray(matrix) ? matrix : matrix.toArray();
  const rows = arr.length;
  const cols = arr[0].length;
  const val = (rows > 2 && cols > 3) ? arr[2][3] : 'N/A (fora dos limites)';
  console.log(`\n${name}: ${rows}x${cols}, a[2][3] = ${val}`);
}

printInfo('Zero 3x4', zeroMatrix);
printInfo('Identidade 4x4', identityMatrix);
printInfo('Diagonal 3x3', diagonalMatrix);
printInfo('Triangular Superior 3x3', upperTriangular);
printInfo('Triangular Inferior 3x3', lowerTriangular);
printInfo('Simétrica 3x3', symmetricMatrix);

// ─── T3: Função classificar_matriz ────────────────────────────────────────────

function isSquare(arr) {
  return arr.every(row => row.length === arr.length);
}

function isZero(arr) {
  return arr.every(row => row.every(v => Math.abs(v) < 1e-10));
}

function isIdentity(arr) {
  if (!isSquare(arr)) return false;
  const n = arr.length;
  for (let i = 0; i < n; i++)
    for (let j = 0; j < n; j++)
      if (Math.abs(arr[i][j] - (i === j ? 1 : 0)) > 1e-10) return false;
  return true;
}

function isDiagonal(arr) {
  if (!isSquare(arr)) return false;
  for (let i = 0; i < arr.length; i++)
    for (let j = 0; j < arr[i].length; j++)
      if (i !== j && Math.abs(arr[i][j]) > 1e-10) return false;
  return true;
}

function isSymmetric(arr) {
  if (!isSquare(arr)) return false;
  const n = arr.length;
  for (let i = 0; i < n; i++)
    for (let j = 0; j < n; j++)
      if (Math.abs(arr[i][j] - arr[j][i]) > 1e-10) return false;
  return true;
}

function isUpperTriangular(arr) {
  if (!isSquare(arr)) return false;
  for (let i = 1; i < arr.length; i++)
    for (let j = 0; j < i; j++)
      if (Math.abs(arr[i][j]) > 1e-10) return false;
  return true;
}

function isLowerTriangular(arr) {
  if (!isSquare(arr)) return false;
  for (let i = 0; i < arr.length; i++)
    for (let j = i + 1; j < arr[i].length; j++)
      if (Math.abs(arr[i][j]) > 1e-10) return false;
  return true;
}

function classificar_matriz(matrix) {
  const arr = (matrix && matrix.toArray) ? matrix.toArray() : matrix;
  const labels = [];
  if (isSquare(arr)) labels.push('square'); else labels.push('rectangular');
  if (isZero(arr)) labels.push('zero');
  if (isIdentity(arr)) labels.push('identity');
  if (isDiagonal(arr)) labels.push('diagonal');
  if (isSymmetric(arr)) labels.push('symmetric');
  if (isUpperTriangular(arr)) labels.push('upper_triangular');
  if (isLowerTriangular(arr)) labels.push('lower_triangular');
  return labels;
}

console.log('\n─── T3: Classificação ───');
console.log('Zero 3x4:', classificar_matriz(zeroMatrix));
console.log('Identidade 4x4:', classificar_matriz(identityMatrix));
console.log('Diagonal:', classificar_matriz(diagonalMatrix));
console.log('Triangular Superior:', classificar_matriz(upperTriangular));
console.log('Triangular Inferior:', classificar_matriz(lowerTriangular));
console.log('Simétrica:', classificar_matriz(symmetricMatrix));

// ─── T4: Erros de dimensões incompatíveis ─────────────────────────────────────

console.log('\n─── T4: Erros de dimensões ───');

try {
  const A = math.matrix([[1, 2, 3], [4, 5, 6]]);       // 2x3
  const B = math.matrix([[1, 2], [3, 4], [5, 6], [7, 8]]); // 4x2
  math.add(A, B);
} catch (e) {
  console.log('Erro ao somar 2x3 + 4x2:', e.message);
}

try {
  const A = math.matrix([[1, 2, 3], [4, 5, 6]]);   // 2x3
  const B = math.matrix([[1, 2], [3, 4], [5, 6]]); // 3x2 — ok
  const C = math.matrix([[1, 2, 3], [4, 5, 6]]);   // 2x3
  math.multiply(A, C); // 2x3 * 2x3 → dimensões internas incompatíveis
} catch (e) {
  console.log('Erro ao multiplicar 2x3 * 2x3:', e.message);
}
