//ex1
function cross2d(u, v) { //porque math.cross pede vetores 3d
  return u[0] * v[1] - u[1] * v[0];
}

function posicao_relativa_retas_2d(P1, P2, Q1, Q2) {
  const u = [P2[0] - P1[0], P2[1] - P1[1]];
  const v = [Q2[0] - Q1[0], Q2[1] - Q1[1]];
  const w = [Q1[0] - P1[0], Q1[1] - P1[1]];

  const cross_uv = cross2d(u, v); // 2D cross product
  const cross_wu = cross2d(w, u);

  const eps = 1e-9;

  if (Math.abs(cross_uv) > eps) {
    return "secantes";
  }

  if (Math.abs(cross_wu) > eps) {
    return "paralelas";
  }

  return "coincidentes";
}


const casos2d = [
  {
    titulo: "Secantes",
    P1: [-3, -2], P2: [3, 2],
    Q1: [-2, 2],  Q2: [2, -2]
  },
  {
    titulo: "Paralelas",
    P1: [-3, -1], P2: [3, 1],
    Q1: [-3, 1],  Q2: [3, 3]
  },
  {
    titulo: "Coincidentes",
    P1: [-3, -2], P2: [3, 2],
    Q1: [-1.5, -1], Q2: [1.5, 1]
  }
];

const traces = [];
const layout = {
  grid: { rows: 1, columns: 3, pattern: "independent" },
  height: 420,
  width: 1200,
  title: "Posição Relativa",
};

casos2d.forEach((c, i) => {
  const rel = posicao_relativa_retas_2d(c.P1, c.P2, c.Q1, c.Q2);

  const xa = `x${i === 0 ? "" : i + 1}`;
  const ya = `y${i === 0 ? "" : i + 1}`;

  traces.push({
    x: [c.P1[0], c.P2[0]],
    y: [c.P1[1], c.P2[1]],
    type: "scatter",
    mode: "lines",
    line: { color: "royalblue", width: 3 },
    name: "Reta 1",
    xaxis: xa,
    yaxis: ya
  });

  traces.push({
    x: [c.Q1[0], c.Q2[0]],
    y: [c.Q1[1], c.Q2[1]],
    type: "scatter",
    mode: "lines",
    line: { color: "crimson", width: 3, dash: "dash" },
    name: "Reta 2",
    xaxis: xa,
    yaxis: ya
  });

  layout[`xaxis${i === 0 ? "" : i + 1}`] = { title: c.titulo, range: [-4, 4] };
  layout[`yaxis${i === 0 ? "" : i + 1}`] = { range: [-4, 4], scaleanchor: xa, scaleratio: 1 };

  traces.push({
    x: [0],
    y: [0],
    type: "scatter",
    mode: "text",
    text: [rel],
    textposition: "middle center",
    textfont: { size: 18, color: "black" },
    xaxis: xa,
    yaxis: ya,
    showlegend: false
  });
});

Plotly.newPlot("ex1", traces, layout);

//ex2

function isZeroVec(v, eps = 1e-9) {
  return Math.sqrt(math.dot(v,v)) < eps;
}

function posicao_relativa_retas_3d(P1, P2, Q1, Q2) {
  const u = [P2[0] - P1[0], P2[1] - P1[1], P2[2] - P1[2]];
  const v = [Q2[0] - Q1[0], Q2[1] - Q1[1], Q2[2] - Q1[2]];
  const w = [Q1[0] - P1[0], Q1[1] - P1[1], Q1[2] - P1[2]];
  const eps = 1e-9;

  const uxv = math.cross(u, v);

  if (!isZeroVec(uxv, eps)) {
    const coplanarTest = math.dot(w, uxv);
    if (Math.abs(coplanarTest) < eps) {
      const t = math.dot(math.cross(w, v), uxv) / math.dot(uxv, uxv);
      const point = [P1[0] + t * u[0], P1[1] + t * u[1], P1[2] + t * u[2]];
      const sVec = [point[0] - Q1[0], point[1] - Q1[1], point[2] - Q1[2]];
      if (isZeroVec(math.cross(sVec, v), eps)) return "intersecting";
      return "skew";
    }
    return "skew";
  }

  if (isZeroVec(math.cross(w, u), eps)) {
    return "coincident";
  }

  return "parallel";
}

