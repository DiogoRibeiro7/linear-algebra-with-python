//ex 1
/*Define two 2×3 matrices A and B. Compute
and print A +B, A −B, and 3A. Verify that the sum preserves
dimensions using an assertion.*/
//matrix creation
let A = math.matrix([
  [1, 2, 3],
  [4, 5, 6],
]);
const B = math.matrix([
  [6, 5, 4],
  [3, 2, 1],
]);

//operations
const AsumB = math.add(A,B)
const AsubtractB = math.subtract(A,B)
const threeA = math.multiply(3, A)

//logs for operation results
console.log("A + B:\n", AsumB);
console.log("A - B:\n", AsubtractB);
console.log("3A:\n", threeA);

//dimension assertion, checking if the operations preserve dimensions using A as reference.
console.assert(AsumB.size()[0] === A.size()[0] && AsumB.size()[1] === A.size()[1], "A + B does not preserve dimensions");
console.assert(AsubtractB.size()[0] === A.size()[0] && AsubtractB.size()[1] === A.size()[1], "A - B does not preserve dimensions");
console.assert(threeA.size()[0] === A.size()[0] && threeA.size()[1] === A.size()[1], "3A does not preserve dimensions");

//ex2
/*Define a 3 ×2 matrix C. Compute AC (2 ×3
times 3×2) and CA (3×2 times 2×3). Print b oth results and
explain why they have different dimensions and are not equal*/

//creation of matrix C
const C = math.matrix([
  [1, 2],
  [3, 4],
  [5, 6],
]);

//matrix multiplication
const AC = math.multiply(A, C);
const CA = math.multiply(C, A);

//logs for results
console.log("AC:\n", AC);
console.log("CA:\n", CA);

//explanation of different dimensions
console.log("AC has 2x2 dimensions because with matrix multiplication, the product result deimensions are determined by the rows of the first matrix and the columns of the second. A has 2 rows and C has 2 columns, resulting in a 2x2 matrix. CA has 3x3 dimensions because C has 3 rows and A has 3 columns, resulting in a 3x3 matrix.");

//ex3
/*For two 2 ×2 matrices P and Q, compute
P Q, QP , and the commutator [P, Q] = P Q −QP . Show that
P Q ̸= QP in general, but that P I = IP = P for the identity
matrix.*/ 

//creation of matrices P and Q

const P = math.matrix([
    [1, 2],
    [3, 4],
]);
const Q = math.matrix([
    [4, 3],
    [2, 1],
]);

//matrix multiplication
const PQ = math.multiply(P, Q);
const QP = math.multiply(Q, P);
const commutator = math.subtract(PQ, QP);

//logs for results 
console.log("P Q:\n", PQ);
console.log("Q P:\n", QP);
console.log("[P, Q] = P Q - Q P:\n", commutator);
console.log("P I\n", math.multiply(P, math.identity(2)));
console.log("I P\n", math.multiply(math.identity(2), P));

//comparisons
console.log("P Q == Q P:", math.deepEqual(PQ, QP));
console.log("P I == I P == P:", math.deepEqual(math.multiply(P, math.identity(2)), math.multiply(math.identity(2), P)) && math.deepEqual(math.multiply(P, math.identity(2)), P));


//ex4
/*Verify the three transpose properties com-
putationally: (a) (A⊤)⊤ = A; (b) (A + B)⊤ = A⊤ + B⊤;
(c) (AC)⊤ = C⊤A⊤. Use approximate comparison for each.*/ 

//comparisons with approximate equality
console.log("(A^T)^T == A:", math.deepEqual(math.round(math.transpose(math.transpose(A)), 10), math.round(A, 10)));
console.log("(A + B)^T == A^T + B^T:", math.deepEqual(math.round(math.transpose(math.add(A, B)), 10), math.round(math.add(math.transpose(A), math.transpose(B)), 10)));
console.log("(AC)^T == C^T A^T:", math.deepEqual(math.round(math.transpose(math.multiply(A, C)), 10), math.round(math.multiply(math.transpose(C), math.transpose(A)), 10)));

//ex5
/*Generate a random 3 ×3 matrix M and con-
struct S = M + M ⊤. Verify that S is symmetric. Then define
a 3 ×3 system matrix and a vector x, compute Ax, and show
that Ax equals the linear combination x1a1+x2a2+x3a3 where
ai are the columns of A.*/

//matrix M generation and construction of S
const M = math.random([3, 3]);
const S = math.add(M, math.transpose(M));

//verification of S symmetry
console.log("S is symmetric:", math.deepEqual(math.round(S, 10), math.round(math.transpose(S), 10)));

//definition of vector x and system matrix
A = math.matrix([
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
]);
const x = math.matrix([1, 2, 3]);

console.log("\nMatrix A:", A);
console.log("\nVector x:", x);

const Ax = math.multiply(A, x);

// Convert x to array to avoid issues with different structures in equality with linear combination check
const xArray = x.toArray();

// Extract columns and convert to arrays
const a1 = math.column(A, 0).toArray().map(v => v[0]);
const a2 = math.column(A, 1).toArray().map(v => v[0]);
const a3 = math.column(A, 2).toArray().map(v => v[0]);

// Compute linear combination manually
const linearCombination = math.add(
  math.multiply(xArray[0], a1), // x1*a1
  math.add(
    math.multiply(xArray[1], a2), // x2*a2
    math.multiply(xArray[2], a3) // x3*a3
  )
);

console.log("Ax:", Ax.toArray());
console.log("Linear combination:", linearCombination);

console.log("\nLinear combination x1*a1 + x2*a2 + x3*a3:", linearCombination);

//checking equality
console.log("\Ax equal the linear combination check:", math.deepEqual(math.round(Ax.toArray(), 10),math.round(linearCombination, 10)));