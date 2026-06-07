function det_2x2(A) {
  return A[0][0]*A[1][1] - A[0][1]*A[1][0];
}

function det_3x3_sarrus(A) {
  const pos = A[0][0]*A[1][1]*A[2][2]
            + A[0][1]*A[1][2]*A[2][0]
            + A[0][2]*A[1][0]*A[2][1];
  const neg = A[0][2]*A[1][1]*A[2][0]
            + A[0][0]*A[1][2]*A[2][1]
            + A[0][1]*A[1][0]*A[2][2];
  return pos - neg;
}
// Função principal — calcula o determinante de uma matriz NxN por eliminação de Gauss
function det_gauss(A) {
  const n = A.length;

  // Copia a matriz para não alterar o original
  const M = A.map(row => [...row]);

  let det = 1;   // Vamos multiplicando os pivots — o produto final é o determinante
  let swaps = 0; // Cada troca de linhas inverte o sinal do determinante
  const steps = [];

  steps.push({ label: "Matriz inicial", matrix: M.map(r => [...r]) });

  for (let col = 0; col < n; col++) {

    //procura o maior valor na coluna para maior estabilidade numérica
    let maxRow = col;
    for (let row = col + 1; row < n; row++) {
      if (Math.abs(M[row][col]) > Math.abs(M[maxRow][col])) maxRow = row;
    }

    // Troca as linhas se o maior valor não estiver já na posição certa
    if (maxRow !== col) {
      [M[col], M[maxRow]] = [M[maxRow], M[col]];
      swaps++;
      steps.push({ label: `Troca R${col + 1} ↔ R${maxRow + 1}`, matrix: M.map(r => [...r]) });
    }

    // Se o pivot é zero, a matriz é singular e o determinante é 0
    if (Math.abs(M[col][col]) < 1e-12) {
      return { det: 0, steps };
    }
    det *= M[col][col]; // Acumula o produto dos pivots

    // Elimina todos os elementos abaixo do pivot nesta coluna
    for (let row = col + 1; row < n; row++) {
      const factor = M[row][col] / M[col][col]; // Quanto é preciso subtrair para zerar
      for (let k = col; k < n; k++) {
        M[row][k] -= factor * M[col][k];
      }
    }

    steps.push({ label: `Após eliminar coluna ${col + 1}`, matrix: M.map(r => [...r]) });
  }

  // Número ímpar de trocas → determinante muda de sinal
  if (swaps % 2 !== 0) det = -det;

  return { det, steps };
}
const A_t2 = [
  [ 2,  1, -1,  3],
  [-1,  3,  2,  1],
  [ 3, -2,  4, -1],
  [ 1,  2,  3, -2]
];
const resultado = det_gauss(A_t2);

console.log("Passos intermédios (forma echelão):");
resultado.steps.forEach(s => {
  console.log(`\n${s.label}`);
  s.matrix.forEach((row, i) => {
    console.log(`  R${i + 1}: [${row.map(v => v.toFixed(4)).join(", ")}]`);
  });
});
console.log(`\ndet(A) = ${resultado.det}`);

const eps = 1e-8; // Tolerância para comparar floats (evita erros de arredondamento)
// Gera uma matriz NxN com inteiros aleatórios entre -5 e 5
function randMatrix(n) {
  return Array.from({ length: n }, () =>
    Array.from({ length: n }, () => Math.floor(Math.random() * 11) - 5)
  );
}

// Multiplica duas matrizes NxN
function matMul(A, B) {
  const n = A.length;
  return Array.from({ length: n }, (_, i) =>
    Array.from({ length: n }, (_, j) =>
      A[i].reduce((sum, _, k) => sum + A[i][k] * B[k][j], 0)
    )
  );
}
function transpose(A) {
  return A[0].map((_, j) => A.map(row => row[j]));
}

function scalarMul(A, k) {
  return A.map(row => row.map(v => v * k));
}