const casos3d = [
  {
    titulo: "Intersecting",
    P1: [-2, -1, 0], P2: [2, 1, 1],
    Q1: [-1, 2, 1],  Q2: [1, -2, 0]
  },
  {
    titulo: "Parallel",
    P1: [-2, -1, 0], P2: [2, 1, 1],
    Q1: [-2, 0, 2],  Q2: [2, 2, 3]
  },
  {
    titulo: "Coincident",
    P1: [-2, -1, 0], P2: [2, 1, 1],
    Q1: [-1, -0.5, 0.5], Q2: [1, 0.5, 1]
  },
  {
    titulo: "Skew",
    P1: [-2, -1, 0], P2: [2, 1, 1],
    Q1: [-1, 2, 2],  Q2: [1, 0, 3]
  }
];

const figData = [];
const layout2 = {
  title: "3D line classification",
  height: 900,
  width: 1100,
  showlegend: false,
  margin: { l: 0, r: 0, b: 0, t: 50 },
  scene:  { domain: { row: 0, column: 0 } },
  scene2: { domain: { row: 0, column: 1 } },
  scene3: { domain: { row: 1, column: 0 } },
  scene4: { domain: { row: 1, column: 1 } },
  grid: { rows: 2, columns: 2, pattern: "independent" }
};

function lineTrace(P1, P2, name, color, scene) {
  return {
    x: [P1[0], P2[0]],
    y: [P1[1], P2[1]],
    z: [P1[2], P2[2]],
    type: "scatter3d",
    mode: "lines",
    line: { color: color, width: 6 },
    name: name,
    scene: scene
  };
}

function pointTrace(P, name, color, scene) {
  return {
    x: [P[0]],
    y: [P[1]],
    z: [P[2]],
    type: "scatter3d",
    mode: "markers+text",
    marker: { size: 4, color: color },
    text: [name],
    textposition: "top center",
    scene: scene,
    showlegend: false
  };
}

casos3d.forEach((c, i) => {
  const scene = i === 0 ? "scene" : i === 1 ? "scene2" : i === 2 ? "scene3" : "scene4";
  const rel = posicao_relativa_retas_3d(c.P1, c.P2, c.Q1, c.Q2);

  figData.push(lineTrace(c.P1, c.P2, "Reta 1", "royalblue", scene));
  figData.push(lineTrace(c.Q1, c.Q2, "Reta 2", "crimson", scene));
  figData.push(pointTrace(c.P1, "P1", "royalblue", scene));
  figData.push(pointTrace(c.Q1, "Q1", "crimson", scene));

  layout2[scene] = {
    title: `${c.titulo}: ${rel}`,
    aspectmode: "cube"
  };
});

Plotly.newPlot("ex2", figData, layout2);


//ex3

console.log("-----Ex3-------")

function plano_cartesiano_para_parametrico(a, b, c, d) {
  const eps = 1e-9;

  let p, v1, v2;

  if (Math.abs(c) > eps) {
    // Let x = s, y = t
    // z = (d - ax - by)/c
    p = [0, 0, d / c];
    v1 = [1, 0, -a / c];
    v2 = [0, 1, -b / c];
  } else if (Math.abs(b) > eps) {
    // Let x = s, z = t
    // y = (d - ax - cz)/b
    p = [0, d / b, 0];
    v1 = [1, -a / b, 0];
    v2 = [0, -c / b, 1];
  } else if (Math.abs(a) > eps) {
    // Let y = s, z = t
    // x = (d - by - cz)/a
    p = [d / a, 0, 0];
    v1 = [-b / a, 1, 0];
    v2 = [-c / a, 0, 1];
  } else {
    throw new Error("Invalid plane: a, b, and c cannot all be zero.");
  }

  return { point: p, dir1: v1, dir2: v2 };
}

function formatPlaneResult(a, b, c, d) {
  const r = plano_cartesiano_para_parametrico(a, b, c, d);
  return {
    cartesian: `${a}x + ${b}y + ${c}z = ${d}`,
    point: r.point,
    dir1: r.dir1,
    dir2: r.dir2
  };
}

const pl1 = formatPlaneResult(2, 3, -1, 6);
const pl2 = formatPlaneResult(1, -2, 4, 8);

console.log(pl1);
console.log(pl2);

