import * as math from "mathjs";

function cramer2x2(A, b) {
  const detA = math.det(A);
  if (Math.abs(detA) < 1e-12) return null;
  const A1 = [[b[0], A[0][1]], [b[1], A[1][1]]];
  const A2 = [[A[0][0], b[0]], [A[1][0], b[1]]];
  return [math.det(A1) / detA, math.det(A2) / detA];
}

const A = [[2, 1], [1, 3]];
const b = [1, 2];
console.log("Cramer", cramer2x2(A, b));
console.log("LU solve", math.lusolve(A, b).valueOf());
