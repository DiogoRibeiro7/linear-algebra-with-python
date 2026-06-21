// ======================================================
// Funções auxiliares
// ======================================================

function det2(a, b, c, d) {
  return a * d - b * c;
}

function dot3(a, b) {
  return a.x * b.x + a.y * b.y + a.z * b.z;
}

function cross3(a, b) {
  return {
    x: a.y * b.z - a.z * b.y,
    y: a.z * b.x - a.x * b.z,
    z: a.x * b.y - a.y * b.x
  };
}

function isZeroVec(v, eps = 1e-9) {
  return Math.abs(v.x) < eps && Math.abs(v.y) < eps && Math.abs(v.z) < eps;
}

// ======================================================
// T1 – Classificação de retas 2D
// ======================================================

function posicao_relativa_retas_2d(r1, r2) {
  const { p: p1, d: v1 } = r1;
  const { p: p2, d: v2 } = r2;

  const det = det2(v1.x, v1.y, v2.x, v2.y);

  if (Math.abs(det) > 1e-9) return "concorrentes";

  const dx = p2.x - p1.x;
  const dy = p2.y - p1.y;
  const detP = det2(v1.x, v1.y, dx, dy);

  return Math.abs(detP) < 1e-9 ? "coincidentes" : "paralelas";
}

// ======================================================
// T2 – Classificação de retas 3D
// ======================================================

function posicao_relativa_retas_3d(r1, r2) {
  const { p: p1, d: v1 } = r1;
  const { p: p2, d: v2 } = r2;

  const n = cross3(v1, v2);

  if (!isZeroVec(n)) {
    const w = { x: p2.x - p1.x, y: p2.y - p1.y, z: p2.z - p1.z };
    const triple = dot3(w, n);
    return Math.abs(triple) < 1e-9 ? "concorrentes" : "reversas";
  }

  const w = { x: p2.x - p1.x, y: p2.y - p1.y, z: p2.z - p1.z };
  const crossW = cross3(w, v1);
  return isZeroVec(crossW) ? "coincidentes" : "paralelas";
}

// ======================================================
// T3 – Plano cartesiano → paramétrico
// ======================================================

function plano_cartesiano_para_parametrico(a, b, c, d) {
  let P;
  if (Math.abs(c) > 1e-9) P = { x: 0, y: 0, z: d / c };
  else if (Math.abs(b) > 1e-9) P = { x: 0, y: d / b, z: 0 };
  else P = { x: d / a, y: 0, z: 0 };

  const v1 = { x: b, y: -a, z: 0 };
  const v2 = { x: c, y: 0, z: -a };

  return { ponto: P, v1, v2 };
}

// ======================================================
// T4 – Classificação de planos
// ======================================================

function saoProporcionais(a1, b1, c1, a2, b2, c2, eps = 1e-9) {
  const r = [];
  if (a2 !== 0) r.push(a1 / a2);
  if (b2 !== 0) r.push(b1 / b2);
  if (c2 !== 0) r.push(c1 / c2);
  return r.every(v => Math.abs(v - r[0]) < eps);
}

function posicao_relativa_planos(p1, p2) {
  const { a: a1, b: b1, c: c1, d: d1 } = p1;
  const { a: a2, b: b2, c: c2, d: d2 } = p2;

  const paralelos = saoProporcionais(a1, b1, c1, a2, b2, c2);

  if (!paralelos) return "secantes";

  let k = a2 !== 0 ? a1 / a2 : b2 !== 0 ? b1 / b2 : c1 / c2;

  return Math.abs(d1 - k * d2) < 1e-9 ? "coincidentes" : "paralelos";
}

// ======================================================
// T5 – Interseção reta–plano
// ======================================================

function intersecao_reta_plano(reta, plano) {
  const { p, d } = reta;
  const { a, b, c, d: D } = plano;

  const n = { x: a, y: b, z: c };
  const nv = dot3(n, d);
  const np = dot3(n, p);

  if (Math.abs(nv) < 1e-9) {
    if (Math.abs(np - D) < 1e-9) return { tipo: "contida", ponto: null };
    return { tipo: "paralela", ponto: null };
  }

  const t = (D - np) / nv;
  return {
    tipo: "interseta",
    ponto: { x: p.x + t * d.x, y: p.y + t * d.y, z: p.z + t * d.z }
  };
}

// ======================================================
// T6 – Produto escalar (testes)
// ======================================================

function testes_dot() {
  const vA = { x: 1, y: 0 };
  const vB = { x: 0, y: 1 };
  console.log("Retas perpendiculares:", vA.x * vB.x + vA.y * vB.y);

  const normal = { x: 0, y: 0, z: 1 };
  const dir = { x: 1, y: 1, z: 0 };
  console.log("Reta paralela a plano:", dot3(normal, dir));

  const n1 = { x: 1, y: 0, z: 0 };
  const n2 = { x: 0, y: 1, z: 0 };
  console.log("Planos perpendiculares:", dot3(n1, n2));
}

testes_dot();