function verificarPropriedades(A, B, k) {
  const n = A.length;
  const dA = det_gauss(A).det;
  const dB = det_gauss(B).det;

  // P1: det(AB) = det(A) * det(B)
  const p1 = Math.abs(det_gauss(matMul(A, B)).det - dA * dB) < eps;

  // P2: det(Aᵀ) = det(A)
  const p2 = Math.abs(det_gauss(transpose(A)).det - dA) < eps;

  // P3: det(kA) = k^n * det(A)
  const p3 = Math.abs(det_gauss(scalarMul(A, k)).det - Math.pow(k, n) * dA) < eps;

  // P4: trocar duas linhas nega o determinante
  const A4 = A.map(r => [...r]);
  [A4[0], A4[1]] = [A4[1], A4[0]];
  const p4 = Math.abs(det_gauss(A4).det - (-dA)) < eps;

  // P5: somar múltiplo de uma linha a outra não altera o det
  const A5 = A.map(r => [...r]);
  A5[1] = A5[1].map((v, j) => v + 3 * A5[0][j]);
  const p5 = Math.abs(det_gauss(A5).det - dA) < eps;

  console.log(`P1 det(AB)=det(A)×det(B): ${p1}`);
  console.log(`P2 det(Aᵀ)=det(A):        ${p2}`);
  console.log(`P3 det(kA)=k^n×det(A):    ${p3}`);
  console.log(`P4 troca de linhas → -det: ${p4}`);
  console.log(`P5 op. elementar → det=:   ${p5}`);
}

// Usa as funções do T2 (det_gauss) e testa com matrizes aleatórias
const A_t3 = randMatrix(3);
const B_t3 = randMatrix(3);
verificarPropriedades(A_t3, B_t3, 3);

// Norma de Frobenius — mede o "tamanho" da matriz (raiz da soma dos quadrados de todos os elementos)
function normFrobenius(A) {
  return Math.sqrt(A.flat().reduce((s, v) => s + v * v, 0));
}

// Inversa de uma matriz 3x3 pela fórmula direta (adjunta / determinante)
function inverse3x3(A) {
  const d = det_gauss(A);
  if (Math.abs(d) < 1e-12) return null; // Singular — sem inversa

  // Cofatores de cada elemento, transpostos (= adjunta)
  const C = [
    [
       (A[1][1]*A[2][2] - A[1][2]*A[2][1]),
      -(A[1][0]*A[2][2] - A[1][2]*A[2][0]),
       (A[1][0]*A[2][1] - A[1][1]*A[2][0])
    ],
    [
      -(A[0][1]*A[2][2] - A[0][2]*A[2][1]),
       (A[0][0]*A[2][2] - A[0][2]*A[2][0]),
      -(A[0][0]*A[2][1] - A[0][1]*A[2][0])
    ],
    [
       (A[0][1]*A[1][2] - A[0][2]*A[1][1]),
      -(A[0][0]*A[1][2] - A[0][2]*A[1][0]),
       (A[0][0]*A[1][1] - A[0][1]*A[1][0])
    ]
  ];

  return C.map(row => row.map(v => v / d));
}

// Número de condição κ(A) = ‖A‖ × ‖A⁻¹‖
// Quanto maior, mais "instável" a matriz é numericamente
function condNumber(A) {
  const inv = inverse3x3(A);
  if (!inv) return Infinity;
  return normFrobenius(A) * normFrobenius(inv);
}

function eh_invertivel(A) {
  const d = det_gauss(A);
  const cond = condNumber(A);
  const isInvertible = Math.abs(d) > 1e-10;
  const isIllCond = isInvertible && cond > 1e8; // limiar convencional para "mal-condicionada"

  console.log(`det(A)            = ${d}`);
  console.log(`Número de condição = ${cond === Infinity ? '∞' : cond.toFixed(2)}`);

  if (!isInvertible)   console.log('→ Singular: det = 0, sem inversa.');
  else if (isIllCond)  console.log('→ Mal-condicionada: inversa instável numericamente.');
  else                 console.log('→ Invertível e bem-condicionada.');

  return { det: d, cond, isInvertible, isIllCond };
}

// --- Exemplo de uso com as 3 matrizes pedidas ---
const Ainv  = [[2,1,-1],[-1,3,2],[3,-2,4]];  // claramente invertível
const Asing = [[1,2,3],[2,4,6],[1,2,3]];      // singular (linhas proporcionais)
const Aill  = [[1,1,1],[1,1.0001,1],[1,1,1.0002]]; // mal-condicionada

