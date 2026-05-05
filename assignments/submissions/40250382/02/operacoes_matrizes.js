/**
 * Assignment 02: Matrix Operations and Property Verification
 * Tarefas T1 a T5
 */

// Se estiveres a usar Node.js, descomenta a linha abaixo:
// const math = require('mathjs');

console.log("%c--- Task 1: Operações Básicas (A+B, A-B, 3A) ---", "color: blue; font-weight: bold");
const A = math.matrix([[1, 2, 3], [4, 5, 6]]);
const B = math.matrix([[7, 8, 9], [10, 11, 12]]);

const sum = math.add(A, B);
const diff = math.subtract(A, B);
const scalar = math.multiply(3, A);

console.log("A + B:", sum.toArray());
console.log("A - B:", diff.toArray());
console.log("3A:", scalar.toArray());

// Verificação de dimensões usando math.size e assertion
const sizeA = math.size(A).toArray();
const sizeSum = math.size(sum).toArray();
console.assert(JSON.stringify(sizeA) === JSON.stringify(sizeSum), "Erro: Dimensões não coincidem!");
console.log("Verificação: Dimensões preservadas na soma.");

console.log("\n%c--- Task 2: Multiplicação AC vs CA (Análise Dimensional) ---", "color: blue; font-weight: bold");
const C = math.matrix([[1, 2], [3, 4], [5, 6]]); // 3x2

const AC = math.multiply(A, C); // (2x3) * (3x2) = 2x2
const CA = math.multiply(C, A); // (3x2) * (2x3) = 3x3

console.log("AC (2x2):", AC.toArray());
console.log("CA (3x3):", CA.toArray());
console.log("Explicação: AC é 2x2 e CA é 3x3. A multiplicação de matrizes não é comutativa e o tamanho do resultado depende da ordem (linhas de uma vs colunas de outra).");

console.log("\n%c--- Task 3: Comutador e Identidade ---", "color: blue; font-weight: bold");
const P = math.matrix([[1, 2], [3, 4]]);
const Q = math.matrix([[5, 6], [7, 8]]);
const I = math.identity(2);

const PQ = math.multiply(P, Q);
const QP = math.multiply(Q, P);
const commutator = math.subtract(PQ, QP);

console.log("PQ:", PQ.toArray());
console.log("QP:", QP.toArray());
console.log("Comutador [P, Q] = PQ - QP:", commutator.toArray());
console.log("P * I = P:", math.deepEqual(math.multiply(P, I), P));

console.log("\n%c--- Task 4: Propriedades da Transposta ---", "color: blue; font-weight: bold");
// Verificações com arredondamento para evitar erros de precisão float
const round = (m) => math.round(m, 10);

// (a) (A^T)^T = A
const propA = math.deepEqual(round(math.transpose(math.transpose(A))), round(A));
// (b) (A+B)^T = A^T + B^T
const propB = math.deepEqual(round(math.transpose(math.add(A, B))), round(math.add(math.transpose(A), math.transpose(B))));
// (c) (AC)^T = C^T * A^T
const propC = math.deepEqual(round(math.transpose(AC)), round(math.multiply(math.transpose(C), math.transpose(A))));

console.log("(A^T)^T = A:", propA);
console.log("(A+B)^T = A^T + B^T:", propB);
console.log("(AC)^T = C^T * A^T:", propC);

console.log("\n%c--- Task 5: Simetria e Combinação Linear ---", "color: blue; font-weight: bold");
// Matriz Simétrica
const M = math.random([3, 3]);
const S = math.add(M, math.transpose(M));
console.log("S = M + M^T é simétrica:", math.deepEqual(round(S), round(math.transpose(S))));

// Ax como Combinação Linear das Colunas
const SysA = math.matrix([[1, 2, 3], [0, 1, 4], [5, 6, 0]]);
const xVec = [2, -1, 3];
const Ax = math.multiply(SysA, xVec);

const a1 = math.flatten(math.column(SysA, 0));
const a2 = math.flatten(math.column(SysA, 1));
const a3 = math.flatten(math.column(SysA, 2));

const linearCombination = math.add(
    math.multiply(xVec[0], a1),
    math.add(math.multiply(xVec[1], a2), math.multiply(xVec[2], a3))
);

console.log("Resultado Ax:", Ax.toArray());
console.log("Resultado via Combinação Linear:", linearCombination.toArray());
console.log("Os resultados são iguais:", math.deepEqual(round(Ax), round(linearCombination)));