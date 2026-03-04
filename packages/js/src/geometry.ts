import { Matrix, Vector, asVector, linspace, meshgrid, cross, dot, norm, zeros } from "./utils";

function asVec(v: Vector): Vector {
  return asVector(v);
}

export function reta_2d(
  ponto: Vector,
  direcao: Vector,
  t_range: [number, number] = [-5, 5],
  n = 100
): [number[], number[]] {
  const p = asVec(ponto);
  const d = asVec(direcao);
  if (p.length !== 2 || d.length !== 2) {
    throw new Error("Point and direction must be 2D vectors.");
  }
  const t = linspace(t_range[0], t_range[1], n);
  const x = t.map((ti) => p[0] + ti * d[0]);
  const y = t.map((ti) => p[1] + ti * d[1]);
  return [x, y];
}

export function reta_3d(
  ponto: Vector,
  direcao: Vector,
  t_range: [number, number] = [-5, 5],
  n = 100
): [number[], number[], number[]] {
  const p = asVec(ponto);
  const d = asVec(direcao);
  if (p.length !== 3 || d.length !== 3) {
    throw new Error("Point and direction must be 3D vectors.");
  }
  const t = linspace(t_range[0], t_range[1], n);
  const x = t.map((ti) => p[0] + ti * d[0]);
  const y = t.map((ti) => p[1] + ti * d[1]);
  const z = t.map((ti) => p[2] + ti * d[2]);
  return [x, y, z];
}

export function plano_parametrico(
  ponto: Vector,
  v1: Vector,
  v2: Vector,
  s_range: [number, number] = [-5, 5],
  t_range: [number, number] = [-5, 5],
  n = 50
): [Matrix, Matrix, Matrix] {
  const p = asVec(ponto);
  const v1Arr = asVec(v1);
  const v2Arr = asVec(v2);
  if (p.length !== 3 || v1Arr.length !== 3 || v2Arr.length !== 3) {
    throw new Error("Point and direction vectors must be 3D.");
  }
  const s = linspace(s_range[0], s_range[1], n);
  const t = linspace(t_range[0], t_range[1], n);
  const [S, T] = meshgrid(s, t);
  const X = zeros(n, n);
  const Y = zeros(n, n);
  const Z = zeros(n, n);
  for (let i = 0; i < n; i += 1) {
    for (let j = 0; j < n; j += 1) {
      X[i][j] = p[0] + S[i][j] * v1Arr[0] + T[i][j] * v2Arr[0];
      Y[i][j] = p[1] + S[i][j] * v1Arr[1] + T[i][j] * v2Arr[1];
      Z[i][j] = p[2] + S[i][j] * v1Arr[2] + T[i][j] * v2Arr[2];
    }
  }
  return [X, Y, Z];
}

export function plano_cartesiano_para_parametrico(
  a: number,
  b: number,
  c: number,
  d: number
): [Vector, Vector, Vector] {
  const n = [a, b, c];
  if (Math.abs(a) <= 1e-12 && Math.abs(b) <= 1e-12 && Math.abs(c) <= 1e-12) {
    throw new Error("Plane normal vector cannot be zero.");
  }

  let point: Vector;
  if (Math.abs(c) > 1e-12) {
    point = [0, 0, d / c];
  } else if (Math.abs(b) > 1e-12) {
    point = [0, d / b, 0];
  } else {
    point = [d / a, 0, 0];
  }

  let v1: Vector;
  if (Math.abs(a) > 1e-12 || Math.abs(b) > 1e-12) {
    v1 = [-b, a, 0];
  } else {
    v1 = [1, 0, 0];
  }

  let v2: Vector;
  if (Math.abs(c) > 1e-12 || Math.abs(a) > 1e-12) {
    v2 = [-c, 0, a];
  } else {
    v2 = [0, 0, 1];
  }

  return [point, v1, v2];
}

export function posicao_relativa_retas_2d(
  p1: Vector,
  d1: Vector,
  p2: Vector,
  d2: Vector,
  tol = 1e-12
): string {
  const p1Arr = asVec(p1);
  const d1Arr = asVec(d1);
  const p2Arr = asVec(p2);
  const d2Arr = asVec(d2);
  if (p1Arr.length !== 2 || d1Arr.length !== 2 || p2Arr.length !== 2 || d2Arr.length !== 2) {
    throw new Error("All inputs must be 2D vectors.");
  }
  const crossVal = d1Arr[0] * d2Arr[1] - d1Arr[1] * d2Arr[0];
  if (Math.abs(crossVal) > tol) {
    return "intersecting";
  }
  const diff = [p2Arr[0] - p1Arr[0], p2Arr[1] - p1Arr[1]];
  const crossDiff = d1Arr[0] * diff[1] - d1Arr[1] * diff[0];
  if (Math.abs(crossDiff) <= tol) {
    return "coincident";
  }
  return "parallel";
}