//ex4
console.log("-----Ex4-------")

function posicao_relativa_planos(p1, p2, eps = 1e-9) {
  const [a1, b1, c1, d1] = p1;
  const [a2, b2, c2, d2] = p2;

  const n1 = [a1, b1, c1];
  const n2 = [a2, b2, c2];

  const n1xn2 = math.cross(n1, n2);

  if (math.norm(n1xn2) > eps) {
    return "secantes";
  }

  const v = [a2 * d1 - a1 * d2, b2 * d1 - b1 * d2, c2 * d1 - c1 * d2];
  if (
    Math.abs(v[0]) < eps &&
    Math.abs(v[1]) < eps &&
    Math.abs(v[2]) < eps
  ) {
    return "coincidentes";
  }

  return "paralelos";
}

const pares = [
  {
    p1: [2, 3, -1, 6],
    p2: [4, 6, -2, 12],   // coincident
    label: "Pair 1"
  },
  {
    p1: [1, -2, 4, 8],
    p2: [2, -4, 8, 3],    // parallel
    label: "Pair 2"
  },
  {
    p1: [1, 1, 1, 6],
    p2: [2, -1, 1, 2],    // secant
    label: "Pair 3"
  }
];

pares.forEach(({ p1, p2, label }) => {
  console.log(label, posicao_relativa_planos(p1, p2));
});


//ex5
console.log("-----Ex5-------")
function intersecao_reta_plano(P0, P1, plano, eps = 1e-9) {
  const [a, b, c, d] = plano;
  const n = [a, b, c];
  const m = [P1[0] - P0[0], P1[1] - P0[1], P1[2] - P0[2]];

  const nd = math.dot(n, m);
  const np0 = a * P0[0] + b * P0[1] + c * P0[2];

  if (Math.abs(nd) > eps) {
    const t = (d - np0) / nd;
    return {
      type: "intersecting",
      point: [P0[0] + t * m[0], P0[1] + t * m[1], P0[2] + t * m[2]]
    };
  }

  if (Math.abs(np0 - d) < eps) {
    return {
      type: "contained",
      point: null
    };
  }

  return {
    type: "parallel",
    point: null
  };
}


const casos = [
  {
    name: "Intersecting",
    line: [[0, 0, 0], [1, 1, 1]],
    plane: [1, -1, 1, 2]
  },
  {
    name: "Parallel",
    line: [[0, 0, 0], [1, 0, 0]],
    plane: [0, 0, 1, 3]
  },
  {
    name: "Contained",
    line: [[0, 0, 1], [1, 1, 1]],
    plane: [0, 0, 1, 1]
  }
];

casos.forEach(c => {
  const result = intersecao_reta_plano(c.line[0], c.line[1], c.plane);
  console.log(c.name, result);
});

//ex6
console.log("-----Ex6-------")
function isZero(x, eps = 1e-9) {
  return Math.abs(x) < eps;
}

//Perpendicular lines
const u1 = [1, 2, 0];
const r1 = [2, -1, 0];
console.log("Lines perpendicular:", isZero(math.dot(u1, r1)), math.dot(u1, r1));

// Line Parallel to plane
const d2 = [1, 2, 3];
const n2 = [2, -1, 0];
console.log("Line parallel to plane:", isZero(math.dot(d2, n2)), math.dot(d2, n2));

//Perpendicular planes
const n3a = [1, 0, 0];
const n3b = [0, 2, 0];
console.log("Planes perpendicular:", isZero(math.dot(n3a, n3b)), math.dot(n3a, n3b));