[Ainv, Asing, Aill].forEach((M, i) => {
  console.log(`\n--- Matriz ${i+1} ---`);
  eh_invertivel(M);
});

// Calcula a inversa de uma matriz NxN pelo método de Gauss-Jordan
// A ideia é construir [A | I] e transformá-la em [I | A⁻¹]
function inversa_gauss_jordan(A) {
  const n = A.length;

  // Passo 1: Constrói a matriz aumentada [A | I]
  const M = [];
  for (let i = 0; i < n; i++) {
    const row = [];
    for (let j = 0; j < n; j++) row.push(A[i][j]);        // copia A
    for (let j = 0; j < n; j++) row.push(i === j ? 1 : 0); // identidade à direita
    M.push(row);
  }

  // Passo 2: Para cada coluna, zera tudo acima e abaixo do pivot
  for (let col = 0; col < n; col++) {

    // Procura o maior valor na coluna para usar como pivot
    let maxRow = col;
    for (let row = col + 1; row < n; row++) {
      if (Math.abs(M[row][col]) > Math.abs(M[maxRow][col])) maxRow = row;
    }

    // Troca linhas se necessário
    if (maxRow !== col) {
      const tmp = M[col];
      M[col] = M[maxRow];
      M[maxRow] = tmp;
    }

    // Pivot zero → matriz singular, sem inversa
    if (Math.abs(M[col][col]) < 1e-12) {
      console.log("Matriz singular — não tem inversa.");
      return null;
    }

    // Divide a linha do pivot pelo valor do pivot (para ficar 1 na diagonal)
    const pivot = M[col][col];
    for (let k = 0; k < 2 * n; k++) {
      M[col][k] = M[col][k] / pivot;
    }

    // Elimina o elemento desta coluna em todas as outras linhas (acima e abaixo)
    for (let row = 0; row < n; row++) {
      if (row === col) continue;
      const factor = M[row][col];
      for (let k = 0; k < 2 * n; k++) {
        M[row][k] = M[row][k] - factor * M[col][k];
      }
    }
  }

  // Passo 3: A parte direita da matriz aumentada é agora a inversa
  const inversa = [];
  for (let i = 0; i < n; i++) {
    inversa.push(M[i].slice(n));
  }
  return inversa;
}

// Multiplica duas matrizes para verificar A × A⁻¹ = I
function matMul(A, B) {
  const n = A.length;
  const C = [];
  for (let i = 0; i < n; i++) {
    const row = [];
    for (let j = 0; j < n; j++) {
      let soma = 0;
      for (let k = 0; k < n; k++) soma += A[i][k] * B[k][j];
      row.push(soma);
    }
    C.push(row);
  }
  return C;
}

// --- Exemplo de uso ---
const A3 = [[2,1,-1],[-1,3,2],[3,-2,4]];
const inv3 = inversa_gauss_jordan(A3);
console.log("Inversa (3x3):", inv3);
console.log("Verificação A × A⁻¹:", matMul(A3, inv3));

const A4 = [[2,1,-1,3],[-1,3,2,1],[3,-2,4,-1],[1,2,3,-2]];
const inv4 = inversa_gauss_jordan(A4);
console.log("Inversa (4x4):", inv4);
console.log("Verificação A × A⁻¹:", matMul(A4, inv4));
// Determinante de uma matriz 2x2: ad - bc
function det_2x2(a, b, c, d) {
  return a * d - b * c;
}

// Aplica a transformação A a um ponto (px, py)
// Cada coluna da matriz diz para onde vai cada vetor base
function transform(px, py, a, b, c, d) {
  return {
    x: a * px + b * py,
    y: c * px + d * py
  };
}

// Os 4 cantos do quadrado unitário
const unitCorners = [[0,0], [1,0], [1,1], [0,1]];

// Aplica A a cada canto — o resultado é o paralelogramo
const A = { a: 2, b: 1, c: 0.5, d: 2 };
const transformed = unitCorners.map(([px, py]) => transform(px, py, A.a, A.b, A.c, A.d));

const det = det_2x2(A.a, A.b, A.c, A.d);

console.log("Cantos do paralelogramo:", transformed);
console.log(`det(A) = ${det}`);
console.log(`Área do paralelogramo = |det(A)| = ${Math.abs(det)}`);