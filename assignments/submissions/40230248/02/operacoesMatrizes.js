// T1
let A = [[1,2,3],[4,5,6]];
let B = [[6,5,4],[3,2,1]];

let sum = A.map((r,i)=>r.map((v,j)=>v+B[i][j]));
let diff = A.map((r,i)=>r.map((v,j)=>v-B[i][j]));
let scaled = A.map(r=>r.map(v=>3*v));

console.log(sum, diff, scaled);
console.assert(sum.length === 2 && sum[0].length === 3);

// T2
let C = [[1,2],[3,4],[5,6]];

function mult(A,B){
  return A.map(r =>
    B[0].map((_,j)=>r.reduce((s,v,k)=>s+v*B[k][j],0))
  );
}

let AC = mult(A,C);
let CA = mult(C,A);

console.log(AC, CA); // tamanhos diferentes

// T3
let P = [[1,2],[3,4]];
let Q = [[0,1],[1,0]];

let PQ = mult(P,Q);
let QP = mult(Q,P);

let comm = PQ.map((r,i)=>r.map((v,j)=>v-QP[i][j]));

console.log(comm);

// identidade
let I = [[1,0],[0,1]];
console.log(mult(P,I), mult(I,P));

// T4
function T(A){ return A[0].map((_,j)=>A.map(r=>r[j])); }

console.log(JSON.stringify(T(T(A))) === JSON.stringify(A));
console.log(JSON.stringify(T(sum)) === JSON.stringify(sum.map((_,i)=>T(A)[i].map((v,j)=>v+T(B)[i][j]))));
console.log(JSON.stringify(T(AC)) === JSON.stringify(mult(T(C),T(A))));

// T5
let M = [[1,2,3],[4,5,6],[7,8,9]];
let S = M.map((r,i)=>r.map((v,j)=>v + M[j][i]));

console.log(JSON.stringify(S) === JSON.stringify(T(S))); // simétrica

let A3 = [[1,2,3],[0,1,4],[5,6,0]];
let x = [2,3,4];

let Ax = mult(A3, x.map(v=>[v]));
console.log(Ax);