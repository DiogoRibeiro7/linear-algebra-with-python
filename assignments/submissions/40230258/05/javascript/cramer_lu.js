/*For LU decomp osition, implement your own or use the numeric.js library
(numeric.LU(A)). For Cramer, use math.det combined with column replacement. For
b enchmarking, use performance.now() (browser) or process.hrtime.bigint() (No de.js).
For heatmaps, use Plotly.js with type: 'heatmap' and text annotations.
*/

//ex1

let M2x2 = [[2, 1], [5, 3]];
let b2x2 = [8, 19];

let M3x3 = [[2, 1, 3], [5, 3, 2], [1, 4, 6]];
let b3x3 = [8, 19, 10];


function cramer_2x2(A,b){
    let det = A[0][0] * A[1][1] - A[0][1] * A[1][0]
    let det_x = b[0] * A[1][1] - A[0][1] * b[1]
    let det_y = A[0][0] * b[1] - b[0] * A[1][0]
    return [det_x/det, det_y/det]
}


function cramer_3x3(A,b){
    let det = A[0][0] * (A[1][1] * A[2][2] - A[1][2] * A[2][1]) - A[0][1] * (A[1][0] * A[2][2] - A[1][2] * A[2][0]) + A[0][2] * (A[1][0] * A[2][1] - A[1][1] * A[2][0])
    let det_x = b[0] * (A[1][1] * A[2][2] - A[1][2] * A[2][1]) - A[0][1] * (b[1] * A[2][2] - A[1][2] * b[2]) + A[0][2] * (b[1] * A[2][1] - A[1][1] * b[2])
    let det_y = A[0][0] * (b[1] * A[2][2] - A[1][2] * b[2]) - b[0] * (A[1][0] * A[2][2] - A[1][2] * A[2][0]) + A[0][2] * (A[1][0] * b[2] - b[1] * A[2][0])
    let det_z = A[0][0] * (A[1][1] * b[2] - b[1] * A[2][1]) - A[0][1] * (A[1][0] * b[2] - b[1] * A[2][0]) + b[0] * (A[1][0] * A[2][1] - A[1][1] * A[2][0])
    return [det_x/det, det_y/det, det_z/det]
}

console.log('----Exercise 1----')
console.log(cramer_2x2(M2x2, b2x2))
console.log(cramer_3x3(M3x3, b3x3))
console.log(math.lusolve(M2x2, b2x2))
console.log(math.lusolve(M3x3, b3x3))

//ex2

let M = [[2, 1, 3], [5, 3, 2], [1, 4, 6]]

let lu = math.lup(M)

const P = lu.p.map((rowIndex) =>
  lu.p.map((_, j) => (rowIndex === j ? 1 : 0))
)

console.log('----Exercise 2----')
console.log("P =", P)
console.log("L =", lu.L)
console.log("U =", lu.U)
console.log("PA =", math.multiply(P, M))
console.log("LU =", math.multiply(lu.L, lu.U))
console.log("det(A) = ", lu.U[0][0] * lu.U[1][1] * lu.U[2][2])

//ex3

function cramerSolve(A, b) {
    const n = A.length
    const detA = math.det(A)
    if (Math.abs(detA) < 1e-12) {
        throw new Error('Matrix is singular or nearly singular')
    }
    const x = []
    for (let j = 0; j < n; j++) {
        const B = A.map((row, i) => row.map((value, k) => (k === j ? b[i] : value)))
        x.push(math.det(B) / detA)
    }
    return x
}

