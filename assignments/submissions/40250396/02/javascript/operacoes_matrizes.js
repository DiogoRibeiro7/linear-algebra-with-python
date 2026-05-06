// T1 - Operações com Matrizes: Adição, Subtração e Escalar

const A = [
  [1, 2, 3],
  [4, 5, 6]
];

const B = [
  [7, 8, 9],
  [1, 2, 3]
];

const AsomaB = [
  [A[0][0]+B[0][0], A[0][1]+B[0][1], A[0][2]+B[0][2]],
  [A[1][0]+B[1][0], A[1][1]+B[1][1], A[1][2]+B[1][2]]
];

const AsubB = [
  [A[0][0]-B[0][0], A[0][1]-B[0][1], A[0][2]-B[0][2]],
  [A[1][0]-B[1][0], A[1][1]-B[1][1], A[1][2]-B[1][2]]
];

const tresA = [
  [3*A[0][0], 3*A[0][1], 3*A[0][2]],
  [3*A[1][0], 3*A[1][1], 3*A[1][2]]
];

console.log("A + B =", AsomaB);
console.log("A - B =", AsubB);
console.log("3A =",    tresA);

console.assert(AsomaB.length === 2,    "número de linhas errado!");
console.assert(AsomaB[0].length === 3, "número de colunas errado!");
console.log("A+B tem dimensoes 2x3");


// T2 - Multiplicação de Matrizes: AC e CA

const C = [
  [7, 8],
  [9, 1],
  [2, 3]
];

function multiplica(M1, M2) {
  const m = M1.length;
  const n = M2.length;
  const p = M2[0].length;
  const resultado = [];
  for (let i = 0; i < m; i++) {
    resultado[i] = [];
    for (let j = 0; j < p; j++) {
      let soma = 0;
      for (let k = 0; k < n; k++) {
        soma += M1[i][k] * M2[k][j];
      }
      resultado[i][j] = soma;
    }
  }
  return resultado;
}

function saoIguais(M1, M2) {
  for (let i = 0; i < M1.length; i++)
    for (let j = 0; j < M1[0].length; j++)
      if (M1[i][j] !== M2[i][j]) return false;
  return true;
}

const AC = multiplica(A, C);
const CA = multiplica(C, A);

console.log("\nAC =", AC);
console.log("CA =", CA);
console.log("AC tem dimensões:", AC.length + "x" + AC[0].length);
console.log("CA tem dimensões:", CA.length + "x" + CA[0].length);
console.log("AC != CA porque têm dimensões diferentes e a multiplicação não é comutativa");


// T3 - Comutador: PQ, QP e [P,Q] = PQ - QP

const P = [
  [1, 2],
  [3, 4]
];

const Q = [
  [5, 6],
  [7, 8]
];

const I = [
  [1, 0],
  [0, 1]
];

function subtrai(M1, M2) {
  return [
    [M1[0][0]-M2[0][0], M1[0][1]-M2[0][1]],
    [M1[1][0]-M2[1][0], M1[1][1]-M2[1][1]]
  ];
}

const PQ = multiplica(P, Q);
const QP = multiplica(Q, P);
const comutador = subtrai(PQ, QP);

console.log("\nPQ =", PQ);
console.log("QP =", QP);
console.log("[P,Q] =", comutador);
console.log("PQ == QP?", saoIguais(PQ, QP));

const PI = multiplica(P, I);
const IP = multiplica(I, P);

console.log("PI == P?", saoIguais(PI, P));
console.log("IP == P?", saoIguais(IP, P));


// T4 - Propriedades da Transposta

function transposta(M) {
  const T = [];
  for (let i = 0; i < M[0].length; i++) {
    T[i] = [];
    for (let j = 0; j < M.length; j++) {
      T[i][j] = M[j][i];
    }
  }
  return T;
}

function aproxIguais(M1, M2) {
  for (let i = 0; i < M1.length; i++)
    for (let j = 0; j < M1[0].length; j++)
      if (Math.abs(M1[i][j] - M2[i][j]) > 1e-10) return false;
  return true;
}

const At  = transposta(A);
const Att = transposta(At);
console.log("\n(a) (A^T)^T == A?", aproxIguais(Att, A));

const Bt       = transposta(B);
const AsomaBt  = transposta(AsomaB);
const AtMaisBt = [
  [At[0][0]+Bt[0][0], At[0][1]+Bt[0][1]],
  [At[1][0]+Bt[1][0], At[1][1]+Bt[1][1]],
  [At[2][0]+Bt[2][0], At[2][1]+Bt[2][1]]
];
console.log("(b) (A+B)^T == A^T + B^T?", aproxIguais(AsomaBt, AtMaisBt));

const ACt  = transposta(AC);
const CtAt = multiplica(transposta(C), At);
console.log("(c) (AC)^T == C^T * A^T?", aproxIguais(ACt, CtAt));


// T5 - Matriz Simétrica e Combinação Linear

const M = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9]
];

const Mt = transposta(M);

const S = [
  [M[0][0]+Mt[0][0], M[0][1]+Mt[0][1], M[0][2]+Mt[0][2]],
  [M[1][0]+Mt[1][0], M[1][1]+Mt[1][1], M[1][2]+Mt[1][2]],
  [M[2][0]+Mt[2][0], M[2][1]+Mt[2][1], M[2][2]+Mt[2][2]]
];

const St = transposta(S);
console.log("\nS é simétrica (S == S^T)?", aproxIguais(S, St));

const Asys = [
  [2, 1, 0],
  [1, 3, 1],
  [0, 1, 4]
];

const x = [1, 2, 3];

const Ax = [
  Asys[0][0]*x[0] + Asys[0][1]*x[1] + Asys[0][2]*x[2],
  Asys[1][0]*x[0] + Asys[1][1]*x[1] + Asys[1][2]*x[2],
  Asys[2][0]*x[0] + Asys[2][1]*x[1] + Asys[2][2]*x[2]
];

const col1 = [Asys[0][0], Asys[1][0], Asys[2][0]];
const col2 = [Asys[0][1], Asys[1][1], Asys[2][1]];
const col3 = [Asys[0][2], Asys[1][2], Asys[2][2]];

const combLinear = [
  x[0]*col1[0] + x[1]*col2[0] + x[2]*col3[0],
  x[0]*col1[1] + x[1]*col2[1] + x[2]*col3[1],
  x[0]*col1[2] + x[1]*col2[2] + x[2]*col3[2]
];

console.log("Ax =", Ax);
console.log("Combinação linear =", combLinear);
console.log("Ax == combinação linear?", Ax[0]===combLinear[0] && Ax[1]===combLinear[1] && Ax[2]===combLinear[2]);