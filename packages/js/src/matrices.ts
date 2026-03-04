import {
  Matrix,
  Vector,
  asMatrix,
  asVector,
  diag,
  identity,
  zeros,
  allClose
} from "./utils";

function mulberry32(seed: number): () => number {
  let t = seed >>> 0;
  return () => {
    t += 0x6d2b79f5;
    let r = Math.imul(t ^ (t >>> 15), 1 | t);
    r ^= r + Math.imul(r ^ (r >>> 7), 61 | r);
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
  };
}

function normalSample(rng: () => number): number {
  let u = 0;
  let v = 0;
  while (u === 0) u = rng();
  while (v === 0) v = rng();
  return Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
}

export function criar_matriz_nula(m: number, n: number): Matrix {
  return zeros(m, n);
}

export function criar_identidade(n: number): Matrix {
  return identity(n);
}

export function criar_diagonal(valores: number[]): Matrix {
  return diag(valores);
}

export function criar_triangular_superior(A: Matrix): Matrix {
  const arr = asMatrix(A);
  const m = arr.length;
  const n = arr[0].length;
  const out = zeros(m, n);
  for (let i = 0; i < m; i += 1) {
    for (let j = i; j < n; j += 1) {
      out[i][j] = arr[i][j];
    }
  }
  return out;
}

export function criar_triangular_inferior(A: Matrix): Matrix {
  const arr = asMatrix(A);
  const m = arr.length;
  const n = arr[0].length;
  const out = zeros(m, n);
  for (let i = 0; i < m; i += 1) {
    for (let j = 0; j <= Math.min(i, n - 1); j += 1) {
      out[i][j] = arr[i][j];
    }
  }
  return out;
}

export function criar_simetrica(n: number, seed?: number): Matrix {
  if (n <= 0) {
    throw new Error("Matrix size must be a positive integer.");
  }
  const rng = seed === undefined ? Math.random : mulberry32(seed);
  const M = zeros(n, n);
  for (let i = 0; i < n; i += 1) {
    for (let j = 0; j < n; j += 1) {
      M[i][j] = normalSample(rng);
    }
  }
  const out = zeros(n, n);
  for (let i = 0; i < n; i += 1) {
    for (let j = 0; j < n; j += 1) {
      out[i][j] = 0.5 * (M[i][j] + M[j][i]);
    }
  }
  return out;
}

export function eh_quadrada(A: Matrix): boolean {
  const arr = asMatrix(A);
  return arr.length === arr[0].length;
}

export function dimensao(A: Matrix): [number, number] {
  const arr = asMatrix(A);
  return [arr.length, arr[0].length];
}

export function classificar_matriz(A: Matrix): string[] {
  const arr = asMatrix(A);
  const m = arr.length;
  const n = arr[0].length;
  const labels: string[] = [];
  const isSquare = m === n;
  labels.push(isSquare ? "square" : "rectangular");

  const zero = arr.every((row) => row.every((v) => Math.abs(v) <= 1e-12));
  if (zero) {
    labels.push("zero");
  }

  if (isSquare) {
    const eye = identity(n);
    if (allClose(arr, eye)) {
      labels.push("identity");
    }
    const diagOnly = zeros(n, n);
    for (let i = 0; i < n; i += 1) {
      diagOnly[i][i] = arr[i][i];
    }
    if (allClose(arr, diagOnly)) {
      labels.push("diagonal");
    }
    const symmetric = arr.every((row, i) => row.every((v, j) => Math.abs(v - arr[j][i]) <= 1e-12));
    if (symmetric) {
      labels.push("symmetric");
    }
  }

  const upper = arr.every((row, i) => row.every((v, j) => (j >= i ? true : Math.abs(v) <= 1e-12)));
  const lower = arr.every((row, i) => row.every((v, j) => (j <= i ? true : Math.abs(v) <= 1e-12)));
  if (upper) {
    labels.push("upper_triangular");
  }
  if (lower) {
    labels.push("lower_triangular");
  }
  return labels;
}

export type { Matrix, Vector };
