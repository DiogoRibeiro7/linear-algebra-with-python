// A06 - Geometria Analítica: Retas e Planos

// produto escalar
function produtoEscalar(u, v) {
  let soma = 0;
  for (let i = 0; i < u.length; i++) soma += u[i] * v[i];
  return soma;
}

// norma (comprimento) de um vetor
function norma(u) {
  return Math.sqrt(produtoEscalar(u, u));
}

// subtrai dois vetores
function subtrai(u, v) {
  const r = [];
  for (let i = 0; i < u.length; i++) r[i] = u[i] - v[i];
  return r;
}

// produto vetorial (3D)
function produtoVetorial(u, v) {
  return [
    u[1] * v[2] - u[2] * v[1],
    u[2] * v[0] - u[0] * v[2],
    u[0] * v[1] - u[1] * v[0]
  ];
}

const EPS = 1e-10;

// T1 - Posição relativa de retas em 2D
function posicao_relativa_retas_2d(P1, d1, P2, d2) {
  // produto vetorial em 2D dá um escalar
  const cruz = d1[0] * d2[1] - d1[1] * d2[0];
  if (Math.abs(cruz) > EPS) return "secantes";
  // direções paralelas: ver se P2 está na reta de P1
  const dp = subtrai(P2, P1);
  const cruz2 = dp[0] * d1[1] - dp[1] * d1[0];
  if (Math.abs(cruz2) < EPS) return "coincidentes";
  return "paralelas";
}

console.log("=== T1: Retas 2D ===");
console.log(posicao_relativa_retas_2d([0, 0], [1, 1], [2, 0], [-1, 1]) + " (esperado: secantes)");
console.log(posicao_relativa_retas_2d([0, 1], [1, 1], [0, -1], [2, 2]) + " (esperado: paralelas)");
console.log(posicao_relativa_retas_2d([0, 0], [1, 1], [2, 2], [3, 3]) + " (esperado: coincidentes)");

// T2 - Posição relativa de retas em 3D
function posicao_relativa_retas_3d(P1, d1, P2, d2) {
  const cruz = produtoVetorial(d1, d2);
  const dp = subtrai(P2, P1);
  if (norma(cruz) < EPS) {
    // direções paralelas
    if (norma(produtoVetorial(dp, d1)) < EPS) return "coincidentes";
    return "paralelas";
  }
  // se (P2-P1) é perpendicular a d1xd2, as retas são coplanares -> secantes
  if (Math.abs(produtoEscalar(dp, cruz)) < EPS) return "secantes";
  return "reversas";
}

console.log("\n=== T2: Retas 3D ===");
console.log(posicao_relativa_retas_3d([0, 0, 0], [1, 0, 0], [1, 0, 0], [0, 1, 0]) + " (esperado: secantes)");
console.log(posicao_relativa_retas_3d([0, 0, 0], [1, 1, 0], [0, 0, 1], [2, 2, 0]) + " (esperado: paralelas)");
console.log(posicao_relativa_retas_3d([0, 0, 0], [1, 1, 0], [2, 2, 0], [3, 3, 0]) + " (esperado: coincidentes)");
console.log(posicao_relativa_retas_3d([0, 0, 0], [1, 0, 0], [0, 1, 0], [0, 0, 1]) + " (esperado: reversas)");

// T3 - Plano cartesiano para paramétrico
function plano_cartesiano_para_parametrico(a, b, c, d) {
  // arranja um ponto do plano
  let ponto;
  if (Math.abs(c) > EPS) ponto = [0, 0, d / c];
  else if (Math.abs(b) > EPS) ponto = [0, d / b, 0];
  else ponto = [d / a, 0, 0];

  // dois vetores direção perpendiculares à normal (a,b,c)
  const normal = [a, b, c];
  let aux;
  if (Math.abs(a) < 0.9) aux = [1, 0, 0];
  else aux = [0, 1, 0];
  const dir1 = produtoVetorial(normal, aux);
  const dir2 = produtoVetorial(normal, dir1);

  return { ponto: ponto, dir1: dir1, dir2: dir2 };
}

