const math = require('mathjs');

// ─── T1: Adição, subtração e multiplicação por escalar ────────────────────────

const A = math.matrix([[1, 2, 3], [4, 5, 6]]);
const B = math.matrix([[7, 8, 9], [1, 2, 3]]);

console.log('A + B:');
console.table(math.add(A, B).toArray());

console.log('A - B:');
console.table(math.subtract(A, B).toArray());

console.log('3 * A:');
console.table(math.multiply(3, A).toArray());

// verificar que dimensões se mantêm
const soma = math.add(A, B);
const dimA = A.size();
const dimSoma = soma.size();
console.assert(dimA[0] === dimSoma[0] && dimA[1] === dimSoma[1], 'Dimensões diferentes depois da soma!');
console.log('Dimensões preservadas na soma: ok');

// ─── T2: Produto AC e CA ──────────────────────────────────────────────────────

const C = math.matrix([[1, 2], [3, 4], [5, 6]]);  // 3x2

const AC = math.multiply(A, C);  // 2x3 * 3x2 = 2x2
const CA = math.multiply(C, A);  // 3x2 * 2x3 = 3x3

console.log('\nAC (2x3 * 3x2 = 2x2):');
console.table(AC.toArray());

console.log('CA (3x2 * 2x3 = 3x3):');
console.table(CA.toArray());

console.log('AC tem dimensão:', AC.size(), '/ CA tem dimensão:', CA.size());
console.log('São iguais?', math.deepEqual(AC, CA)); // false, dimensões diferentes

// ─── T3: Comutador [P, Q] = PQ - QP ──────────────────────────────────────────

const P = math.matrix([[1, 2], [3, 4]]);
const Q = math.matrix([[5, 6], [7, 8]]);
const I2 = math.identity(2);

const PQ = math.multiply(P, Q);
const QP = math.multiply(Q, P);
const comutador = math.subtract(PQ, QP);

console.log('\nPQ:'); console.table(PQ.toArray());
console.log('QP:'); console.table(QP.toArray());
console.log('[P,Q] = PQ - QP:'); console.table(comutador.toArray());
console.log('PQ == QP?', math.deepEqual(math.round(PQ, 10), math.round(QP, 10)));

const PI = math.multiply(P, I2);
const IP = math.multiply(I2, P);
console.log('PI == P?', math.deepEqual(math.round(PI, 10), math.round(P, 10)));
console.log('IP == P?', math.deepEqual(math.round(IP, 10), math.round(P, 10)));

// ─── T4: Propriedades da transposta ───────────────────────────────────────────

const eq = (X, Y) => math.deepEqual(math.round(X, 10), math.round(Y, 10));

// (A^T)^T = A
const prop1 = eq(math.transpose(math.transpose(A)), A);
console.log('\n(A^T)^T == A?', prop1);

// (A + B)^T = A^T + B^T
const prop2 = eq(math.transpose(math.add(A, B)), math.add(math.transpose(A), math.transpose(B)));
console.log('(A+B)^T == A^T + B^T?', prop2);

// (AC)^T = C^T * A^T
const prop3 = eq(math.transpose(AC), math.multiply(math.transpose(C), math.transpose(A)));
console.log('(AC)^T == C^T * A^T?', prop3);

// ─── T5: Matriz simétrica e combinação linear de Ax ──────────────────────────

const Mrand = math.matrix([[2, 1, 0], [3, 5, 2], [1, 0, 4]]);
const S = math.add(Mrand, math.transpose(Mrand));
console.log('\nS = M + M^T (simétrica?):');
console.table(S.toArray());
console.log('S é simétrica?', eq(S, math.transpose(S)));

const Asys = math.matrix([[1, 2, 3], [4, 5, 6], [7, 8, 10]]);
const x = math.matrix([2, -1, 3]);
const Ax = math.multiply(Asys, x);

// combinação linear das colunas
const a1 = math.column(Asys, 0).toArray().flat();
const a2 = math.column(Asys, 1).toArray().flat();
const a3 = math.column(Asys, 2).toArray().flat();
const xVals = x.toArray();

const linComb = math.add(
  math.multiply(xVals[0], a1),
  math.add(math.multiply(xVals[1], a2), math.multiply(xVals[2], a3))
);

console.log('\nAx =', Ax.toArray());
console.log('x1*a1 + x2*a2 + x3*a3 =', linComb);
console.log('São iguais?', eq(Ax.toArray(), linComb));
