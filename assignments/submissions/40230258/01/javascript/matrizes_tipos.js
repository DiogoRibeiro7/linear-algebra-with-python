//1

import * as math from "mathjs";

//3x4 0
const matrizNula = math.zeros(3, 4);
console.log(matrizNula);

//4x4 I
const matrizIdentidade = math.identity(4);
console.log(matrizIdentidade);

//3x3 D
const matrizDiagonal = math.matrix(math.diag([2, 5, -1]));
console.log(matrizDiagonal);


const preTriang = math.lup(math.random([3, 3]));
console.log(preTriang)
//3x3 U
const matrizTSup = math.matrix(preTriang.U)
console.log(matrizTSup);

//3x3 L
const matrizTInf = math.matrix(preTriang.L)
console.log(matrizTInf);

//3x3 S
const M = math.random([3, 3]);
const matrizSimetrica = math.matrix(math.add(M, math.transpose(M)));
console.log(matrizSimetrica);

//2

console.log(`Dimensões da matriz nula: ${matrizNula.size()}`);
console.log(`Elemento a2,3 da matriz nula: ${matrizNula.get([1, 2])}`);
console.log(`Dimensões da matriz identidade: ${matrizIdentidade.size()}`);
console.log(`Elemento a2,3 da matriz identidade: ${matrizIdentidade.get([1, 2])}`);
console.log(`Dimensões da matriz diagonal: ${matrizDiagonal.size()}`);
console.log(`Elemento a2,3 da matriz diagonal: ${matrizDiagonal.get([1, 2])}`);
console.log(`Dimensões da matriz triangular superior: ${matrizTSup.size()}`);
console.log(`Elemento a2,3 da matriz triangular superior: ${matrizTSup.get([1, 2])}`);
console.log(`Dimensões da matriz triangular inferior: ${matrizTInf.size()}`);
console.log(`Elemento a2,3 da matriz triangular inferior: ${matrizTInf.get([1, 2])}`);
console.log(`Dimensões da matriz simétrica: ${matrizSimetrica.size()}`);
console.log(`Elemento a2,3 da matriz simétrica: ${matrizSimetrica.get([1, 2])}`);


//3
function classificar_matriz(A) {
    let result = ""
    if (math.deepEqual(A, math.zeros(A.size()))) {
        result += "zero ";
    }
    if (math.deepEqual(A, math.identity(A.size()))) {
        result += "identity ";
    }
    if (math.deepEqual(A, math.diag(math.diag(A)))) {
        result += "diagonal ";
    }
    if (math.deepEqual(A, math.transpose(A))) {
        result += "symmetric ";
    }
    const triangDecomp = math.lup(A)
    if (math.deepEqual(A, triangDecomp.U)) {
        result += "upper_triangular ";
    }
    if (math.deepEqual(A, triangDecomp.L)) {
        result += "lower_triangular ";
    }
    if (A.size()[0] === A.size()[1]) {
        result += "square ";
    }else{
        result += "rectangular ";
    }
    return result;
}

for (let i = 0; i < 5; i++) {
    console.log(`Classificação da matriz ${i + 1}: ${classificar_matriz([matrizNula, matrizIdentidade, matrizDiagonal, matrizTSup, matrizTInf][i])}`);   
}



//4

try {
    const A = math.random([2, 3]);
    const B = math.random([4, 2]);
    const C = math.add(A, B);
    console.log(C);
} catch (error) {
    console.error("Erro ao adicionar matrizes:", error.message);
}

try {
    const A = math.random([2, 3]);
    const B = math.random([2, 4]);
    const C = math.multiply(A, B);
    console.log(C);
} catch (error) {
    console.error("Erro ao multiplicar matrizes:", error.message);
}