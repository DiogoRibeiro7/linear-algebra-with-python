import * as math from "mathjs";

//T1 - Create Matrix

//A - Zero Matrix
let A = math.zeros(3,4);

//B - Identity Matrix 
let B = math.identity(4);

//C - Diagonal Matrix 
let C = math.matrix(
 [[2,0,0],
  [0,5,0],
  [0,0,-1]]);

//D - Upper Triangular Matrix 
let D = math.matrix(
 [[1,2,3],
  [0,4,5],
  [0,0,6]]);

//E - Lower Triangular Matrix 
let E = math.matrix(
 [[1,0,0],
  [2,3,0],
  [4,5,6]]);

//G - Symmetric Matrix built from F + F transpose
let F = math.matrix(
 [[2,5,7],
  [6,9,8],
  [1,3,4]]);

let G = math.add(F, math.transpose(F));

//T2 - Get the dimensions and the element of the second row and third column of each matrix

function matrixInfo(m) {
    let dimension = m.size();
    let element = m.get([2, 3]);
    console.log(`A Matriz tem as dimensões ${dimension[0]}x${dimension[1]}. O elemento na segunda linha e terceira coluna é ${element}`);
}

matrixInfo(A);
matrixInfo(B);
matrixInfo(C);
matrixInfo(D);
matrixInfo(E);
matrixInfo(G);

//T3 - Create a function to classify the matrices

function classificar_matriz(m) {
   if(m.size([0]) == m.size([1])){

     console.log("A matriz é quadrada");

     if(m == math.transpose(m)){

        console.log("A matriz é simétrica.");

     } else if(math.det(m) == m.get([1,1]) * m.get([2,2]) * m.get([3,3]) && math.det(m) !== 1) {

        console.log("A matriz é diagonal.");

     } else if(math.det(m) == 1) {

        console.log("A matriz é identidade.");

     } else if(m.get([2,1]) + m.get([3,1]) + m.get([3,2]) == 0) {

        console.log("A matriz é triangular superior.");

     } else if(m.get([1,2]) + m.get([1,3]) + m.get([2,3]) == 0) {

        console.log("A matriz é triangular inferior.");
     }

   } else {

    console.log("A matriz é retangular.");
    
   }
}

classificar_matriz(A);
classificar_matriz(B);
classificar_matriz(C);
classificar_matriz(D);
classificar_matriz(E);
classificar_matriz(G);

//T4 - Check dimensions for addition and multiplication

const matrix1 = math.zeros(2,2);

const matrix2 = math.zeros(3,4);


function checkAddition(m1,m2){
    if(m1.size() == m2.size()) {

        console.log(`A adição entre as matrizes é possivel pois ambas têm as mesmas dimensões.`);

    } else {

        console.log(`A adição entre as matrizes não é possivel pois as matrizes têm dimensões diferentes.`);

    }
}

function checkMultiplication(m1,m2){
    if(m1.size([1]) == m2.size([0])) {

        console.log(`A multiplicação entre as matrizes é possivel pois a coluna da primeira matriz tem o mesmo valor da linha da segunda.`);

    } else {

        console.log(`A multiplicação entre as matrizes não é possivel pois a coluna da primeira matriz não tem o mesmo valor do que a linha da segunda.`);

    }
}

checkAddition(matrix1,matrix2);
checkMultiplication(matrix1,matrix2);
