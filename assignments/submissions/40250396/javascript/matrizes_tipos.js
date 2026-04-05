// A01
//T1
const math = require("mathjs");

let mat_zero = math.zeros(3,4).toArray()
let mat_ident = math.identity(4).toArray()
let mat_diag = [
    [2, 0, 0],
    [0, 5, 0],
    [0, 0, -1]
]
const matriz_1 = [
    [1, 6, 7],
    [0, 2, 9],
    [0, 0, 3]
]
const matriz_2 = [
    [1, 0, 0],
    [1, 2, 0],
    [4, 4, 0]
]
const matriz_3 = [
    [1, 2, 5],
    [8, 2, 0],
    [3, 4, 7]
]
let mat_sim = math.matrix(math.add(matriz_3, math.transpose(matriz_3))).toArray()

// T1 - prints
console.log(mat_zero)
console.log(mat_ident)
console.log(mat_diag)
console.log(matriz_1)
console.log(matriz_2)
console.log(mat_sim)

// T2
console.log("Matriz de 0: " + mat_zero.length + " " + mat_zero[0].length + " " + mat_zero[2][3])
console.log("Matriz de identidade: " + mat_ident.length + " " + mat_ident[0].length + " " + mat_ident[2][3])
console.log("Matriz diagonal: " + mat_diag.length + "x" + mat_diag[0].length + " a[2][3]: fora dos limites")
console.log("Matriz triangular superior: " + matriz_1.length + "x" + matriz_1[0].length + " a[2][3]: fora dos limites")
console.log("Matriz triangular inferior: " + matriz_2.length + "x" + matriz_2[0].length + " a[2][3]: fora dos limites")
console.log("Matriz simetrica: " + mat_sim.length + "x" + mat_sim[0].length + " a[2][3]: fora dos limites")

// T3
function classificar_matrix(A) {
    const labels = []

    if (A.length === A[0].length) {
        labels.push("square")
    } else {
        labels.push("rectangular")
    }

    let isZero = true
    for (let i = 0; i < A.length; i++) {
        for (let j = 0; j < A[0].length; j++) {
            if (A[i][j] !== 0) {
                isZero = false
            }
        }
    }
    if (isZero) labels.push("zero")

    let isIdentity = true
    for (let i = 0; i < A.length; i++) {
        for (let j = 0; j < A[0].length; j++) {
            if (i === j && A[i][j] !== 1) {
                isIdentity = false
            }
            if (i !== j && A[i][j] !== 0) {
                isIdentity = false
            }
        }
    }
    if (isIdentity) labels.push("identity")

    let isDiagonal = true
    for (let i = 0; i < A.length; i++) {
        for (let j = 0; j < A[0].length; j++) {
            if (i !== j && A[i][j] !== 0) {
                isDiagonal = false
            }
        }
    }
    if (isDiagonal) labels.push("diagonal")

    let isSymmetric = false
    if (A.length === A[0].length) {
        isSymmetric = true
        for (let i = 0; i < A.length; i++) {
            for (let j = 0; j < A[0].length; j++) {
                if (A[i][j] !== A[j][i]) {
                    isSymmetric = false
                }
            }
        }
    }
    if (isSymmetric) labels.push("symmetric")

    let isUpper = true
    for (let i = 0; i < A.length; i++) {
        for (let j = 0; j < i; j++) {
            if (A[i][j] !== 0) {
                isUpper = false
            }
        }
    }
    if (isUpper) labels.push("upper_triangular")

    let isLower = true
    for (let i = 0; i < A.length; i++) {
        for (let j = i + 1; j < A[0].length; j++) {
            if (A[i][j] !== 0) {
                isLower = false
            }
        }
    }
    if (isLower) labels.push("lower_triangular")

    return labels
}

console.log(classificar_matrix(mat_zero))
console.log(classificar_matrix(mat_ident))
console.log(classificar_matrix(mat_diag))
console.log(classificar_matrix(matriz_1))
console.log(classificar_matrix(matriz_2))
console.log(classificar_matrix(mat_sim))

// T4
try {
    const a = [[1, 2, 3], [4, 5, 6]]
    const b = [[1, 2], [3, 4], [5, 6], [7, 8]]
    math.add(a, b)
} catch (e) {
    console.log("Erro adição: " + e.message)
}