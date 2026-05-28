const { log } = require("mathjs");

//T1

// Determinante 2x2
const det2x2 = (A) => A[0][0]*A[1][1] - A[0][1]*A[1][0];

// Determinante 3x3 (Sarrus)
const det3x3 = (A) => {
  const [a,b,c] = A[0];
  const [d,e,f] = A[1];
  const [g,h,i] = A[2];

  return (a*e*i + b*f*g + c*d*h) - (c*e*g + b*d*i + a*f*h);
};

console.log(det2x2([[2,3],[1,4]]));
console.log(det2x2([[2,4],[1,2]]));

console.log(det3x3([[1,2,3],[4,5,6],[7,8,10]]));
console.log(det3x3([[1,2,3],[2,4,6],[3,6,9]]));

//T2

function detGauss(A) {
  A = A.map(row => [...row]);
  let n = A.length;
  let det = 1;
  let steps = [];

  for (let i = 0; i < n; i++) {

    // Pivot zero → trocar linha
    if (A[i][i] === 0) {
      for (let k = i+1; k < n; k++) {
        if (A[k][i] !== 0) {
          [A[i], A[k]] = [A[k], A[i]];
          det *= -1;
          steps.push(`Swap L${i+1} <-> L${k+1}`);
          break;
        }
      }
    }

    let pivot = A[i][i];
    det *= pivot;

    for (let j = i+1; j < n; j++) {
      if (A[j][i] !== 0) {
        let m = A[j][i] / pivot;
        for (let k = i; k < n; k++) {
          A[j][k] -= m * A[i][k];
        }
        steps.push(`L${j+1} = L${j+1} - ${m.toFixed(3)} * L${i+1}`);
      }
    }
  }

  return { det, steps };
}

//T3

function randomMatrix(n) {
  return Array.from({length:n}, () =>
    Array.from({length:n}, () => Math.floor(Math.random()*10))
  );
}

function transpose(A) {
  return A[0].map((_,i) => A.map(row => row[i]));
}

function multiply(A,B) {
  let n = A.length;
  let C = Array.from({length:n},()=>Array(n).fill(0));
  for (let i=0;i<n;i++)
    for (let j=0;j<n;j++)
      for (let k=0;k<n;k++)
        C[i][j] += A[i][k]*B[k][j];
  return C;
}

function scalarMultiply(A,k) {
  return A.map(row => row.map(x => k*x));
}

let A = randomMatrix(3);
let B = randomMatrix(3);

console.log(det3x3(multiply(A,B)), det3x3(A)*det3x3(B));
console.log(det3x3(transpose(A)), det3x3(A));            
console.log(det3x3(scalarMultiply(A,3)), 3**3 * det3x3(A)); 

//T4

function isInvertible(A) {
  return det3x3(A) !== 0;
}

function conditionNumber(A) {
  // aproximação simples: cond(A) ≈ ||A|| * ||A⁻¹||
  // usamos norma máxima
  const norm = M => Math.max(...M.map(r => r.reduce((a,b)=>a+Math.abs(b),0)));

  const inv = inverseGaussJordan(A);
  return norm(A) * norm(inv);
}

//T5

function inverseGaussJordan(A) {
  let n = A.length;
  let M = A.map((row,i) => [...row, ...Array.from({length:n},(_,j)=> i===j?1:0)]);

  for (let i=0;i<n;i++) {
    let pivot = M[i][i];
    for (let j=0;j<2*n;j++) M[i][j] /= pivot;

    for (let k=0;k<n;k++) {
      if (k !== i) {
        let m = M[k][i];
        for (let j=0;j<2*n;j++) M[k][j] -= m * M[i][j];
      }
    }
  }

  return M.map(row => row.slice(n));
}

let A3 = [[1,2,3],[0,1,4],[5,6,0]];
let invA3 = inverseGaussJordan(A3);
console.log(invA3);


//T6