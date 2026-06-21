import * as math from "mathjs";

const v1 = [1, 2, 3];
const v2 = [2, 4, 6];
const cross = math.cross(v1, v2);
console.log("Cross (parallel -> zero)", cross);

const n = [0, 0, 1];
const lineDir = [1, 1, 0];
console.log("Line parallel to plane?", math.dot(n, lineDir) === 0);
//=====================================
// ASSIGNMENT 06
//=====================================

//-------------------------------------
// T1 - Retas 2D
//-------------------------------------

function posicao_relativa_retas_2d(m1, b1, m2, b2) {

    if (m1 === m2) {

        if (b1 === b2) {

            return "Coincidentes";

        }

        return "Paralelas";

    }

    return "Secantes";

}

console.log(posicao_relativa_retas_2d(1, 2, -1, 1));

console.log(posicao_relativa_retas_2d(2, 1, 2, 3));

console.log(posicao_relativa_retas_2d(3, 1, 3, 1));

//-------------------------------------
// T2 - Retas 3D
//-------------------------------------

function posicao_relativa_retas_3d(p1, v1, p2, v2) {

    let cruz = math.cross(v1, v2);

    let norma = math.norm(cruz);

    if (norma < 1e-10) {

        let diff = math.subtract(p2, p1);

        if (math.norm(math.cross(diff, v1)) < 1e-10) {

            return "Coincidentes";

        }

        return "Paralelas";

    }

    return "Secantes ou Reversas";

}

console.log(

    posicao_relativa_retas_3d(

        [0, 0, 0],

        [1, 1, 1],

        [1, 0, 0],

        [1, 1, 1]

    )

);

//-------------------------------------
// T3 - Plano cartesiano para paramétrico
//-------------------------------------

function plano_cartesiano_para_parametrico(a, b, c, d) {

    let ponto = [0, 0, d / c];

    let v1 = [1, 0, -a / c];

    let v2 = [0, 1, -b / c];

    return {

        ponto,

        v1,

        v2

    };

}

console.log(

    plano_cartesiano_para_parametrico(

        1,

        2,

        3,

        6

    )

);

//-------------------------------------
// T4 - Classificação de planos
//-------------------------------------

function posicao_relativa_planos(n1, d1, n2, d2) {

    let cruz = math.cross(n1, n2);

    if (math.norm(cruz) < 1e-10) {

        let razao = n1[0] / n2[0];

        if (

            Math.abs(d1 - razao * d2) < 1e-10

        ) {

            return "Coincidentes";

        }

        return "Paralelos";

    }

    return "Secantes";

}

console.log(

    posicao_relativa_planos(

        [1, 2, 3],

        6,

        [2, 4, 6],

        12

    )

);

//-------------------------------------
// T5 - Interseção reta-plano
//-------------------------------------

function intersecao_reta_plano(P, V, n, d) {

    let num = d - math.dot(n, P);

    let den = math.dot(n, V);

    if (Math.abs(den) < 1e-10) {

        if (Math.abs(num) < 1e-10) {

            return "Reta contida";

        }

        return "Paralela";

    }

    let t = num / den;

    return math.add(P, math.multiply(t, V));

}

console.log(

    intersecao_reta_plano(

        [0, 0, 0],

        [1, 1, 1],

        [0, 0, 1],

        2

    )

);

//-------------------------------------
// T6 - Produto escalar
//-------------------------------------

const reta1 = [1, 0, 0];

const reta2 = [0, 1, 0];

console.log(

    "Perpendiculares:",

    math.dot(reta1, reta2) == 0

);

const planoNormal = [0, 0, 1];

const retaParalela = [1, 1, 0];

console.log(

    "Reta paralela ao plano:",

    math.dot(planoNormal, retaParalela) == 0

);

const plano1 = [1, 0, 0];

const plano2 = [0, 1, 0];

console.log(

    "Planos perpendiculares:",

    math.dot(plano1, plano2) == 0

);

//-------------------------------------
// T7 - Visualização 3D
//-------------------------------------

let plano = {

    type: "surface",

    x: [[0, 1], [0, 1]],

    y: [[0, 0], [1, 1]],

    z: [[0, 0], [0, 0]],

    opacity: 0.5,

    showscale: false

};

let retaIntersecta = {

    type: "scatter3d",

    mode: "lines",

    x: [0, 1],

    y: [0, 1],

    z: [-1, 1],

    name: "Reta"

};

let retaParalela = {

    type: "scatter3d",

    mode: "lines",

    x: [0, 1],

    y: [0, 1],

    z: [2, 2],

    name: "Paralela"

};

let normal = {

    type: "scatter3d",

    mode: "lines",

    x: [0, 0],

    y: [0, 0],

    z: [0, 1],

    name: "Normal"

};

let ponto = {

    type: "scatter3d",

    mode: "markers",

    x: [0.5],

    y: [0.5],

    z: [0],

    name: "Interseção"

};

Plotly.newPlot(

    "grafico3d",

    [

        plano,

        retaIntersecta,

        retaParalela,

        normal,

        ponto

    ]

);

//-------------------------------------
// T1 - Visualização 2D
//-------------------------------------

let x = [];

for (let i = -5; i <= 5; i += 0.1) {

    x.push(i);

}

let y1 = x.map(v => v);

let y2 = x.map(v => v + 2);

let y3 = x.map(v => -v + 1);

Plotly.newPlot(

    "grafico2d",

    [

        {

            x: x,

            y: y1,

            type: "scatter",

            name: "Coincidente"

        },

        {

            x: x,

            y: y1,

            type: "scatter",

            name: "Coincidente 2"

        },

        {

            x: x,

            y: y2,

            type: "scatter",

            name: "Paralela"

        },

        {

            x: x,

            y: y3,

            type: "scatter",

            name: "Secante"

        }

    ]

);

console.log("Assignment 06 concluído.");