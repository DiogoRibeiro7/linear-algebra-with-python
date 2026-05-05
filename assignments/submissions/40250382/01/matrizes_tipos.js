/**
 * Assignment 01 - Matrizes: Construção e Classificação (JavaScript/math.js)
 * T1-T4: Criação, acesso, classificação e tratamento de erros
 */

const { create, all } = require('mathjs');
const math = create(all);

// ============================================================
// T1: CRIAÇÃO DE MATRIZES ESPECIAIS
// ============================================================

console.log("=".repeat(60));
console.log("T1: CRIAÇÃO DE MATRIZES ESPECIAIS");
console.log("=".repeat(60));

// 1. Matriz zero 3×4 (todos os elementos = 0)
const zero_3x4 = math.zeros(3, 4);
console.log("\n1. Matriz Zero 3×4:");
console.log(math.format(zero_3x4, {notation: 'fixed', precision: 0}));

// 2. Matriz identidade 4×4 (1s na diagonal, 0s no resto)
const identity_4x4 = math.identity(4);
console.log("\n2. Matriz Identidade 4×4:");
console.log(math.format(identity_4x4, {notation: 'fixed', precision: 0}));

// 3. Matriz diagonal 3×3 com valores [2, 5, -1] na diagonal principal
const diagonal_3x3 = math.diag([2, 5, -1]);
console.log("\n3. Matriz Diagonal 3×3:");
console.log(math.format(diagonal_3x3, {notation: 'fixed', precision: 0}));

// 4. Matriz triangular superior (zeros ABAIXO da diagonal: i > j)
const upper_tri_3x3 = math.matrix([[1, 2, 3], [0, 4, 5], [0, 0, 6]]);
console.log("\n4. Matriz Triangular Superior 3×3:");
console.log(math.format(upper_tri_3x3, {notation: 'fixed', precision: 0}));

// 5. Matriz triangular inferior (zeros ACIMA da diagonal: i < j)
const lower_tri_3x3 = math.matrix([[1, 0, 0], [2, 3, 0], [4, 5, 6]]);
console.log("\n5. Matriz Triangular Inferior 3×3:");
console.log(math.format(lower_tri_3x3, {notation: 'fixed', precision: 0}));

// 6. Matriz simétrica: M + M^T (igual à sua transposta)
const M = math.matrix([[1, 2, 3], [4, 5, 6], [7, 8, 9]]);
const simetrica = math.add(M, math.transpose(M));
console.log("\n6. Matriz Simétrica (M + M^T):");
console.log("M:", math.format(M, {notation: 'fixed', precision: 0}));
console.log("M^T:", math.format(math.transpose(M), {notation: 'fixed', precision: 0}));
console.log("Resultado:", math.format(simetrica, {notation: 'fixed', precision: 0}));

// Objeto com todas as matrizes para iteração nas tarefas seguintes
const matrizes = {
    "Zero 3×4": zero_3x4,
    "Identidade 4×4": identity_4x4,
    "Diagonal 3×3": diagonal_3x3,
    "Triangular Superior 3×3": upper_tri_3x3,
    "Triangular Inferior 3×3": lower_tri_3x3,
    "Simétrica (M+M^T)": simetrica
};

// ============================================================
// T2: DIMENSÕES E ACESSO A ELEMENTOS
// ============================================================

console.log("\n" + "=".repeat(60));
console.log("T2: DIMENSÕES E ACESSO A ELEMENTOS");
console.log("=".repeat(60));
console.log("Nota: Indexação 0-based → a[2,3] = índice [1][2]");

// Itera sobre todas as matrizes e mostra dimensões + elemento a[2,3]
for (const [nome, matriz] of Object.entries(matrizes)) {
    const [rows, cols] = math.size(matriz);  // desestruturação direta
    
    console.log(`\n${nome}:`);
    console.log(`  Dimensões: ${rows} × ${cols}`);
    
    // Acede ao elemento na posição [2,3] (linha 2, coluna 3) → índices [1][2]
    if (rows > 1 && cols > 2) {
        const elemento = math.subset(matriz, math.index(1, 2));
        console.log(`  Elemento a[2,3] ([1][2]): ${elemento}`);
    } else {
        console.log(`  Elemento a[2,3]: N/A (matriz pequena demais)`);
    }
}

// ============================================================
// T3: FUNÇÃO DE CLASSIFICAÇÃO
// ============================================================

console.log("\n" + "=".repeat(60));
console.log("T3: FUNÇÃO CLASSIFICAR_MATRIZ(A)");
console.log("=".repeat(60));

// Compara números com tolerância para evitar problemas de precisão float
const approxEqual = (a, b, eps = 1e-10) => Math.abs(a - b) < eps;

// Verifica se é matriz zero (todos os elementos ≈ 0)
const isZero = A => A.valueOf().flat(Infinity).every(x => approxEqual(x, 0));

