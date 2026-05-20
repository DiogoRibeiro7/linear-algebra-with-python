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
console.log("A*C e C*A são diferentes pelo A ter dimenções 2x3 e C ter dimenções 3x2,\nmultiplicando e ficando 2x2 para AC e 3x3 para CA");

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
console.log("PQ ",math.multiply(P, Q).valueOf(),"!= QP",math.multiply(Q, P).valueOf());

const I = math.identity(2,2)
const PI = math.multiply(P,I)
const IP = math.multiply(I,P)
console.log('PI',PI.valueOf(),'= IP',IP.valueOf(),' = P',P.valueOf());

let A_transporta = math.transpose(math.transpose(A))
console.log('(At)t',A_transporta.valueOf(),'= A',A.valueOf());

let ABt = (math.transpose(math.add(A, B)))
let AtBt = (math.add(math.transpose(A),math.transpose(B)))
console.log('(A+B)t',ABt.valueOf(),'= At+Bt',AtBt.valueOf(),math.deepEqual(ABt,AtBt));

let ACt = (math.transpose(math.multiply(A, C)))
let AtCt = (math.multiply(math.transpose(A),math.transpose(C)))
console.log('(AC)t',ACt.valueOf(),'!= At*Ct',AtCt.valueOf(),math.deepEqual(ACt,AtCt));

const M = math.matrix([
  [Math.floor(Math.random() * (10)),Math.floor(Math.random() * (10)),Math.floor(Math.random() * (10))],
  [Math.floor(Math.random() * (10)),Math.floor(Math.random() * (10)),Math.floor(Math.random() * (10))],
  [Math.floor(Math.random() * (10)),Math.floor(Math.random() * (10)),Math.floor(Math.random() * (10))]
])
const msimetrico = math.add(M, math.transpose(M))
 const S = msimetrico.get([1,2])
console.log("3x3 simetrico",S,msimetrico.valueOf());


const x = math.matrix([2, 1, -1]);
console.log("Vector x:", x.valueOf());

const Ax = math.multiply(A, x);
console.log("Ax =", Ax.valueOf());

const a1 = math.column(A, 0);
const a2 = math.column(A, 1);
const a3 = math.column(A, 2);

const linearCombination =math.add(math.add(math.multiply(x.get([0]),a1),math.multiply(x.get([1]),a2)),math.multiply(x.get([2]),a3))
console.log("x1*a1 + x2*a2 + x3*a3 =", math.transpose(linearCombination).valueOf());