function gaussSolve(A, b) {
    const n = A.length
    const M = A.map(row => row.slice())
    const y = b.slice()
    const x = new Array(n).fill(0)

    for (let k = 0; k < n; k++) {
        let maxRow = k
        let maxVal = Math.abs(M[k][k])
        for (let i = k + 1; i < n; i++) {
            const absVal = Math.abs(M[i][k])
            if (absVal > maxVal) {
                maxVal = absVal
                maxRow = i
            }
        }

        if (maxVal === 0) {
            throw new Error('Matrix is singular or nearly singular')
        }

        if (maxRow !== k) {
            [M[k], M[maxRow]] = [M[maxRow], M[k]]
            [y[k], y[maxRow]] = [y[maxRow], y[k]]
        }

        const pivot = M[k][k]
        for (let i = k + 1; i < n; i++) {
            const factor = M[i][k] / pivot
            for (let j = k; j < n; j++) {
                M[i][j] -= factor * M[k][j]
            }
            y[i] -= factor * y[k]
        }
    }

    for (let i = n - 1; i >= 0; i--) {
        let sum = y[i]
        for (let j = i + 1; j < n; j++) {
            sum -= M[i][j] * x[j]
        }
        x[i] = sum / M[i][i]
    }

    return x
}

function timeFunction(fn) {
    const start = performance.now()
    const result = fn()
    const duration = performance.now() - start
    return { result, duration }
}

function runBenchmarks() {
    const sizes = [2, 3, 5, 10, 20, 50, 100]
    const results = []

    for (const n of sizes) {
        const A = math.random([n, n], 1, 10)
        const b = math.random([n], 1, 10)

        let cramerTime = null
        try {
            cramerTime = timeFunction(() => cramerSolve(A, b)).duration
        } catch (error) {
            cramerTime = NaN
        }

        const gaussTime = timeFunction(() => gaussSolve(A, b)).duration
        const builtInTime = timeFunction(() => math.lusolve(A, b)).duration

        results.push({ n, cramerTime, gaussTime, builtInTime })
    }

    return results
}

function createBenchmarkTable(results) {
    const tableData = {
        type: 'table',
        header: {
            values: ['<b>n</b>', '<b>Cramer (ms)</b>', '<b>Gauss (ms)</b>', '<b>Built-in (ms)</b>'],
            align: 'center',
            line: { width: 1, color: 'black' },
            fill: { color: '#f2f2f2' },
            font: { family: 'Arial', size: 12, color: 'black' }
        },
        cells: {
            values: [
                results.map(r => r.n),
                results.map(r => Number(r.cramerTime.toFixed(3))),
                results.map(r => Number(r.gaussTime.toFixed(3))),
                results.map(r => Number(r.builtInTime.toFixed(3)))
            ],
            align: 'center',
            line: { color: 'black', width: 1 },
            fill: { color: ['#ffffff', '#f9f9ff', '#ffffff', '#f9f9ff'] },
            font: { family: 'Arial', size: 11, color: 'black' }
        }
    }

    Plotly.newPlot('benchmark-table', [tableData], { margin: { t: 20, b: 20 } })
}

function createBenchmarkChart(results) {
    const x = results.map(r => r.n)
    const traceCramer = {
        x,
        y: results.map(r => r.cramerTime),
        name: 'Cramer',
        type: 'bar'
    }
    const traceGauss = {
        x,
        y: results.map(r => r.gaussTime),
        name: 'Gauss',
        type: 'bar'
    }
    const traceBuiltIn = {
        x,
        y: results.map(r => r.builtInTime),
        name: 'Built-in',
        type: 'bar'
    }

    const layout = {
        title: 'Solver benchmark: Cramer vs Gauss vs built-in',
        xaxis: { title: 'Matrix size n' },
        yaxis: { title: 'Time (ms)', type: 'log' },
        barmode: 'group',
        margin: { t: 40, b: 50 }
    }

    Plotly.newPlot('benchmark-plot', [traceCramer, traceGauss, traceBuiltIn], layout)
}

function renderBenchmarks() {
    const results = runBenchmarks()
    createBenchmarkTable(results)
    createBenchmarkChart(results)
}

renderBenchmarks()

//ex4 

/*Given a fixed matrix A and three different
right-hand sides b1, b2, b3, solve all three using a single LU fac-
torization. Compare the total time with solving each from
scratch.*/

let A = [[2, 1, 3], [5, 3, 2], [1, 4, 6]]
let b1 = [8, 19, 10]
let b2 = [7, 18, 9]
let b3 = [6, 17, 8]

