export type Vector = number[];
export type Matrix = number[][];

export function asVector(v: Vector): Vector {
  if (!Array.isArray(v) || v.length === 0 || v.some((x) => typeof x !== "number")) {
    throw new Error("Vector must be a non-empty numeric array.");
  }
  return v.slice();
}

export function asMatrix(A: Matrix): Matrix {
  if (!Array.isArray(A) || A.length === 0 || !Array.isArray(A[0])) {
    throw new Error("Input must be a 2D matrix.");
  }
  const cols = A[0].length;
  if (cols === 0) {
    throw new Error("Input must be a 2D matrix.");
  }
  for (const row of A) {
    if (!Array.isArray(row) || row.length !== cols || row.some((x) => typeof x !== "number")) {
      throw new Error("Input must be a 2D matrix.");
    }
  }
  return A.map((row) => row.slice());
}

export function cloneMatrix(A: Matrix): Matrix {
  return A.map((row) => row.slice());
}

export function zeros(m: number, n: number): Matrix {
  if (m <= 0 || n <= 0) {
    throw new Error("Matrix dimensions must be positive integers.");
  }
  return Array.from({ length: m }, () => Array.from({ length: n }, () => 0));
}

export function identity(n: number): Matrix {
  if (n <= 0) {
    throw new Error("Matrix size must be a positive integer.");
  }
  const I = zeros(n, n);
  for (let i = 0; i < n; i += 1) {
    I[i][i] = 1;
  }
  return I;
}

export function diag(values: number[]): Matrix {
  if (!Array.isArray(values) || values.length === 0) {
    throw new Error("Diagonal values list cannot be empty.");
  }
  const n = values.length;
  const D = zeros(n, n);
  for (let i = 0; i < n; i += 1) {
    D[i][i] = values[i];
  }
  return D;
}

export function transpose(A: Matrix): Matrix {
  const arr = asMatrix(A);
  const m = arr.length;
  const n = arr[0].length;
  const T = zeros(n, m);
  for (let i = 0; i < m; i += 1) {
    for (let j = 0; j < n; j += 1) {
      T[j][i] = arr[i][j];
    }
  }
  return T;
}

export function dot(a: Vector, b: Vector): number {
  if (a.length !== b.length) {
    throw new Error("Vectors must have the same length.");
  }
  let sum = 0;
  for (let i = 0; i < a.length; i += 1) {
    sum += a[i] * b[i];
  }
  return sum;
}

export function norm(v: Vector): number {
  return Math.sqrt(dot(v, v));
}

export function cross(a: Vector, b: Vector): Vector {
  if (a.length !== 3 || b.length !== 3) {
    throw new Error("Cross product requires 3D vectors.");
  }
  return [
    a[1] * b[2] - a[2] * b[1],
    a[2] * b[0] - a[0] * b[2],
    a[0] * b[1] - a[1] * b[0]
  ];
}

export function linspace(start: number, end: number, n: number): number[] {
  if (n <= 1) {
    throw new Error("n must be greater than 1.");
  }
  const step = (end - start) / (n - 1);
  const out = new Array(n);
  for (let i = 0; i < n; i += 1) {
    out[i] = start + step * i;
  }
  return out;
}

export function meshgrid(x: number[], y: number[]): [Matrix, Matrix] {
  const X = zeros(y.length, x.length);
  const Y = zeros(y.length, x.length);
  for (let i = 0; i < y.length; i += 1) {
    for (let j = 0; j < x.length; j += 1) {
      X[i][j] = x[j];
      Y[i][j] = y[i];
    }
  }
  return [X, Y];
}

export function matMul(A: Matrix, B: Matrix): Matrix {
  const a = asMatrix(A);
  const b = asMatrix(B);
  const m = a.length;
  const k = a[0].length;
  if (b.length !== k) {
    throw new Error("Incompatible matrix dimensions.");
  }
  const n = b[0].length;
  const out = zeros(m, n);
  for (let i = 0; i < m; i += 1) {
    for (let j = 0; j < n; j += 1) {
      let sum = 0;
      for (let t = 0; t < k; t += 1) {
        sum += a[i][t] * b[t][j];
      }
      out[i][j] = sum;
    }
  }
  return out;
}

export function matVecMul(A: Matrix, v: Vector): Vector {
  const a = asMatrix(A);
  if (a[0].length !== v.length) {
    throw new Error("Incompatible dimensions for matrix-vector product.");
  }
  const out = new Array(a.length).fill(0);
  for (let i = 0; i < a.length; i += 1) {
    let sum = 0;
    for (let j = 0; j < v.length; j += 1) {
      sum += a[i][j] * v[j];
    }
    out[i] = sum;
  }
  return out;
}

export function allClose(A: Matrix, B: Matrix, tol = 1e-9): boolean {
  if (A.length !== B.length || A[0].length !== B[0].length) {
    return false;
  }
  for (let i = 0; i < A.length; i += 1) {
    for (let j = 0; j < A[0].length; j += 1) {
      if (Math.abs(A[i][j] - B[i][j]) > tol) {
        return false;
      }
    }
  }
  return true;
}

export function vectorAllClose(a: Vector, b: Vector, tol = 1e-9): boolean {
  if (a.length !== b.length) {
    return false;
  }
  for (let i = 0; i < a.length; i += 1) {
    if (Math.abs(a[i] - b[i]) > tol) {
      return false;
    }
  }
  return true;
}

