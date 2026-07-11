import { Matrix, asMatrix, cloneMatrix, determinant, matMul, identity, allClose } from "./utils";

function asSquare(A: Matrix): Matrix {
  const arr = asMatrix(A);
  if (arr.length !== arr[0].length) {
    throw new Error("Matrix must be square.");
  }
  return arr;
}

export function det_2x2(A: Matrix): number {
  const arr = asSquare(A);
  if (arr.length !== 2) {
    throw new Error("Matrix must be 2x2.");
  }
  return arr[0][0] * arr[1][1] - arr[0][1] * arr[1][0];
}

export function det_3x3_sarrus(A: Matrix): number {
  const arr = asSquare(A);
  if (arr.length !== 3) {
    throw new Error("Matrix must be 3x3.");
  }
  const a = arr;
  const pos =
    a[0][0] * a[1][1] * a[2][2] +
    a[0][1] * a[1][2] * a[2][0] +
    a[0][2] * a[1][0] * a[2][1];
  const neg =
    a[0][2] * a[1][1] * a[2][0] +
    a[0][1] * a[1][0] * a[2][2] +
    a[0][0] * a[1][2] * a[2][1];
  return pos - neg;
}

export function det_cofactor(A: Matrix): number {
  const arr = asSquare(A);
  const n = arr.length;
  if (n === 1) {
    return arr[0][0];
  }
  if (n === 2) {
    return det_2x2(arr);
  }
  let detVal = 0;
  for (let j = 0; j < n; j += 1) {
    const minor: Matrix = [];
    for (let r = 1; r < n; r += 1) {
      const row: number[] = [];
      for (let c = 0; c < n; c += 1) {
        if (c !== j) {
          row.push(arr[r][c]);
        }
      }
      minor.push(row);
    }
    const cofactor = ((j % 2 === 0) ? 1 : -1) * arr[0][j] * det_cofactor(minor);
    detVal += cofactor;
  }
  return detVal;
}

export function det_gauss(A: Matrix, tol = 1e-12): [number, Matrix[]] {
  const arr = asSquare(A);
  const n = arr.length;
  const mat = cloneMatrix(arr);
  let detSign = 1;
  const steps: Matrix[] = [];

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
      steps.push(cloneMatrix(mat));
      return [0, steps];
    }
    if (pivotRow !== i) {
      const tmp = mat[i];
      mat[i] = mat[pivotRow];
      mat[pivotRow] = tmp;
      detSign *= -1;
      steps.push(cloneMatrix(mat));
    }
    for (let r = i + 1; r < n; r += 1) {
      const factor = mat[r][i] / mat[i][i];
      for (let c = i; c < n; c += 1) {
        mat[r][c] -= factor * mat[i][c];
      }
      steps.push(cloneMatrix(mat));
    }
  }

  let detVal = detSign;
  for (let i = 0; i < n; i += 1) {
    detVal *= mat[i][i];
  }
  return [detVal, steps];
}

export function eh_invertivel(A: Matrix, tol = 1e-12): boolean {
  const arr = asSquare(A);
  const detVal = determinant(arr);
  return Math.abs(detVal) > tol;
}

export function inversa_2x2(A: Matrix): Matrix {
  const arr = asSquare(A);
  if (arr.length !== 2) {
    throw new Error("Matrix must be 2x2.");
  }
  const detVal = det_2x2(arr);
  if (Math.abs(detVal) <= 1e-12) {
    throw new Error("Matrix is singular; inverse does not exist.");
  }
  const a = arr[0][0];
  const b = arr[0][1];
  const c = arr[1][0];
  const d = arr[1][1];
  return [
    [d / detVal, -b / detVal],
    [-c / detVal, a / detVal]
  ];
}

export function inversa_gauss_jordan(A: Matrix, tol = 1e-12): [Matrix, Matrix[]] {
  const arr = asSquare(A);
  const n = arr.length;
  const aug: Matrix = arr.map((row, i) => row.concat(identity(n)[i]));
  const steps: Matrix[] = [cloneMatrix(aug)];

  for (let i = 0; i < n; i += 1) {
    let pivotRow = i;
    let max = Math.abs(aug[i][i]);
    for (let r = i + 1; r < n; r += 1) {
      const val = Math.abs(aug[r][i]);
      if (val > max) {
        max = val;
        pivotRow = r;
      }
    }
    if (max <= tol) {
      throw new Error("Matrix is singular; inverse does not exist.");
    }
    if (pivotRow !== i) {
      const tmp = aug[i];
      aug[i] = aug[pivotRow];
      aug[pivotRow] = tmp;
      steps.push(cloneMatrix(aug));
    }

    const pivot = aug[i][i];
    for (let c = 0; c < 2 * n; c += 1) {
      aug[i][c] /= pivot;
    }
    steps.push(cloneMatrix(aug));

    for (let r = 0; r < n; r += 1) {
      if (r === i) {
        continue;
      }
      const factor = aug[r][i];
      if (Math.abs(factor) <= tol) {
        continue;
      }
      for (let c = 0; c < 2 * n; c += 1) {
        aug[r][c] -= factor * aug[i][c];
      }
      steps.push(cloneMatrix(aug));
    }
  }

  const inv: Matrix = [];
  for (let i = 0; i < n; i += 1) {
    inv.push(aug[i].slice(n));
  }

  const identityCheck = matMul(arr, inv);
  if (!allClose(identityCheck, identity(n), 1e-6)) {
    throw new Error("Inverse check failed.");
  }
  return [inv, steps];
}
