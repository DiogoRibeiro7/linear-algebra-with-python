/*1 Implement det_2x2(A) for 2×2 matrices and
det_3x3_sarrus(A) for 3 ×3 matrices. Test each on at least
two matrices (one invertible, one singular) and compare with
the built-in determinant*/ 

let A = [[1, 2], [3, 4]];
let A2 = [[1, 2], [2, 4]]; // Singular matrix
let B = [[1, 2, 3], [0, 1, 4], [5, 6, 0]];
let B2 = [[1,2,3],[4,5,6],[7,8,9]]; // Singular matrix

console.log("Matrix A (2x2): ", A);
console.log("Matrix B (3x3): ", B);
console.log("Matrix A2 singular (2x2): ", A2);
console.log("Matrix B2 singular (3x3): ", B2);

function det_2x2(A){
  if(A.length !== 2 || A[0].length !== 2){
    throw new Error("Matrix must be 2x2");
  }
  return A[0][0]*A[1][1] - A[0][1]*A[1][0];
}

function det_3x3_sarrus(A){
  if(A.length !== 3 || A[0].length !== 3){
    throw new Error("Matrix must be 3x3");
  }
  return A[0][0]*A[1][1]*A[2][2] + A[0][1]*A[1][2]*A[2][0] + A[0][2]*A[1][0]*A[2][1] - A[0][2]*A[1][1]*A[2][0] - A[0][1]*A[1][0]*A[2][2] - A[0][0]*A[1][2]*A[2][1];
}

console.log("Determinant of A (2x2): ", det_2x2(A));
console.log("Determinant of B (3x3): ", det_3x3_sarrus(B));
console.log("Determinant of A2 singular (2x2): ", det_2x2(A2));
console.log("Determinant of B2 singular (3x3): ", det_3x3_sarrus(B2));
console.log("Built-in determinant of A (2x2): ", math.det(A));
console.log("Built-in determinant of B (3x3): ", math.det(B));
console.log("Built-in determinant of A2 singular (2x2): ", math.det(A2));
console.log("Built-in determinant of B2 singular (3x3): ", math.det(B2));



/*2 Implement a Gaussian elimination-based de-
terminant function det_gauss(A) that returns b oth the deter-
minant value and intermediate row echelon steps. Test on a
4 ×4 matrix.*/

let C = [[2, 1, 3, 4], [1, 2, 0, 1], [3, 0, 2, 5], [4, 1, 5, 2]];
console.log("Matrix C (4x4): ", C);

function det_gauss(A){
  if(A.length !== A[0].length){
    throw new Error("Matrix must be square");
  }
  let steps = [];
  let det = 1; //in case of row swaps
  let n = A.length;
  let M = [];
  for(let i=0; i<n; i++){ //copying matrix so we dont change A
    M[i] = [...A[i]];
  }
  steps.push(M.map(row => [...row])); //initial matrix

  for(let i=0; i<n; i++){
    let maxRow = i;
    for(let j=i+1; j<n; j++){
      if(Math.abs(M[j][i]) > Math.abs(M[maxRow][i])){
        maxRow = j; 
      }
    }
    if(M[maxRow][i] === 0){
      return {det: 0, steps: steps}; //row of zeros means determinant is zero
    }
    if(maxRow !== i){ //row swap
      let temp = M[i];
      M[i] = M[maxRow];
      M[maxRow] = temp;
      det *= -1; //invert sign for row swap
    }
    for(let j=i+1; j<n; j++){ //eliminate below
      let factor = M[j][i] / M[i][i];
      for(let k=i; k<n; k++){
        M[j][k] -= factor * M[i][k];
      }
    }
    steps.push(M.map(row => [...row])); //saving step
  }

  for(let i=0; i<n; i++){ //calculating determinant from diagonal
    det *= M[i][i];
  }
  return {det: det, steps: steps};
}

let result = det_gauss(C);
console.log("Determinant of C (4x4) using Gaussian elimination: ", result.det);
console.log("Intermediate steps: ", result.steps);




/*3 Verify the following prop erties computa-
tionally using random matrices: det(AB) = det(A) det(B);
det(A⊤) = det(A); det(kA) = kn det(A); row swap negates
the determinant; adding a multiple of one row to another pre-
serves the determinant.*/ 

let D = math.random([3, 3]);
let E = math.random([3, 3]);
let k = 2;

console.log("Matrix D (3x3): ", D);
console.log("Matrix E (3x3): ", E);

console.log("det(AB) = det(A) det(B): ", math.det(math.multiply(D, E)), " = ", math.det(D) * math.det(E));
console.log("det(A^T) = det(A): ", math.det(math.transpose(D)), " = ", math.det(D));
console.log("det(kA) = kn det(A): ", math.det(math.multiply(k, D)), " = ", Math.pow(k, D.length) * math.det(D));

/*4 Write a function eh_invertivel(A) that
checks invertibility. Apply it to three matrices: one clearly in-
vertible, one singular, and one ill-conditioned (with condition
numb er > 108). Report the condition number for each.*/ 