function permuteVector(p, b) {
    return p.map(i => b[i])
}

function forwardSubstitution(L, b) {
    const n = L.length
    const y = new Array(n)
    for (let i = 0; i < n; i++) {
        let sum = 0
        for (let j = 0; j < i; j++) {
            sum += L[i][j] * y[j]
        }
        y[i] = b[i] - sum
    }
    return y
}

function backSubstitution(U, y) {
    const n = U.length
    const x = new Array(n)
    for (let i = n - 1; i >= 0; i--) {
        let sum = 0
        for (let j = i + 1; j < n; j++) {
            sum += U[i][j] * x[j]
        }
        x[i] = (y[i] - sum) / U[i][i]
    }
    return x
}

function solveWithLuFactors(lu, b) {
    const Pb = permuteVector(lu.p, b)
    const y = forwardSubstitution(lu.L, Pb)
    return backSubstitution(lu.U, y)
}

function ex4() {
    const B = [b1, b2, b3]
    const factorResult = timeFunction(() => math.lup(A))
    const luFactors = factorResult.result
    const factorTime = factorResult.duration

    const solveSameLUTotal = timeFunction(() => B.map(b => solveWithLuFactors(luFactors, b))).duration
    const sameLUSolutions = B.map(b => solveWithLuFactors(luFactors, b))

    let scratchTotal = 0
    const scratchSolutions = []
    for (const b of B) {
        const { result, duration } = timeFunction(() => math.lusolve(A, b))
        scratchSolutions.push(result)
        scratchTotal += duration
    }

    console.log('----Ex 4----')
    console.log('Matrix A:', A)
    console.log('b1:', b1)
    console.log('b2:', b2)
    console.log('b3:', b3)
    console.log('LU time (ms):', factorTime.toFixed(4))
    console.log('Solve all three with one LU time (ms):', solveSameLUTotal.toFixed(4))
    console.log('Solutions using one LU:', sameLUSolutions)
    console.log('Solve each from scratch total time (ms):', scratchTotal.toFixed(4))
    console.log('Solutions from scratch:', scratchSolutions)
}

ex4()

//ex5

function toArray(M) {
    if (Array.isArray(M)) return M
    if (M && typeof M.valueOf === 'function') return M.valueOf()
    return M
}

function createHeatmap(divId, M, title) {
    const mat = toArray(M)
    const n = mat.length
    const m = mat[0].length

    let min = Infinity, max = -Infinity
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < m; j++) {
            const v = Number(mat[i][j])
            if (!isFinite(v)) continue
            if (v < min) min = v
            if (v > max) max = v
        }
    }
    const threshold = (min + max) / 2

    const annotations = []
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < m; j++) {
            const v = Number(mat[i][j])
            annotations.push({
                x: j,
                y: i,
                xref: 'x',
                yref: 'y',
                text: (isFinite(v) ? v.toFixed(2) : ''),
                showarrow: false,
                font: { color: v > threshold ? 'white' : 'black', size: 12 }
            })
        }
    }

    const data = [{
        z: mat,
        type: 'heatmap',
        colorscale: 'YlGnBu',
        showscale: true,
        hoverinfo: 'z'
    }]

    const layout = {
        title,
        xaxis: { showgrid: false, zeroline: false, ticks: '', showticklabels: false },
        yaxis: { autorange: 'reversed', showgrid: false, zeroline: false, ticks: '', showticklabels: false },
        annotations,
        margin: { t: 40, l: 40, r: 40, b: 40 }
    }

    Plotly.newPlot(divId, data, layout, {displayModeBar: false})
}

function renderHeatmaps() {
    // use matrices A, and lu from earlier examples
    try {
        createHeatmap('heatmap-A', A, 'Matrix A')
        createHeatmap('heatmap-L', lu.L, 'Matrix L')
        createHeatmap('heatmap-U', lu.U, 'Matrix U')
    } catch (err) {
        console.warn('Could not render heatmaps:', err)
    }
}

renderHeatmaps()




