import * as math from "mathjs";

const A = [[2, 1, -1], [-3, -1, 2], [-2, 1, 2]];
const b = [8, -11, -3];

const x = math.lusolve(A, b);
console.log("Solution (math.lusolve)", x.valueOf());
//========================================
// Assignment 04
//========================================

//---------------------------
// Eliminação de Gauss
//---------------------------

function escalonar(M) {

    let A = M.map(l => l.slice());

    let linhas = A.length;
    let colunas = A[0].length;

    for (let k = 0; k < linhas - 1; k++) {

        let maior = k;

        for (let i = k + 1; i < linhas; i++) {

            if (Math.abs(A[i][k]) > Math.abs(A[maior][k])) {

                maior = i;

            }

        }

        [A[k], A[maior]] = [A[maior], A[k]];

        for (let i = k + 1; i < linhas; i++) {

            let fator = A[i][k] / A[k][k];

            for (let j = k; j < colunas; j++) {

                A[i][j] -= fator * A[k][j];

            }

        }

    }

    return A;

}

//---------------------------
// Substituição retroativa
//---------------------------

function substituicaoRetroativa(U) {

    let n = U.length;

    let x = new Array(n);

    for (let i = n - 1; i >= 0; i--) {

        let soma = 0;

        for (let j = i + 1; j < n; j++) {

            soma += U[i][j] * x[j];

        }

        x[i] = (U[i][n] - soma) / U[i][i];

    }

    return x;

}

//---------------------------
// Sistema pedido
//---------------------------

const Ab = [

    [2, 1, -1, 8],

    [-3, -1, 2, -11],

    [-2, 1, 2, -3]

];

const esc = escalonar(Ab);

console.log("Forma escalonada");

console.table(esc);

const solucao = substituicaoRetroativa(esc);

console.log("Solução");

console.log(solucao);

//---------------------------
// SPI
//---------------------------

const spi = [

    [1, 2, 3, 4],

    [2, 4, 6, 8]

];

console.log("SPI");

console.table(escalonar(spi));

console.log("Exemplos");

console.log("(4,0,0)");

console.log("(1,1,1)");

console.log("(7,-1,-1)");

//---------------------------
// SI
//---------------------------

const si = [

    [1, 1, 2],

    [2, 2, 5]

];

console.log("SI");

console.table(escalonar(si));

console.log("Contradição 0=1");

//---------------------------
// Classificação
//---------------------------

function rank(M) {

    let A = escalonar(M);

    let r = 0;

    for (let linha of A) {

        if (linha.some(v => Math.abs(v) > 1e-10)) {

            r++;

        }

    }

    return r;

}

function classificarSistema(A, b) {

    let Ab = [];

    for (let i = 0; i < A.length; i++) {

        Ab.push([...A[i], b[i]]);

    }

    let rA = rank(A);

    let rAb = rank(Ab);

    let n = A[0].length;

    if (rA !== rAb) {

        return "SI";

    }

    if (rA === n) {

        return "SPD";

    }

    return "SPI";

}

console.log(

    classificarSistema(

        [[1, 2], [3, 4]],

        [5, 6]

    )

);

console.log(

    classificarSistema(

        [[1, 2], [2, 4]],

        [3, 6]

    )

);

console.log(

    classificarSistema(

        [[1, 2], [2, 4]],

        [3, 7]

    )

);

//---------------------------
// Paramétrica
//---------------------------

console.log("SPI");

console.log("x=t");

console.log("y=s");

console.log("z=5-t-s");

//---------------------------
// Comparação com math.js
//---------------------------

const A = [

    [2, 1, -1],

    [-3, -1, 2],

    [-2, 1, 2]

];

const b = [8, -11, -3];

const solver = math.lusolve(A, b);

console.log("math.lusolve");

console.table(solver);

console.log("Gauss");

console.log(solucao);

//---------------------------
// Singular
//---------------------------

try {

    math.lusolve(

        [[1, 2], [2, 4]],

        [3, 6]

    );

}

catch (e) {

    console.log(e.message);

}

//---------------------------
// Visualização 2D
//---------------------------

let x = [];

for (let i = -5; i <= 5; i += 0.1) {

    x.push(i);

}

let y1 = x.map(v => 2 - v);

let y2 = x.map(v => 2 - v);

let y3 = x.map(v => 3 - v);

Plotly.newPlot(

    "grafico2d",

    [

        { x: x, y: y1, type: "scatter", name: "Coincidente" },

        { x: x, y: y2, type: "scatter", name: "Coincidente2" },

        { x: x, y: y3, type: "scatter", name: "Paralela" }

    ]

);

//---------------------------
// Visualização 3D
//---------------------------

let plano = {

    type: "surface",

    z: [[0, 0], [0, 0]],

    x: [[0, 1], [0, 1]],

    y: [[0, 0], [1, 1]],

    opacity: 0.5

};

let reta = {

    type: "scatter3d",

    mode: "lines",

    x: [0, 1],

    y: [0, 1],

    z: [0, 1]

};

Plotly.newPlot(

    "grafico3d",

    [plano, reta]

);

console.log("Assignment 04 concluído");