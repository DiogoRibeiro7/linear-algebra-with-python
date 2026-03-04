import {
  Matrix,
  Vector,
  asMatrix,
  asVector,
  cloneMatrix,
  determinant,
  matrixRank,
  solveUpperTriangular
} from "./utils";

function as2d(A: Matrix): Matrix {
  return asMatrix(A);
}

export function escalonar(A_aumentada: Matrix, tol = 1e-12): [Matrix, string[]] {
  const aug = as2d(A_aumentada);
  const m = aug.length;
  const n = aug[0].length;
  const steps: string[] = [];
  let row = 0;

  for (let col = 0; col < n - 1; col += 1) {
    if (row >= m) {
      break;
    }
    let pivotRow = row;
    let max = Math.abs(aug[row][col]);
    for (let r = row + 1; r < m; r += 1) {
      const val = Math.abs(aug[r][col]);
      if (val > max) {
        max = val;
        pivotRow = r;
      }
    }
    if (max <= tol) {
      continue;
    }
    if (pivotRow !== row) {
      const tmp = aug[row];
      aug[row] = aug[pivotRow];
      aug[pivotRow] = tmp;
      steps.push(`R${row + 1} <-> R${pivotRow + 1}`);
    }
    const pivot = aug[row][col];
    for (let r = row + 1; r < m; r += 1) {
      const factor = aug[r][col] / pivot;
      if (Math.abs(factor) <= tol) {
        continue;
      }
      for (let c = col; c < n; c += 1) {
        aug[r][c] -= factor * aug[row][c];
      }
      steps.push(`R${r + 1} <- R${r + 1} - (${factor.toPrecision(6)})*R${row + 1}`);
    }
    row += 1;
  }
  return [aug, steps];
}

export function substituicao_retroativa(U: Matrix, b: Vector, tol = 1e-12): Vector {
  const Uarr = as2d(U);
  const bArr = asVector(b);
  return solveUpperTriangular(Uarr, bArr, tol);
}

export function classificar_sistema(A: Matrix, b: Vector, tol = 1e-12): string {
  const Aarr = as2d(A);
  const bArr = asVector(b);
  if (Aarr.length !== bArr.length) {
    throw new Error("Incompatible dimensions between A and b.");
  }
  const rankA = matrixRank(Aarr, tol);
  const aug = Aarr.map((row, i) => row.concat([bArr[i]]));
  const rankAug = matrixRank(aug, tol);
  const nVars = Aarr[0].length;

  if (rankA < rankAug) {
    return "SI";
  }
  if (rankA === nVars) {
    return "SPD";
  }
  return "SPI";
}

export function resolver_gauss(A: Matrix, b: Vector, tol = 1e-12): [Vector | null, string, string[]] {
  const Aarr = as2d(A);
  const bArr = asVector(b);
  if (Aarr.length !== bArr.length) {
    throw new Error("Incompatible dimensions between A and b.");
  }
  const aug = Aarr.map((row, i) => row.concat([bArr[i]]));
  const [echelon, steps] = escalonar(aug, tol);
  const classification = classificar_sistema(Aarr, bArr, tol);
  if (classification !== "SPD") {
    return [null, classification, steps];
  }
  const U = echelon.map((row) => row.slice(0, -1));
  const rhs = echelon.map((row) => row[row.length - 1]);
  const x = substituicao_retroativa(U, rhs, tol);
  return [x, classification, steps];
}

export function cramer_2x2(A: Matrix, b: Vector, tol = 1e-12): Vector {
  const Aarr = as2d(A);
  const bArr = asVector(b);
  if (Aarr.length !== 2 || Aarr[0].length !== 2 || bArr.length !== 2) {
    throw new Error("Cramer's rule (2x2) requires a 2x2 matrix and length-2 vector.");
  }
  const detA = determinant(Aarr, tol);
  if (Math.abs(detA) <= tol) {
    throw new Error("Matrix is singular; Cramer's rule cannot be applied.");
  }
  const A1 = cloneMatrix(Aarr);
  const A2 = cloneMatrix(Aarr);
  A1[0][0] = bArr[0];
  A1[1][0] = bArr[1];
  A2[0][1] = bArr[0];
  A2[1][1] = bArr[1];
  const x1 = determinant(A1, tol) / detA;
  const x2 = determinant(A2, tol) / detA;
  return [x1, x2];
}

export function cramer_3x3(A: Matrix, b: Vector, tol = 1e-12): Vector {
  const Aarr = as2d(A);
  const bArr = asVector(b);
  if (Aarr.length !== 3 || Aarr[0].length !== 3 || bArr.length !== 3) {
    throw new Error("Cramer's rule (3x3) requires a 3x3 matrix and length-3 vector.");
  }
  const detA = determinant(Aarr, tol);
  if (Math.abs(detA) <= tol) {
    throw new Error("Matrix is singular; Cramer's rule cannot be applied.");
  }
  const sol = new Array(3).fill(0);
  for (let i = 0; i < 3; i += 1) {
    const Ai = cloneMatrix(Aarr);
    for (let r = 0; r < 3; r += 1) {
      Ai[r][i] = bArr[r];
    }
    sol[i] = determinant(Ai, tol) / detA;
  }
  return sol;
}

export function cramer(A: Matrix, b: Vector, tol = 1e-12): Vector {
  const Aarr = as2d(A);
  const bArr = asVector(b);
  const n = Aarr.length;
  if (Aarr[0].length !== n || bArr.length !== n) {
    throw new Error("Cramer's rule requires an nxn matrix and length-n vector.");
  }
  const detA = determinant(Aarr, tol);
  if (Math.abs(detA) <= tol) {
    throw new Error("Matrix is singular; Cramer's rule cannot be applied.");
  }
  const sol = new Array(n).fill(0);
  for (let i = 0; i < n; i += 1) {
    const Ai = cloneMatrix(Aarr);
    for (let r = 0; r < n; r += 1) {
      Ai[r][i] = bArr[r];
    }
    sol[i] = determinant(Ai, tol) / detA;
  }
  return sol;
}

export type { Matrix, Vector };