console.log("\n=== T3: Plano cartesiano -> paramétrico ===");
const plano1 = plano_cartesiano_para_parametrico(1, 2, 3, 6);
console.log("x+2y+3z=6: ponto=" + JSON.stringify(plano1.ponto) + " v1=" + JSON.stringify(plano1.dir1) + " v2=" + JSON.stringify(plano1.dir2));
const plano2 = plano_cartesiano_para_parametrico(2, -1, 1, 4);
console.log("2x-y+z=4: ponto=" + JSON.stringify(plano2.ponto) + " v1=" + JSON.stringify(plano2.dir1) + " v2=" + JSON.stringify(plano2.dir2));

// T4 - Posição relativa de planos
function posicao_relativa_planos(n1, d1, n2, d2) {
  const cruz = produtoVetorial(n1, n2);
  if (norma(cruz) < EPS) {
    // normais paralelas -> paralelos ou coincidentes
    // verifica se um plano é múltiplo do outro
    let fator = n2[0] / n1[0];
    if (Math.abs(d2 - fator * d1) < EPS) return "coincidentes";
    return "paralelos";
  }
  return "secantes";
}

console.log("\n=== T4: Posição relativa de planos ===");
console.log(posicao_relativa_planos([1, 0, 0], 1, [0, 1, 0], 2) + " (esperado: secantes)");
console.log(posicao_relativa_planos([1, 2, 3], 6, [2, 4, 6], 10) + " (esperado: paralelos)");
console.log(posicao_relativa_planos([1, 2, 3], 6, [2, 4, 6], 12) + " (esperado: coincidentes)");

// T5 - Interseção reta-plano
function intersecao_reta_plano(P, d, normal, dPlano) {
  const nd = produtoEscalar(normal, d);
  if (Math.abs(nd) < EPS) {
    // reta paralela ao plano
    if (Math.abs(produtoEscalar(normal, P) - dPlano) < EPS) return "contida no plano";
    return "paralela ao plano";
  }
  const t = (dPlano - produtoEscalar(normal, P)) / nd;
  const ponto = [P[0] + d[0] * t, P[1] + d[1] * t, P[2] + d[2] * t];
  return "intersecta em (" + ponto.map(v => v.toFixed(2)).join(", ") + ")";
}

console.log("\n=== T5: Interseção reta-plano ===");
console.log(intersecao_reta_plano([0, 0, 0], [1, 1, 1], [1, 1, 1], 3));
console.log(intersecao_reta_plano([0, 0, 1], [1, 0, 0], [0, 0, 1], 0));
console.log(intersecao_reta_plano([1, 0, 0], [0, 1, 0], [1, 0, 0], 1));

// T6 - Testes com produto escalar
console.log("\n=== T6: Produto escalar (paralelismo e perpendicularidade) ===");

// duas retas perpendiculares
const r1 = [1, 0, 0];
const r2 = [0, 1, 0];
console.log("Retas perpendiculares: d1·d2 = " + produtoEscalar(r1, r2) + (produtoEscalar(r1, r2) === 0 ? " -> perpendiculares" : ""));

// reta paralela a um plano: direção perpendicular à normal
const dReta = [1, 0, 0];
const normalPlano = [0, 0, 1];
console.log("Reta paralela ao plano: d·n = " + produtoEscalar(dReta, normalPlano) + (produtoEscalar(dReta, normalPlano) === 0 ? " -> paralela" : ""));

// dois planos perpendiculares
const nA = [1, 0, 0];
const nB = [0, 1, 0];
console.log("Planos perpendiculares: n1·n2 = " + produtoEscalar(nA, nB) + (produtoEscalar(nA, nB) === 0 ? " -> perpendiculares" : ""));
