// ex1
let Ab = [[2, 1, -1, 8], [-3, -1, 2, -11], [-2, 1, 2, -3]];


function escalonar(Ab, isAugmented = true) {
    let A = Ab.map(row => row.slice());
    let m = A.length;
    let n = A[0].length;
    let lastCol = isAugmented ? n - 1 : n;
    let log = [];

    let pivotRow = 0;
    for (let pivotCol = 0; pivotCol < lastCol && pivotRow < m; pivotCol++) {
        let maxRow = pivotRow;
        while (maxRow < m && Math.abs(A[maxRow][pivotCol]) < 1e-12) {
            maxRow++;
        }
        if (maxRow === m) {
            continue;
        }

        if (maxRow !== pivotRow) {
            [A[pivotRow], A[maxRow]] = [A[maxRow], A[pivotRow]];
            log.push(`R${pivotRow + 1} <-> R${maxRow + 1}`);
        }

        for (let row = pivotRow + 1; row < m; row++) {
            let factor = A[row][pivotCol] / A[pivotRow][pivotCol];
            if (Math.abs(factor) < 1e-12) {
                continue;
            }
            for (let col = pivotCol; col < n; col++) {
                A[row][col] -= factor * A[pivotRow][col];
                if (Math.abs(A[row][col]) < 1e-12) {
                    A[row][col] = 0;
                }
            }
            log.push(`R${row + 1} <- R${row + 1} - (${factor.toFixed(6)}) R${pivotRow + 1}`);
        }

        pivotRow++;
    }

    return { U: A, log };
}

function substituicao_retroativa(U, b) {
    let m = U.length;
    let x = Array(m).fill(0);

    for (let i = m - 1; i >= 0; i--) {
        let pivot = U[i][i];
        if (Math.abs(pivot) < 1e-12) {
            throw new Error(`Pivot at row ${i + 1} is zero, cannot do back substitution.`);
        }

        let sum = 0;
        for (let j = i + 1; j < m; j++) {
            sum += U[i][j] * x[j];
        }

        x[i] = (b[i] - sum) / pivot;
    }

    return x;
}

function classificar_sistema(A, b) {
    let { U: UA } = escalonar(A.map(row => row.slice()), false);
    let rankA = UA.reduce((count, row) => count + (!(row.every(value => Math.abs(value) < 1e-12)) ? 1 : 0), 0);

    let augmented = A.map((row, i) => row.concat([b[i]]));
    let { U: UAb } = escalonar(augmented.map(row => row.slice()), false);
    let rankAb = UAb.reduce((count, row) => count + (!(row.every(value => Math.abs(value) < 1e-12)) ? 1 : 0), 0);

    if (rankA !== rankAb) {
        return 'SI';
    }
    if (rankA < A[0].length) {
        return 'SPI';
    }
    return 'SPD';
}

console.log('---Ex 1---');
console.log('Matriz aumentada original:');
console.log(Ab);
let { U, log } = escalonar(Ab, true);
console.log('Matriz em forma de escada:');
console.log(U);
console.log('Log de operações:');
log.forEach(op => console.log(op));
let b1 = U.map(row => row[row.length - 1]);
let solution1 = substituicao_retroativa(U, b1);
console.log('Solução:');
console.log(solution1);


console.log('---Ex 2---');
let A2 = [[1, 2, -1], [2, 4, -2]];
let b2 = [3, 6];
let { U: U2, log: log2 } = escalonar(A2.map((row, i) => row.concat([b2[i]])), true);
console.log(U2);
console.log('Operações:');
log2.forEach(op => console.log(op));
console.log('Soluções:');
let solutions2 = [
    [3, 0, 0],
    [1, 1, 0],
    [4, 0, 1]
];
solutions2.forEach(sol => console.log(sol));

console.log('---Ex 3---');
let A3 = [[1, 1], [2, 2]];
let b3 = [1, 3];
let { U: U3 } = escalonar(A3.map((row, i) => row.concat([b3[i]])), true);
console.log('Sistema impossível:');
console.log(U3);
if (U3[1].slice(0, -1).every(value => Math.abs(value) < 1e-12) && Math.abs(U3[1][U3[1].length - 1]) > 1e-9) {
    console.log('A segunda linha se reduz a 0 = não-zero. O sistema não tem solução.');
}
console.log('Geometricamente, as duas retas são paralelas e não se interceptam.');

console.log('---Ex 4---');
let tests4 = [
    {
        name: '2x2 SPD',
        A: [[1, 2], [3, 4]],
        b: [5, 11]
    },
    {
        name: '2x3 SPI',
        A: [[1, 2, 3], [2, 4, 6]],
        b: [6, 12]
    },
    {
        name: '2x2 SI',
        A: [[1, 2], [2, 4]],
        b: [3, 7]
    },
    {
        name: '3x3 SPD',
        A: [[2, -1, 0], [1, 2, 1], [0, 1, 2]],
        b: [1, 4, 5]
    },
    {
        name: '4x4 SI',
        A: [[1, 0, 0, 0], [0, 1, 0, 0], [0, 0, 1, 0], [1, 0, 0, 0]],
        b: [1, 2, 3, 2]
    }
];

