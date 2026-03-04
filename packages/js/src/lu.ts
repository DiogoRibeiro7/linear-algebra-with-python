import {
  Matrix,
  Vector,
  asMatrix,
  asVector,
  luDecomposition,
  forwardSubstitution,
  solveUpperTriangular,
  permuteVector
} from "./utils";

function asSquare(A: Matrix): Matrix {
  const arr = asMatrix(A);
  if (arr.length !== arr[0].length) {
    throw new Error("Matrix must be square.");
  }
  return arr;
}

export function decomposicao_lu(A: Matrix): [Matrix, Matrix, Matrix] {
  const arr = asSquare(A);
  const { P, L, U } = luDecomposition(arr);
  return [P, L, U];
}

export function resolver_lu(A: Matrix, b: Vector): Vector {
  const arr = asSquare(A);
  const bArr = asVector(b);
  if (bArr.length !== arr.length) {
    throw new Error("Incompatible dimensions between A and b.");
  }
  const { P, L, U } = luDecomposition(arr);
  const pb = permuteVector(P, bArr);
  const y = forwardSubstitution(L, pb);
  return solveUpperTriangular(U, y);
}

export function resolver_lu_multiplos_rhs(A: Matrix, B: Matrix): Matrix {
  const arr = asSquare(A);
  const Barr = asMatrix(B);
  if (Barr.length !== arr.length) {
    throw new Error("Incompatible dimensions between A and B.");
  }
  const { P, L, U } = luDecomposition(arr);
  const out: Matrix = [];
  for (let col = 0; col < Barr[0].length; col += 1) {
    const rhs = Barr.map((row) => row[col]);
    const pb = permuteVector(P, rhs);
    const y = forwardSubstitution(L, pb);
    const x = solveUpperTriangular(U, y);
    out.push(x);
  }
  const result: Matrix = Array.from({ length: arr.length }, () => new Array(Barr[0].length).fill(0));
  for (let i = 0; i < arr.length; i += 1) {
    for (let j = 0; j < Barr[0].length; j += 1) {
      result[i][j] = out[j][i];
    }
  }
  return result;
}

export function det_via_lu(A: Matrix): number {
  const arr = asSquare(A);
  const { U, detSign } = luDecomposition(arr);
  let detU = 1;
  for (let i = 0; i < U.length; i += 1) {
    detU *= U[i][i];
  }
  return detSign * detU;
}

export type { Matrix, Vector };