export function posicao_relativa_retas_3d(
  p1: Vector,
  d1: Vector,
  p2: Vector,
  d2: Vector,
  tol = 1e-12
): string {
  const p1Arr = asVec(p1);
  const d1Arr = asVec(d1);
  const p2Arr = asVec(p2);
  const d2Arr = asVec(d2);
  if (p1Arr.length !== 3 || d1Arr.length !== 3 || p2Arr.length !== 3 || d2Arr.length !== 3) {
    throw new Error("All inputs must be 3D vectors.");
  }

  const crossDir = cross(d1Arr, d2Arr);
  if (norm(crossDir) <= tol) {
    const diff = [p2Arr[0] - p1Arr[0], p2Arr[1] - p1Arr[1], p2Arr[2] - p1Arr[2]];
    if (norm(cross(diff, d1Arr)) <= tol) {
      return "coincident";
    }
    return "parallel";
  }

  const diff = [p2Arr[0] - p1Arr[0], p2Arr[1] - p1Arr[1], p2Arr[2] - p1Arr[2]];
  if (Math.abs(dot(diff, crossDir)) > tol) {
    return "skew";
  }

  const A: Matrix = [
    [d1Arr[0], -d2Arr[0]],
    [d1Arr[1], -d2Arr[1]],
    [d1Arr[2], -d2Arr[2]]
  ];
  const AT: Matrix = [
    [A[0][0], A[1][0], A[2][0]],
    [A[0][1], A[1][1], A[2][1]]
  ];
  const ATA = [
    [AT[0][0] * A[0][0] + AT[0][1] * A[1][0] + AT[0][2] * A[2][0],
     AT[0][0] * A[0][1] + AT[0][1] * A[1][1] + AT[0][2] * A[2][1]],
    [AT[1][0] * A[0][0] + AT[1][1] * A[1][0] + AT[1][2] * A[2][0],
     AT[1][0] * A[0][1] + AT[1][1] * A[1][1] + AT[1][2] * A[2][1]]
  ];
  const ATb = [
    AT[0][0] * diff[0] + AT[0][1] * diff[1] + AT[0][2] * diff[2],
    AT[1][0] * diff[0] + AT[1][1] * diff[1] + AT[1][2] * diff[2]
  ];

  const detATA = ATA[0][0] * ATA[1][1] - ATA[0][1] * ATA[1][0];
  if (Math.abs(detATA) <= tol) {
    return "skew";
  }
  const s = (ATb[0] * ATA[1][1] - ATb[1] * ATA[0][1]) / detATA;
  const t = (ATA[0][0] * ATb[1] - ATA[1][0] * ATb[0]) / detATA;

  const residual = [
    A[0][0] * s + A[0][1] * t - diff[0],
    A[1][0] * s + A[1][1] * t - diff[1],
    A[2][0] * s + A[2][1] * t - diff[2]
  ];
  const resNorm = norm(residual);
  if (resNorm <= tol) {
    return "intersecting";
  }
  return "skew";
}

export function posicao_relativa_planos(
  n1: Vector,
  d1: number,
  n2: Vector,
  d2: number,
  tol = 1e-12
): string {
  const n1Arr = asVec(n1);
  const n2Arr = asVec(n2);
  if (n1Arr.length !== 3 || n2Arr.length !== 3) {
    throw new Error("Normal vectors must be 3D.");
  }
  const crossVal = cross(n1Arr, n2Arr);
  if (norm(crossVal) > tol) {
    return "secant";
  }

  let k: number | null = null;
  for (let i = 0; i < 3; i += 1) {
    if (Math.abs(n1Arr[i]) > tol) {
      k = n2Arr[i] / n1Arr[i];
      break;
    }
  }
  if (k === null) {
    throw new Error("Normal vector cannot be zero.");
  }
  if (Math.abs(d2 - k * d1) <= tol) {
    return "coincident";
  }
  return "parallel";
}

export function intersecao_reta_plano(
  p_reta: Vector,
  d_reta: Vector,
  normal: Vector,
  d: number,
  tol = 1e-12
): Vector | null {
  const p = asVec(p_reta);
  const dvec = asVec(d_reta);
  const nvec = asVec(normal);
  if (p.length !== 3 || dvec.length !== 3 || nvec.length !== 3) {
    throw new Error("All vectors must be 3D.");
  }
  const denom = dot(nvec, dvec);
  if (Math.abs(denom) <= tol) {
    if (Math.abs(dot(nvec, p) - d) <= tol) {
      return p.slice();
    }
    return null;
  }
  const t = (d - dot(nvec, p)) / denom;
  return [p[0] + t * dvec[0], p[1] + t * dvec[1], p[2] + t * dvec[2]];
}

