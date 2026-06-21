import * as math from "mathjs";

function det2x2(A){
  return A[0][0]*A[1][1]-A[0][1]*A[1][0];
}

function det3x3Sarrus(A){
  const a=A[0][0], b=A[0][1], c=A[0][2];
  const d=A[1][0], e=A[1][1], f=A[1][2];
  const g=A[2][0], h=A[2][1], i=A[2][2];
  return a*e*i + b*f*g + c*d*h - c*e*g - b*d*i - a*f*h;
}

function det_gauss(A){
  const n=A.length;
  const M=A.map(r=>r.slice());
  const steps=[];
  let sign=1;
  let det=1;
  for(let k=0;k<n;k++){
    let p=k;
    for(let i=k+1;i<n;i++) if(Math.abs(M[i][k])>Math.abs(M[p][k])) p=i;
    if(Math.abs(M[p][k])<1e-12){
      steps.push("zero pivot -> det = 0");
      return {det:0, steps};
    }
    if(p!==k){
      [M[k],M[p]]=[M[p],M[k]];
      sign*=-1;
      steps.push(`swap row ${k} <-> ${p}`);
    }
    const pivot=M[k][k];
    det*=pivot;
    for(let i=k+1;i<n;i++){
      const f=M[i][k]/pivot;
      for(let j=k;j<n;j++) M[i][j]-=f*M[k][j];
    }
    steps.push(`after col ${k}: ${M.map(r=>`[${r.map(x=>x.toFixed(3)).join(', ')}]`).join('; ')}`);
  }
  return {det:sign*det, steps};
}

function inversa_gauss_jordan(A){
  const n=A.length;
  const M=A.map((r,i)=>r.slice().concat(Array.from({length:n},(_,j)=>i===j?1:0)));
  for(let k=0;k<n;k++){
    let p=k;
    for(let i=k+1;i<n;i++) if(Math.abs(M[i][k])>Math.abs(M[p][k])) p=i;
    if(Math.abs(M[p][k])<1e-12) return null;
    if(p!==k) [M[k],M[p]]=[M[p],M[k]];
    const pivot=M[k][k];
    for(let j=0;j<2*n;j++) M[k][j]/=pivot;
    for(let i=0;i<n;i++) if(i!==k){
      const f=M[i][k];
      for(let j=0;j<2*n;j++) M[i][j]-=f*M[k][j];
    }
  }
  return M.map(r=>r.slice(n,2*n));
}

function eh_invertivel(A){
  const inv=inversa_gauss_jordan(A);
  if(!inv) return {invertivel:false, cond:null};
  const cond=math.norm(A,'inf')*math.norm(inv,'inf');
  return {invertivel:true, cond};
}

function testar(){
  console.log("\nT1: det2x2 / det3x3Sarrus");
  const A2=[[1,2],[3,4]];              
  const A2s=[[1,2],[2,4]];            
  const A3=[[2,1,0],[0,3,4],[1,0,5]];  
  const A3s=[[1,2,3],[2,4,6],[1,2,3]]; 
  console.log("det2x2(A2)", det2x2(A2), "math.det", math.det(A2));
  console.log("det2x2(A2s)", det2x2(A2s), "math.det", math.det(A2s));
  console.log("det3x3(A3)", det3x3Sarrus(A3), "math.det", math.det(A3));
  console.log("det3x3(A3s)", det3x3Sarrus(A3s), "math.det", math.det(A3s));

  console.log("\nT2: det_gauss with steps");
  const C4=[[2,1,1,0],[4,3,3,1],[8,7,9,5],[6,7,9,8]];
  const g=det_gauss(C4);
  console.log("det_gauss(C4)", g.det);
  g.steps.forEach(s=>console.log(s));

  console.log("\nT3: propriedades do determinante");
  const A=[[2,1,0],[0,3,4],[1,0,5]];
  const B=[[1,2,1],[0,1,0],[2,0,1]];
  const detA=det3x3Sarrus(A);
  const detB=det3x3Sarrus(B);
  const AB=math.multiply(A,B);
  console.log("det(AB)=det(A)det(B)", Math.abs(det3x3Sarrus(AB)-detA*detB)<1e-8);
  console.log("det(A^T)=det(A)", Math.abs(det3x3Sarrus(math.transpose(A))-detA)<1e-8);
  const k=3;
  console.log("det(kA)=k^n det(A)", Math.abs(det3x3Sarrus(A.map(r=>r.map(x=>k*x)))-Math.pow(k,3)*detA)<1e-8);
  const A_swap=[A[1],A[0],A[2]];
  console.log("swap row flips sign", Math.abs(det3x3Sarrus(A_swap)+detA)<1e-8);
  const A_add=[A[0].map((x,j)=>x+2*A[1][j]), A[1], A[2]];
  console.log("add multiple row keeps det", Math.abs(det3x3Sarrus(A_add)-detA)<1e-8);

  console.log("\nT4: eh_invertivel (cond) ");
  console.log("invertivel", eh_invertivel([[4,7],[2,6]]));
  console.log("singular", eh_invertivel([[1,2],[2,4]]));
  console.log("mal condicionado", eh_invertivel([[1,1],[1,1.00000001]]));

  console.log("\nT5: inversa_gauss_jordan");
  const M3=[[2,1,1],[1,3,2],[1,0,0]];
  const inv3=inversa_gauss_jordan(M3);
  console.log("A3 inverse", inv3);
  console.log("A3*inv ~ I", math.multiply(M3,inv3));
  const M4=[[1,2,0,1],[0,1,3,2],[2,0,1,1],[1,0,0,1]];
  const inv4=inversa_gauss_jordan(M4);
  console.log("A4 inverse", inv4);
  console.log("A4*inv ~ I", math.multiply(M4,inv4));
}

testar();

export { det2x2, det3x3Sarrus, det_gauss, inversa_gauss_jordan, eh_invertivel };
