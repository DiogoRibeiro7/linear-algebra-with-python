import * as math from "mathjs";

const A = math.matrix([
  [1, 2, 3],
  [4, 5, 6],
]);
const B = math.matrix([
  [6, 5, 4],
  [3, 2, 1],
]);
const C = math.matrix([
  [1, 0],
  [0, 1],
  [1, 1],
]);

console.log("A+B", math.add(A, B).valueOf());
console.log("A-B", math.subtract(A, B).valueOf());
console.log("3A", math.multiply(3, A).valueOf());

console.log("A*C", math.multiply(A, C).valueOf());
console.log("C*A", math.multiply(C, A).valueOf());

const P = math.matrix([
  [1, 2],
  [3, 4],
]);
const Q = math.matrix([
  [2, 0],
  [1, 2],
]);
const comm = math.subtract(math.multiply(P, Q), math.multiply(Q, P));
console.log("[P,Q]", comm.valueOf());

const S = math.add(A, math.transpose(A));
console.log("S symmetric", math.deepEqual(math.round(S, 10), math.round(math.transpose(S), 10)));
//========================================
// ASSIGNMENT 02
//========================================

//-----------------------------
// T1
//-----------------------------

const A = [

  [1, 2, 3],

  [4, 5, 6]

];

const B = [

  [6, 5, 4],

  [3, 2, 1]

];

const soma = math.add(A, B);

const subtracao = math.subtract(A, B);

const tresA = math.multiply(3, A);

console.log("A");

console.table(A);

console.log("B");

console.table(B);

console.log("A+B");

console.table(soma);

console.log("A-B");

console.table(subtracao);

console.log("3A");

console.table(tresA);

console.assert(

  A.length === soma.length &&

  A[0].length === soma[0].length,

  "As dimensões não coincidem"

);

//-----------------------------
// T2
//-----------------------------

const C = [

  [1, 2],

  [3, 4],

  [5, 6]

];

const AC = math.multiply(A, C);

const CA = math.multiply(C, A);

console.log("AC");

console.table(AC);

console.log("CA");

console.table(CA);

console.log("AC tem dimensão 2x2");

console.log("CA tem dimensão 3x3");

console.log("Logo não são iguais.");

//-----------------------------
// T3
//-----------------------------

const P = [

  [1, 2],

  [3, 4]

];

const Q = [

  [2, 0],

  [1, 2]

];

const PQ = math.multiply(P, Q);

const QP = math.multiply(Q, P);

const comutador = math.subtract(PQ, QP);

console.log("PQ");

console.table(PQ);

console.log("QP");

console.table(QP);

console.log("Comutador");

console.table(comutador);

const I = math.identity(2)._data;

console.log("PI");

console.table(math.multiply(P, I));

console.log("IP");

console.table(math.multiply(I, P));

//-----------------------------
// T4
//-----------------------------

const prop1 = math.deepEqual(

  math.round(math.transpose(math.transpose(A)), 10),

  math.round(A, 10)

);

const prop2 = math.deepEqual(

  math.round(math.transpose(math.add(A, B)), 10),

  math.round(

    math.add(

      math.transpose(A),

      math.transpose(B)

    ),

    10

  )

);

const prop3 = math.deepEqual(

  math.round(

    math.transpose(

      math.multiply(A, C)

    ),

    10

  ),

  math.round(

    math.multiply(

      math.transpose(C),

      math.transpose(A)

    ),

    10

  )

);

console.log("(Aᵀ)ᵀ=A ?", prop1);

console.log("(A+B)ᵀ=Aᵀ+Bᵀ ?", prop2);

console.log("(AC)ᵀ=CᵀAᵀ ?", prop3);

//-----------------------------
// T5
//-----------------------------

const M = math.random([3, 3]);

const S = math.add(M, math.transpose(M));

const simetrica = math.deepEqual(

  math.round(S, 10),

  math.round(math.transpose(S), 10)

);

console.log("S é simétrica?", simetrica);

const matrizSistema = [

  [2, 1, 3],

  [1, 0, 1],

  [4, 2, 2]

];

const x = [

  2,

  1,

  3

];

const Ax = math.multiply(matrizSistema, x);

console.log("Ax");

console.table(Ax);

const coluna1 = math.column(matrizSistema, 0);

const coluna2 = math.column(matrizSistema, 1);

const coluna3 = math.column(matrizSistema, 2);

const combinacao = math.add(

  math.multiply(x[0], coluna1),

  math.add(

    math.multiply(x[1], coluna2),

    math.multiply(x[2], coluna3)

  )

);

console.log("Combinação Linear");

console.table(combinacao);

const iguais = math.deepEqual(

  math.round(Ax, 10),

  math.round(combinacao, 10)

);

console.log("Ax é igual à combinação linear?", iguais);

console.log("--------------------------------");

console.log("Assignment 02 concluído.");

console.log("--------------------------------");