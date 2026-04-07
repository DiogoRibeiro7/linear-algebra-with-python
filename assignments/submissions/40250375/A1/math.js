const output = document.getElementById("output");

function show(title, content) {
    const div = document.createElement("div");
    div.className = "box";
    div.innerHTML = `<h3>${title}</h3>${content}`;
    output.appendChild(div);
}

// criar matrizes
function zeros(m, n) {
    return Array.from({ length: m }, () => Array(n).fill(0));
}

function identity(n) {
    let A = zeros(n, n);
    for (let i = 0; i < n; i++) A[i][i] = 1;
    return A;
}

function diagonal(arr) {
    let n = arr.length;
    let A = zeros(n, n);
    for (let i = 0; i < n; i++) A[i][i] = arr[i];
    return A;
}

function transpose(A) {
    return A[0].map((_, i) => A.map(row => row[i]));
}

function add(A, B) {
    if (A.length !== B.length || A[0].length !== B[0].length) {
        throw "Dimensões incompatíveis";
    }
    return A.map((row, i) =>
        row.map((val, j) => val + B[i][j])
    );
}

function multiply(A, B) {
    if (A[0].length !== B.length) {
        throw "Dimensões incompatíveis para multiplicação";
    }

    let result = zeros(A.length, B[0].length);

    for (let i = 0; i < A.length; i++) {
        for (let j = 0; j < B[0].length; j++) {
            for (let k = 0; k < B.length; k++) {
                result[i][j] += A[i][k] * B[k][j];
            }
        }
    }

    return result;
}

// mostrar matriz
function matrixToHTML(A) {
    let html = "<table>";
    A.forEach(row => {
        html += "<tr>";
        row.forEach(val => {
            html += `<td>${val}</td>`;
        });
        html += "</tr>";
    });
    html += "</table>";
    return html;
}

/////////////////////////////////////////////////
// T1
/////////////////////////////////////////////////

const zero = zeros(3, 4);
const identidade = identity(4);
const diag = diagonal([2, 5, -1]);

const upper = [
    [1, 2, 3],
    [0, 4, 5],
    [0, 0, 6]
];

const lower = [
    [1, 0, 0],
    [2, 3, 0],
    [4, 5, 6]
];

const M = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
];

const simetrica = add(M, transpose(M));

const matrizes = { zero, identidade, diag, upper, lower, simetrica };

for (let nome in matrizes) {
    show(nome, matrixToHTML(matrizes[nome]));
}

/////////////////////////////////////////////////
// T2
/////////////////////////////////////////////////

for (let nome in matrizes) {
    let A = matrizes[nome];

    let m = A.length;
    let n = A[0].length;

    let elemento = (A[1] && A[1][2] !== undefined) ? A[1][2] : "N/A";

    show(
        "Info: " + nome,
        `Dimensão: ${m} x ${n}<br>Elemento (2,3): ${elemento}`
    );
}

/////////////////////////////////////////////////
// T3
/////////////////////////////////////////////////

function classificar(A) {
    let m = A.length;
    let n = A[0].length;
    let tipos = [];

    if (m === n) tipos.push("square");
    else tipos.push("rectangular");

    // zero
    if (A.every(row => row.every(v => v === 0))) {
        tipos.push("zero");
    }

    // identity
    if (m === n && A.every((row, i) =>
        row.every((v, j) => (i === j ? v === 1 : v === 0))
    )) {
        tipos.push("identity");
    }

    // diagonal
    if (m === n && A.every((row, i) =>
        row.every((v, j) => (i !== j ? v === 0 : true))
    )) {
        tipos.push("diagonal");
    }

    // symmetric
    if (m === n) {
        let T = transpose(A);
        let igual = JSON.stringify(A) === JSON.stringify(T);
        if (igual) tipos.push("symmetric");
    }

    // triangular
    let upper = true;
    let lower = true;

    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (i > j && A[i][j] !== 0) upper = false;
            if (i < j && A[i][j] !== 0) lower = false;
        }
    }

    if (upper) tipos.push("upper_triangular");
    if (lower) tipos.push("lower_triangular");

    return tipos;
}

for (let nome in matrizes) {
    show(
        "Classificação: " + nome,
        classificar(matrizes[nome]).join(", ")
    );
}

/////////////////////////////////////////////////
// T4
/////////////////////////////////////////////////

try {
    add(zeros(2, 3), zeros(4, 2));
} catch (e) {
    show("Erro soma", `<span class="error">${e}</span>`);
}

try {
    multiply(zeros(2, 3), zeros(4, 2));
} catch (e) {
    show("Erro multiplicação", `<span class="error">${e}</span>`);
}