//ex7
 function planeBasis(a, b, c, d) {
      let p, t1, t2;
      if (Math.abs(c) > 1e-9) {
        p = [0, 0, d / c];
        t1 = [1, 0, -a / c];
        t2 = [0, 1, -b / c];
      } else if (Math.abs(b) > 1e-9) {
        p = [0, d / b, 0];
        t1 = [1, -a / b, 0];
        t2 = [0, -c / b, 1];
      } else {
        p = [d / a, 0, 0];
        t1 = [-b / a, 1, 0];
        t2 = [-c / a, 0, 1];
      }
      return { p, t1, t2, n: [a, b, c] };
    }

    const plane = [2, -1, 1, 3];
    const { p, t1, t2, n } = planeBasis(...plane);

    const s = [];
    for (let i = -25; i <= 25; i++) s.push(i / 5);
    const t = [];
    for (let i = -25; i <= 25; i++) t.push(i / 5);

    const X = [], Y = [], Z = [];
    for (let i = 0; i < t.length; i++) {
      X[i] = []; Y[i] = []; Z[i] = [];
      for (let j = 0; j < s.length; j++) {
        X[i][j] = p[0] + s[j] * t1[0] + t[i] * t2[0];
        Y[i][j] = p[1] + s[j] * t1[1] + t[i] * t2[1];
        Z[i][j] = p[2] + s[j] * t1[2] + t[i] * t2[2];
      }
    }

    const lineInt = [[-2, 0, 1], [4, 2, 3]];
    const linePar = [[-2, 2, 0], [4, 8, 6]];
    const resInt = intersecao_reta_plano(lineInt[0], lineInt[1], plane);
    const resPar = intersecao_reta_plano(linePar[0], linePar[1], plane);

    const traces2 = [
      {
        type: "surface",
        x: X, y: Y, z: Z,
        opacity: 0.55,
        showscale: false,
        colorscale: [[0, "lightblue"], [1, "lightblue"]],
        scene: "scene"
      },
      {
        type: "scatter3d",
        mode: "lines",
        x: [lineInt[0][0], lineInt[1][0]],
        y: [lineInt[0][1], lineInt[1][1]],
        z: [lineInt[0][2], lineInt[1][2]],
        line: { color: "crimson", width: 7 },
        scene: "scene"
      },
      {
        type: "scatter3d",
        mode: "markers",
        x: [resInt.point[0]],
        y: [resInt.point[1]],
        z: [resInt.point[2]],
        marker: { size: 6, color: "black" },
        scene: "scene"
      },

      {
        type: "surface",
        x: X, y: Y, z: Z,
        opacity: 0.55,
        showscale: false,
        colorscale: [[0, "lightblue"], [1, "lightblue"]],
        scene: "scene2"
      },
      {
        type: "scatter3d",
        mode: "lines",
        x: [linePar[0][0], linePar[1][0]],
        y: [linePar[0][1], linePar[1][1]],
        z: [linePar[0][2], linePar[1][2]],
        line: { color: "darkorange", width: 7 },
        scene: "scene2"
      },

      {
        type: "surface",
        x: X, y: Y, z: Z,
        opacity: 0.45,
        showscale: false,
        colorscale: [[0, "lightblue"], [1, "lightblue"]],
        scene: "scene3"
      },
      {
        type: "cone",
        x: [p[0]],
        y: [p[1]],
        z: [p[2]],
        u: [n[0]],
        v: [n[1]],
        w: [n[2]],
        sizemode: "absolute",
        sizeref: 0.8,
        anchor: "tail",
        showscale: false,
        colorscale: "Viridis",
        scene: "scene3"
      },

      {
        type: "surface",
        x: X, y: Y, z: Z,
        opacity: 0.45,
        showscale: false,
        colorscale: [[0, "lightblue"], [1, "lightblue"]],
        scene: "scene4"
      },
      {
        type: "scatter3d",
        mode: "markers+text",
        x: [resInt.point[0]],
        y: [resInt.point[1]],
        z: [resInt.point[2]],
        text: ["P"],
        textposition: "top center",
        marker: { size: 7, color: "black" },
        scene: "scene4"
      }
    ];

    const layout3 = {
      title: "Geometria 3D: plano, reta, normal e ponto de interseção",
      height: 900,
      width: 1200,
      margin: { l: 0, r: 0, b: 0, t: 60 },
      showlegend: false,
      grid: { rows: 2, columns: 2, pattern: "independent" },
      scene:  { domain: { row: 0, column: 0 }, aspectmode: "cube", title: { text: "Plano + reta secante" } },
      scene2: { domain: { row: 0, column: 1 }, aspectmode: "cube", title: { text: "Plano + reta paralela" } },
      scene3: { domain: { row: 1, column: 0 }, aspectmode: "cube", title: { text: "Vetor normal" } },
      scene4: { domain: { row: 1, column: 1 }, aspectmode: "cube", title: { text: "Ponto de interseção" } }
    };

    Plotly.newPlot("plot", traces2, layout3);