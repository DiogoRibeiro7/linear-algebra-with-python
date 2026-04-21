import * as math from "mathjs";

function approxIgual(a, b) {
	return math.deepEqual(math.round(a, 10), math.round(b, 10));
}

function titulo(txt) {
	console.log(`\n===== ${txt} =====`);
}

// definição de matrizes A, B e C
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

// T1
titulo("T1 - 2A - B e 3A");
const doisAmenosB = math.subtract(math.multiply(2, A), B);
console.log("2A-B", doisAmenosB.valueOf());
console.log("3A", math.multiply(3, A).valueOf());
console.assert(
	math.deepEqual(math.size(doisAmenosB).valueOf(), [2, 3]),
	"T1 falhou: dimensão não preservada em 2A-B"
);

// T2
titulo("T2 - AC e CA");
const AC = math.multiply(A, C);
const CA = math.multiply(C, A);
console.log("A*C", AC.valueOf());
console.log("C*A", CA.valueOf());
console.log("AC tem dimensão", math.size(AC).valueOf());
console.log("CA tem dimensão", math.size(CA).valueOf());
console.log("Conclusão: AC e CA têm dimensões diferentes, logo não são iguais.");

// T3
titulo("T3 - Comutador e identidade");
const P = math.matrix([
	[1, 2],
	[3, 4],
]);
const Q = math.matrix([
	[2, 0],
	[1, 2],
]);
const PQ = math.multiply(P, Q);
const QP = math.multiply(Q, P);
const comutador = math.subtract(PQ, QP);
const I = math.identity(2);

console.log("[P,Q]", comutador.valueOf());
console.log("Verificação [P,Q] = PQ-QP", math.deepEqual(comutador, math.subtract(PQ, QP)));
console.log("PI = P", math.deepEqual(math.multiply(P, I), P));
console.log("IP = P", math.deepEqual(math.multiply(I, P), P));

// T4
titulo("T4 - Propriedades da transposta");
const A2 = math.matrix([
	[2, -1],
	[0, 3],
]);
const B2 = math.matrix([
	[1, 4],
	[-2, 5],
]);
const c = 3;

const t1 = approxIgual(
	math.transpose(math.add(A2, B2)),
	math.add(math.transpose(A2), math.transpose(B2))
);
const t2 = approxIgual(math.transpose(math.multiply(c, A2)), math.multiply(c, math.transpose(A2)));
const t3 = approxIgual(
	math.transpose(math.multiply(A2, B2)),
	math.multiply(math.transpose(B2), math.transpose(A2))
);

console.log("(A+B)^T = A^T + B^T", t1);
console.log("(cA)^T = cA^T", t2);
console.log("(AB)^T = B^T A^T", t3);

// T5
titulo("T5 - Matriz simétrica e Ax");
const M = math.matrix([
	[2, -1, 4],
	[0, 3, 5],
	[1, 2, -2],
]);
const S = math.add(M, math.transpose(M));
console.log("S symmetric", approxIgual(S, math.transpose(S)));

const A3 = math.matrix([
	[1, 2, 0],
	[-1, 3, 4],
	[2, 0, 5],
]);
const x = math.matrix([2, -1, 3]);
const Ax = math.multiply(A3, x);

const a1 = math.column(A3, 0);
const a2 = math.column(A3, 1);
const a3 = math.column(A3, 2);
const comb = math.add(math.add(math.multiply(2, a1), math.multiply(-1, a2)), math.multiply(3, a3));

console.log("Ax", Ax.valueOf());
console.log("x1*a1 + x2*a2 + x3*a3", comb.valueOf());
console.log("Ax = combinação linear", approxIgual(Ax, comb));