export function determinant(A: Matrix, tol = 1e-12): number {
  const arr = asMatrix(A);
  const n = arr.length;
  if (arr[0].length !== n) {
    throw new Error("Matrix must be square.");
  }
  const mat = cloneMatrix(arr);
  let detSign = 1;
  for (let i = 0; i < n; i += 1) {
    let pivotRow = i;
    let max = Math.abs(mat[i][i]);
    for (let r = i + 1; r < n; r += 1) {
      const val = Math.abs(mat[r][i]);
      if (val > max) {
        max = val;
        pivotRow = r;
      }
    }
    if (max <= tol) {
      return 0;
    }
    if (pivotRow !== i) {
      const tmp = mat[i];
      mat[i] = mat[pivotRow];
      mat[pivotRow] = tmp;
      detSign *= -1;
    }
    for (let r = i + 1; r < n; r += 1) {
      const factor = mat[r][i] / mat[i][i];
      for (let c = i; c < n; c += 1) {
        mat[r][c] -= factor * mat[i][c];
      }
    }
  }
  let det = detSign;
  for (let i = 0; i < n; i += 1) {
    det *= mat[i][i];
  }
  return det;
}

export function matrixRank(A: Matrix, tol = 1e-12): number {
  const arr = asMatrix(A);
  const m = arr.length;
  const n = arr[0].length;
  const mat = cloneMatrix(arr);
  let rank = 0;
  let row = 0;
  for (let col = 0; col < n && row < m; col += 1) {
    let pivotRow = row;
    let max = Math.abs(mat[row][col]);
    for (let r = row + 1; r < m; r += 1) {
      const val = Math.abs(mat[r][col]);
      if (val > max) {
        max = val;
        pivotRow = r;
      }
    }
    if (max <= tol) {
      continue;
    }
    if (pivotRow !== row) {
      const tmp = mat[row];
      mat[row] = mat[pivotRow];
      mat[pivotRow] = tmp;
    }
    for (let r = row + 1; r < m; r += 1) {
      const factor = mat[r][col] / mat[row][col];
      for (let c = col; c < n; c += 1) {
        mat[r][c] -= factor * mat[row][c];
      }
    }
    rank += 1;
    row += 1;
  }
  return rank;
}

export function solveUpperTriangular(U: Matrix, b: Vector, tol = 1e-12): Vector {
  const Uarr = asMatrix(U);
  const n = Uarr.length;
  if (Uarr[0].length !== n || b.length !== n) {
    throw new Error("Incompatible dimensions for back substitution.");
  }
  const x = new Array(n).fill(0);
  for (let i = n - 1; i >= 0; i -= 1) {
    const diag = Uarr[i][i];
    if (Math.abs(diag) <= tol) {
      throw new Error("Matrix is singular; back substitution failed.");
    }
    let sum = 0;
    for (let j = i + 1; j < n; j += 1) {
      sum += Uarr[i][j] * x[j];
    }
    x[i] = (b[i] - sum) / diag;
  }
  return x;
}

export function luDecomposition(A: Matrix, tol = 1e-12): { P: Matrix; L: Matrix; U: Matrix; detSign: number } {
  const arr = asMatrix(A);
  const n = arr.length;
  if (arr[0].length !== n) {
    throw new Error("Matrix must be square.");
  }
  const U = cloneMatrix(arr);
  const L = identity(n);
  const P = identity(n);
  let detSign = 1;

  for (let i = 0; i < n; i += 1) {
    let pivotRow = i;
    let max = Math.abs(U[i][i]);
    for (let r = i + 1; r < n; r += 1) {
      const val = Math.abs(U[r][i]);
      if (val > max) {
        max = val;
        pivotRow = r;
      }
    }
    if (max <= tol) {
      throw new Error("Matrix is singular.");
    }
    if (pivotRow !== i) {
      const tmpU = U[i];
      U[i] = U[pivotRow];
      U[pivotRow] = tmpU;

      const tmpP = P[i];
      P[i] = P[pivotRow];
      P[pivotRow] = tmpP;

      if (i > 0) {
        for (let k = 0; k < i; k += 1) {
          const tmpL = L[i][k];
          L[i][k] = L[pivotRow][k];
          L[pivotRow][k] = tmpL;
        }
      }
      detSign *= -1;
    }

    for (let r = i + 1; r < n; r += 1) {
      const factor = U[r][i] / U[i][i];
      L[r][i] = factor;
      for (let c = i; c < n; c += 1) {
        U[r][c] -= factor * U[i][c];
      }
    }
  }

  return { P, L, U, detSign };
}

export function forwardSubstitution(L: Matrix, b: Vector): Vector {
  const Larr = asMatrix(L);
  const n = Larr.length;
  if (Larr[0].length !== n || b.length !== n) {
    throw new Error("Incompatible dimensions for forward substitution.");
  }
  const y = new Array(n).fill(0);
  for (let i = 0; i < n; i += 1) {
    let sum = 0;
    for (let j = 0; j < i; j += 1) {
      sum += Larr[i][j] * y[j];
    }
    y[i] = b[i] - sum;
  }
  return y;
}

export function permuteVector(P: Matrix, b: Vector): Vector {
  const Parr = asMatrix(P);
  if (Parr.length !== b.length) {
    throw new Error("Incompatible dimensions for permutation.");
  }
  const out = new Array(b.length).fill(0);
  for (let i = 0; i < Parr.length; i += 1) {
    const row = Parr[i];
    const idx = row.findIndex((v) => Math.abs(v - 1) < 1e-12);
    out[i] = b[idx];
  }
  return out;
}