// Verifica se é identidade (diagonal = 1, resto = 0)
const isIdentity = A => {
    const [n] = math.size(A);
    const d = A.valueOf();
    for (let i = 0; i < n; i++) 
        for (let j = 0; j < n; j++) 
            if (!approxEqual(d[i][j], i === j ? 1 : 0)) return false;
    return true;
};

// Verifica se é diagonal (fora da diagonal ≈ 0)
const isDiagonal = A => {
    const [n] = math.size(A);
    const d = A.valueOf();
    for (let i = 0; i < n; i++) 
        for (let j = 0; j < n; j++) 
            if (i !== j && !approxEqual(d[i][j], 0)) return false;
    return true;
};

// Verifica se é simétrica (A[i][j] = A[j][i])
const isSymmetric = A => {
    const [n] = math.size(A);
    const d = A.valueOf();
    for (let i = 0; i < n; i++) 
        for (let j = 0; j < n; j++) 
            if (!approxEqual(d[i][j], d[j][i])) return false;
    return true;
};

// Verifica se é triangular superior (abaixo da diagonal ≈ 0)
const isUpper = A => {
    const [n] = math.size(A);
    const d = A.valueOf();
    for (let i = 1; i < n; i++) 
        for (let j = 0; j < i; j++) 
            if (!approxEqual(d[i][j], 0)) return false;
    return true;
};

// Verifica se é triangular inferior (acima da diagonal ≈ 0)
const isLower = A => {
    const [n] = math.size(A);
    const d = A.valueOf();
    for (let i = 0; i < n; i++) 
        for (let j = i + 1; j < n; j++) 
            if (!approxEqual(d[i][j], 0)) return false;
    return true;
};

/**
 * Classifica uma matriz segundo as suas propriedades estruturais
 * @param {Matrix} A - Matriz a classificar
 * @returns {string[]} - Lista de classificações: square/rectangular, zero, identity, diagonal, symmetric, upper_triangular, lower_triangular
 */
function classificar_matriz(A) {
    const labels = [];
    const [rows, cols] = math.size(A);
    
    // Classificação base: quadrada vs retangular
    labels.push(rows === cols ? "square" : "rectangular");
    
    // Verifica propriedades especiais (apenas para matrizes quadradas quando aplicável)
    if (isZero(A)) labels.push("zero");
    if (rows === cols) {
        if (isIdentity(A)) labels.push("identity");
        if (isDiagonal(A)) labels.push("diagonal");
        if (isSymmetric(A)) labels.push("symmetric");
        if (isUpper(A)) labels.push("upper_triangular");
        if (isLower(A)) labels.push("lower_triangular");
    }
    
    return labels;
}

// Testa a classificação em todas as matrizes do T1
console.log("\nResultados da classificação:");
console.log("-".repeat(50));

for (const [nome, matriz] of Object.entries(matrizes)) {
    console.log(`\n${nome}: [${classificar_matriz(matriz).join(", ")}]`);
}

// ============================================================
// T4: TRATAMENTO DE ERROS
// ============================================================

console.log("\n" + "=".repeat(60));
console.log("T4: TRATAMENTO DE ERROS EM OPERAÇÕES");
console.log("=".repeat(60));

// Teste 1: Adição com dimensões incompatíveis (2×3 + 4×2)
console.log("\n1. Erro de Adição (2×3 + 4×2):");
try {
    const A = math.matrix([[1, 2, 3], [4, 5, 6]]);      // 2×3
    const B = math.matrix([[1, 2], [3, 4], [5, 6], [7, 8]]); // 4×2
    math.add(A, B);
} catch (e) {
    console.log(`❌ ${e.name}: ${e.message}`);
    console.log("   → Adição requer matrizes com mesmas dimensões (m×n)");
}

// Teste 2: Multiplicação com dimensões internas incompatíveis (2×3 × 4×2)
console.log("\n2. Erro de Multiplicação (2×3 × 4×2):");
try {
    const C = math.matrix([[1, 2, 3], [4, 5, 6]]);      // 2×3
    const D = math.matrix([[1, 2], [3, 4], [5, 6], [7, 8]]); // 4×2
    math.multiply(C, D);
} catch (e) {
    console.log(`❌ ${e.name}: ${e.message}`);
    console.log("   → Multiplicação requer: cols(A) = rows(B)");
}

// Teste 3: Multiplicação válida para comparação (2×3 × 3×2 = 2×2)
console.log("\n3. Multiplicação Válida (2×3 × 3×2):");
try {
    const E = math.matrix([[1, 2, 3], [4, 5, 6]]);      // 2×3
    const F = math.matrix([[1, 2], [3, 4], [5, 6]]);    // 3×2
    const res = math.multiply(E, F);
    console.log("✅ Resultado 2×2:");
    console.log(math.format(res, {notation: 'fixed', precision: 0}));
} catch (e) {
    console.log(`Erro inesperado: ${e.message}`);
}

console.log("\n" + "=".repeat(60));
console.log("FIM DA TAREFA");
console.log("=".repeat(60));