export function superficie_cilindro(r = 1.0, h = 2.0, n = 50): [Matrix, Matrix, Matrix] {
  if (r <= 0 || h <= 0 || n <= 1) {
    throw new Error("Invalid cylinder parameters.");
  }
  const theta = linspace(0.0, 2.0 * Math.PI, n);
  const z = linspace(0.0, h, n);
  const [Theta, Z] = meshgrid(theta, z);
  const X = zeros(n, n);
  const Y = zeros(n, n);
  for (let i = 0; i < n; i += 1) {
    for (let j = 0; j < n; j += 1) {
      X[i][j] = r * Math.cos(Theta[i][j]);
      Y[i][j] = r * Math.sin(Theta[i][j]);
    }
  }
  return [X, Y, Z];
}

export function superficie_cone(r = 1.0, h = 2.0, n = 50): [Matrix, Matrix, Matrix] {
  if (r <= 0 || h <= 0 || n <= 1) {
    throw new Error("Invalid cone parameters.");
  }
  const theta = linspace(0.0, 2.0 * Math.PI, n);
  const z = linspace(0.0, h, n);
  const [Theta, Z] = meshgrid(theta, z);
  const X = zeros(n, n);
  const Y = zeros(n, n);
  const R = zeros(n, n);
  for (let i = 0; i < n; i += 1) {
    for (let j = 0; j < n; j += 1) {
      R[i][j] = (r / h) * Z[i][j];
      X[i][j] = R[i][j] * Math.cos(Theta[i][j]);
      Y[i][j] = R[i][j] * Math.sin(Theta[i][j]);
    }
  }
  return [X, Y, Z];
}

export function superficie_esfera(r = 1.0, n = 50): [Matrix, Matrix, Matrix] {
  if (r <= 0 || n <= 1) {
    throw new Error("Invalid sphere parameters.");
  }
  const phi = linspace(0.0, Math.PI, n);
  const theta = linspace(0.0, 2.0 * Math.PI, n);
  const [Phi, Theta] = meshgrid(phi, theta);
  const X = zeros(n, n);
  const Y = zeros(n, n);
  const Z = zeros(n, n);
  for (let i = 0; i < n; i += 1) {
    for (let j = 0; j < n; j += 1) {
      X[i][j] = r * Math.sin(Phi[i][j]) * Math.cos(Theta[i][j]);
      Y[i][j] = r * Math.sin(Phi[i][j]) * Math.sin(Theta[i][j]);
      Z[i][j] = r * Math.cos(Phi[i][j]);
    }
  }
  return [X, Y, Z];
}

export function superficie_revolucao(
  curva: (t: number[]) => [number[], number[]],
  eixo: "x" | "y" | "z" = "z",
  t_range: [number, number] = [0.0, 2.0],
  n = 50
): [Matrix, Matrix, Matrix] {
  if (eixo !== "x" && eixo !== "y" && eixo !== "z") {
    throw new Error("Axis must be 'x', 'y', or 'z'.");
  }
  const t = linspace(t_range[0], t_range[1], n);
  const [rVals, zVals] = curva(t);
  if (rVals.length !== n || zVals.length !== n) {
    throw new Error("Curva must return arrays with the same length as t.");
  }
  const theta = linspace(0.0, 2.0 * Math.PI, n);
  const [Theta, R] = meshgrid(theta, rVals);
  const Z = zeros(n, n);
  for (let i = 0; i < n; i += 1) {
    for (let j = 0; j < n; j += 1) {
      Z[i][j] = zVals[i];
    }
  }

  if (eixo === "z") {
    const X = zeros(n, n);
    const Y = zeros(n, n);
    for (let i = 0; i < n; i += 1) {
      for (let j = 0; j < n; j += 1) {
        X[i][j] = R[i][j] * Math.cos(Theta[i][j]);
        Y[i][j] = R[i][j] * Math.sin(Theta[i][j]);
      }
    }
    return [X, Y, Z];
  }
  if (eixo === "x") {
    const X = zeros(n, n);
    const Y = zeros(n, n);
    const Zout = zeros(n, n);
    for (let i = 0; i < n; i += 1) {
      for (let j = 0; j < n; j += 1) {
        X[i][j] = zVals[i];
        Y[i][j] = R[i][j] * Math.cos(Theta[i][j]);
        Zout[i][j] = R[i][j] * Math.sin(Theta[i][j]);
      }
    }
    return [X, Y, Zout];
  }

  const X = zeros(n, n);
  const Y = zeros(n, n);
  const Zout = zeros(n, n);
  for (let i = 0; i < n; i += 1) {
    for (let j = 0; j < n; j += 1) {
      X[i][j] = R[i][j] * Math.cos(Theta[i][j]);
      Zout[i][j] = R[i][j] * Math.sin(Theta[i][j]);
      Y[i][j] = zVals[i];
    }
  }
  return [X, Y, Zout];
}

export type { Matrix, Vector };
