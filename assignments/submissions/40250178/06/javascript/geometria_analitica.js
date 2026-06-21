const math = require('mathjs');

const eps = 1e-10;
const eq = (a, b) => Math.abs(a - b) < eps;

// ─── Utilitários ──────────────────────────────────────────────────────────────

function cross2d(u, v) {
  return u[0] * v[1] - u[1] * v[0];
}

function dot(u, v) {
  return u.reduce((s, x, i) => s + x * v[i], 0);
}

function norm(v) {
  return Math.sqrt(dot(v, v));
}

function cross3d(u, v) {
  return [
    u[1]*v[2] - u[2]*v[1],
    u[2]*v[0] - u[0]*v[2],
    u[0]*v[1] - u[1]*v[0]
  ];
}

function isZeroVec(v) {
  return v.every(x => Math.abs(x) < eps);
}

// ─── T1: Posição relativa de retas em 2D ─────────────────────────────────────

function posicao_relativa_retas_2d(p1, d1, p2, d2) {
  // retas: P + t*d
  const cross = cross2d(d1, d2);
  if (!eq(cross, 0)) return 'secantes';
  // paralelas ou coincidentes — verificar se p2-p1 é paralelo a d1
  const diff = [p2[0]-p1[0], p2[1]-p1[1]];
  if (eq(cross2d(d1, diff), 0)) return 'coincidentes';
  return 'paralelas';
}

const casos2d = [
  { p1:[0,0], d1:[1,1], p2:[1,0], d2:[1,2], label:'secantes' },
  { p1:[0,0], d1:[1,1], p2:[0,1], d2:[2,2], label:'paralelas' },
  { p1:[0,0], d1:[1,1], p2:[2,2], d2:[3,3], label:'coincidentes' }
];

console.log('─── T1: Retas 2D ───');
casos2d.forEach(c => {
  const res = posicao_relativa_retas_2d(c.p1, c.d1, c.p2, c.d2);
  console.log(`Esperado: ${c.label} → Resultado: ${res}`);
});

// ─── T2: Posição relativa de retas em 3D ─────────────────────────────────────

function posicao_relativa_retas_3d(p1, d1, p2, d2) {
  const cr = cross3d(d1, d2);
  const diff = [p2[0]-p1[0], p2[1]-p1[1], p2[2]-p1[2]];

  if (isZeroVec(cr)) {
    // direções paralelas
    if (eq(dot(cross3d(d1, diff), cross3d(d1, diff)), 0)) return 'coincidentes';
    return 'paralelas';
  }
  // verificar se as retas se intersectam (diff está no plano de d1 e d2)
  if (eq(dot(cr, diff), 0)) return 'secantes';
  return 'reversas';
}

const casos3d = [
  { p1:[0,0,0], d1:[1,0,0], p2:[0,1,0], d2:[0,1,0], label:'secantes' },
  { p1:[0,0,0], d1:[1,0,0], p2:[0,1,0], d2:[1,0,0], label:'paralelas' },
  { p1:[0,0,0], d1:[1,0,0], p2:[2,0,0], d2:[3,0,0], label:'coincidentes' },
  { p1:[0,0,0], d1:[1,0,0], p2:[0,1,1], d2:[0,0,1], label:'reversas' }
];

console.log('\n─── T2: Retas 3D ───');
casos3d.forEach(c => {
  const res = posicao_relativa_retas_3d(c.p1, c.d1, c.p2, c.d2);
  console.log(`Esperado: ${c.label} → Resultado: ${res}`);
});

// ─── T3: Plano cartesiano para paramétrico ────────────────────────────────────

function plano_cartesiano_para_parametrico(a, b, c, d) {
  // ax + by + cz = d
  // encontrar um ponto no plano
  let ponto;
  if (Math.abs(c) > eps) ponto = [0, 0, d/c];
  else if (Math.abs(b) > eps) ponto = [0, d/b, 0];
  else ponto = [d/a, 0, 0];

  // dois vetores de direção perpendiculares ao normal [a,b,c]
  const n = [a, b, c];
  const v1 = Math.abs(a) > eps || Math.abs(b) > eps
    ? [-b, a, 0]
    : [0, -c, b];
  const v2 = cross3d(n, v1);

  return { ponto, v1, v2, normal: n };
}

console.log('\n─── T3: Plano cartesiano → paramétrico ───');
const p1 = plano_cartesiano_para_parametrico(1, 2, 3, 6);
console.log('Plano x+2y+3z=6:', p1);
const p2 = plano_cartesiano_para_parametrico(2, -1, 0, 4);
console.log('Plano 2x-y=4:', p2);

// ─── T4: Posição relativa de planos ──────────────────────────────────────────

function posicao_relativa_planos(n1, d1, n2, d2) {
  const cr = cross3d(n1, n2);
  if (!isZeroVec(cr)) return 'secantes';
  // normais paralelas: verificar se são o mesmo plano
  const ratio = n1.map((v, i) => Math.abs(n2[i]) > eps ? v / n2[i] : null).find(v => v !== null);
  if (eq(d1 / ratio, d2)) return 'coincidentes';
  return 'paralelos';
}

console.log('\n─── T4: Posição relativa de planos ───');
console.log('Secantes:', posicao_relativa_planos([1,0,0], 1, [0,1,0], 2));
console.log('Paralelos:', posicao_relativa_planos([1,2,3], 4, [2,4,6], 10));
console.log('Coincidentes:', posicao_relativa_planos([1,2,3], 6, [2,4,6], 12));

// ─── T5: Interseção reta-plano ────────────────────────────────────────────────

function intersecao_reta_plano(ponto, direcao, normal, d) {
  const denom = dot(normal, direcao);
  if (eq(denom, 0)) {
    // reta paralela ao plano — verificar se está contida
    if (eq(dot(normal, ponto), d)) return { tipo: 'contida' };
    return { tipo: 'paralela (sem interseção)' };
  }
  const t = (d - dot(normal, ponto)) / denom;
  const intersecao = ponto.map((v, i) => v + t * direcao[i]);
  return { tipo: 'intersecta', ponto: intersecao, t };
}

console.log('\n─── T5: Interseção reta-plano ───');
console.log('Intersecta:', intersecao_reta_plano([0,0,0],[1,1,1],[1,0,0],3));
console.log('Paralela:', intersecao_reta_plano([0,0,0],[0,1,0],[1,0,0],3));
console.log('Contida:', intersecao_reta_plano([3,1,0],[0,1,0],[1,0,0],3));

// ─── T6: Produto interno — paralelismo e perpendicularidade ──────────────────

console.log('\n─── T6: Testes com produto interno ───');

const u1 = [1, 0, 0], u2 = [0, 1, 0];
console.log('u1=[1,0,0] e u2=[0,1,0] perpendiculares?', eq(dot(u1, u2), 0));

// reta paralela a plano: direção da reta perpendicular ao normal do plano
const dirReta = [1, -1, 0];
const normalPlano = [1, 1, 0];
console.log('Reta paralela ao plano?', eq(dot(dirReta, normalPlano), 0));

// dois planos perpendiculares
const n1 = [1, 0, 0], n2 = [0, 0, 1];
console.log('Planos perpendiculares?', eq(dot(n1, n2), 0));