function eh_invertivel(A){
  if(A.length !== A[0].length){
    throw new Error("Matrix must be square");
  }
  let det = math.det(A);
  //conditional

  let invA;
  try {
    invA = math.inv(A);
  } catch (err) {
    return false; //not invertible if we can't compute inverse
  }
  let normA = math.norm(A, 'inf');
  let normInvA = math.norm(invA, 'inf');
  let conditional = normA * normInvA;
  let result = false
  if (det !== 0) {
    result = true
  }else{
    return false
  }
  
  return {result: result, condition_number: conditional};
}

let F = [[1, 2], [3, 4]]; // Invertible
let G = [[1, 2], [2, 4]]; // Singular
let H = [[1, 2], [2.0000001, 4]]; // Ill-conditioned

console.log("Matrix F (invertible): ", F);
console.log("Matrix G (singular): ", G);
console.log("Matrix H (ill-conditioned): ", H);

console.log("Is F invertible? ", eh_invertivel(F));
console.log("Is G invertible? ", eh_invertivel(G));
console.log("Is H invertible? ", eh_invertivel(H));


/*5 Implement inversa_gauss_jordan(A) that
computes the inverse via augmented matrix [A|I] reduction.
Test on a 3 ×3 and a 4 ×4 matrix, verifying that A ·A−1 = I.*/ 

function inversa_gauss_jordan(A){
  let n = A.length;
  if(n !== A[0].length){
    throw new Error("Matrix must be square"); //initial check
  }

  let M = [];
  let I = [];
  for(let i = 0; i < n; i++){
    M[i] = [];
    I[i] = [];
    for(let j = 0; j < n; j++){
      M[i][j] = A[i][j]; //copying A to M so we dont change A
      I[i][j] = (i === j) ? 1 : 0; //creating identity matrix
    }
  }

  for(let i = 0; i < n; i++){
    let pivot = i;
    for(let j = i + 1; j < n; j++){
      if(Math.abs(M[j][i]) > Math.abs(M[pivot][i])){
        pivot = j;
      }
    }
    if(M[pivot][i] === 0){
      throw new Error("Matrix is not invertible"); //pivot of zero means not invertible
    }
    if(pivot !== i){ //row swap
      let temp = M[i];
      M[i] = M[pivot];
      M[pivot] = temp;
      temp = I[i];
      I[i] = I[pivot];
      I[pivot] = temp;
    }

    let diag = M[i][i];
    for(let j = 0; j < n; j++){
      M[i][j] /= diag;
      I[i][j] /= diag;
    }

    for(let j = 0; j < n; j++){ //eliminate other rows
      if(j === i) continue;
      let factor = M[j][i];
      for(let k = 0; k < n; k++){
        M[j][k] -= factor * M[i][k];
        I[j][k] -= factor * I[i][k];
      }
    }
  }
  return I
}

let F3 = [[2, 1, 3], [1, 2, 0], [3, 0, 2]];
let F4 = [[2, 1, 3, 4], [1, 2, 0, 1], [3, 0, 2, 5], [4, 1, 5, 2]];

console.log("Inverse of F3 by Gauss-Jordan:", inversa_gauss_jordan(F3));
console.log("F3 * F3^(-1) =", math.round(math.multiply(F3, inversa_gauss_jordan(F3)), 10));
console.log("Inverse of F4 by Gauss-Jordan:", inversa_gauss_jordan(F4));
console.log("F4 * F4^(-1) =", math.round(math.multiply(F4, inversa_gauss_jordan(F4)), 10)); //rouding to avoid floating point issues


/*6 Create a visualization showing how a 2 ×2
matrix transforms the unit square into a parallelogram. Display
the area scale factor (which equals |det(A)|) in the plot title.
Save the figure.*/

let div = document.getElementById("visualization");

function visualizeTransformation(A){
  if(A.length !== 2 || A[0].length !== 2){
    throw new Error("Matrix must be 2x2");
  }

  let original = [[0,0], [1,0], [1,1], [0,1], [0,0]]; // unit square, closed
  let transformed = original.map(p => math.multiply(A, p));

  let data = [
    {
      x: original.map(p => p[0]),
      y: original.map(p => p[1]),
      mode: 'lines',
      name: 'Unit Square',
      line: {color: 'blue'}
    },
    {
      x: transformed.map(p => p[0]),
      y: transformed.map(p => p[1]),
      mode: 'lines',
      name: 'Transformed Parallelogram',
      line: {color: 'red'}
    }
  ];

  let layout = {
    title: `Area Scale Factor: ${Math.abs(math.det(A))}`,
    xaxis: {title: 'x'},
    yaxis: {title: 'y'},
    showlegend: true
  };

  Plotly.newPlot(div, data, layout);

}

let A_vis = [[2, 1], [1, 2]];
visualizeTransformation(A_vis);