tests4.forEach(test => {
    let classification = classificar_sistema(test.A, test.b);
    console.log(`${test.name}: ${classification}`);
});

console.log('---Ex 5---');
let A5 = [[1, 1, 1], [0, 1, 1]];
let b5 = [3, 1];
console.log('SPI com 3 incógnitas e 2 equações:');
console.log('Sistema: x + y + z = 3, y + z = 1');
console.log('Solução paramétrica geral: x = 2, y = 1 - t, z = t');
let paramSolutions5 = [
    [2, 1, 0],
    [2, 0, 1],
    [2, 2, -1]
];
paramSolutions5.forEach(sol => {
    let valid = A5.every((row, i) => {
        let value = row.reduce((sum, aij, j) => sum + aij * sol[j], 0);
        return Math.abs(value - b5[i]) < 1e-9;
    });
    console.log(`Solução ${sol}: ${valid ? 'válida' : 'inválida'}`);
});

console.log('---Ex 6---');
let A6 = [[2, 1, -1], [1, 2, 1], [1, -1, 2]];
let b6 = [3, 4, 5];
let augmented6 = A6.map((row, i) => row.concat([b6[i]]));
let { U: U6 } = escalonar(augmented6, true);
let transformedB6 = U6.map(row => row[row.length - 1]);
let gauss6 = substituicao_retroativa(U6, transformedB6);
let built6;
try {
    built6 = math.lusolve(A6, b6).map(row => row[0]);
    console.log('Gauss result:', gauss6);
    console.log('Built-in solver result:', built6);
} catch (error) {
    console.log('Erro ao usar solver embutido no SPD:', error.message);
}

let A6_singular = [[1, 2, 3], [2, 4, 6], [1, 1, 1]];
let b6_singular = [6, 12, 3];
console.log('Sistema singular consistente:');
console.log('Classificação:', classificar_sistema(A6_singular, b6_singular));
try {
    let builtSingular = math.lusolve(A6_singular, b6_singular).map(row => row[0]);
    console.log('Solver embutido retornou:', builtSingular);
} catch (error) {
    console.log('Solver embutido falha em matriz singular:', error.message);
}

console.log('---Ex 7---');
function create2DVisualization() {
    let x = [-2, -1, 0, 1, 2, 3];
    let traces = [
        {
            x,
            y: x.map(v => -v + 2),
            name: 'Única - linha 1',
            line: { color: 'blue' }
        },
        {
            x,
            y: x.map(v => 0.5 * v + 0.5),
            name: 'Única - linha 2',
            line: { color: 'blue', dash: 'dash' }
        },
        {
            x,
            y: x.map(v => v + 1),
            name: 'Infinitas - linha 1',
            line: { color: 'green' }
        },
        {
            x,
            y: x.map(v => v + 1),
            name: 'Infinitas - linha 2',
            line: { color: 'green', dash: 'dash' }
        },
        {
            x,
            y: x.map(v => v + 2),
            name: 'Sem solução - linha 1',
            line: { color: 'red' }
        },
        {
            x,
            y: x.map(v => v + 3),
            name: 'Sem solução - linha 2',
            line: { color: 'red', dash: 'dash' }
        }
    ];
    let layout = {
        title: 'Sistemas 2D: única, infinita e sem solução',
        xaxis: { title: 'x' },
        yaxis: { title: 'y' },
        legend: { orientation: 'h', x: 0, y: 1.1 }
    };
    Plotly.newPlot('plot2d', traces, layout);
}

function buildZ(func) {
    let xs = [-2, -1, 0, 1, 2, 3];
    let ys = [-2, -1, 0, 1, 2, 3];
    return ys.map(y => xs.map(x => func(x, y)));
}

function create3DVisualization() {
    let traces = [
        {
            x: [-2, -1, 0, 1, 2, 3],
            y: [-2, -1, 0, 1, 2, 3],
            z: buildZ((x, y) => 3 - x - y),
            type: 'surface',
            opacity: 0.7,
            name: 'x + y + z = 3',
            colorscale: 'Viridis'
        },
        {
            x: [-2, -1, 0, 1, 2, 3],
            y: [-2, -1, 0, 1, 2, 3],
            z: buildZ((x, y) => (1 - x + y) / 1),
            type: 'surface',
            opacity: 0.7,
            name: 'x - y + z = 1',
            colorscale: 'Cividis'
        },
        {
            x: [-2, -1, 0, 1, 2, 3],
            y: [-2, -1, 0, 1, 2, 3],
            z: buildZ((x, y) => 2 * x + y - 2),
            type: 'surface',
            opacity: 0.7,
            name: '2x + y - z = 2',
            colorscale: 'Inferno'
        }
    ];
    let layout = {
        title: 'Interseção de três planos em 3D',
        scene: {
            xaxis: { title: 'x' },
            yaxis: { title: 'y' },
            zaxis: { title: 'z' }
        }
    };
    Plotly.newPlot('plot3d', traces, layout);
}

if (typeof Plotly !== 'undefined') {
    create2DVisualization();
    create3DVisualization();
}

