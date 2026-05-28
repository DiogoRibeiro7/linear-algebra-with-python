function out(t){
  document.getElementById("out").textContent = t
}

// ---------------- T1 ----------------
function T1(){
  let Ab = [
    [ 2,  1, -1,  8],
    [-3, -1,  2, -11],
    [-2,  1,  2, -3]
  ]

  let log = "T1 - Eliminação:\n\n"

  function elim(i,j,p){
    let f = Ab[i][j] / Ab[p][j]
    for(let k=0;k<4;k++) Ab[i][k] -= f * Ab[p][k]
    log += "L"+i+" -> L"+i+" - ("+f.toFixed(2)+")L"+p+"\n"
  }

  elim(1,0,0)
  elim(2,0,0)
  elim(2,1,1)

  let z = Ab[2][3]/Ab[2][2]
  let y = (Ab[1][3]-Ab[1][2]*z)/Ab[1][1]
  let x = (Ab[0][3]-Ab[0][1]*y-Ab[0][2]*z)/Ab[0][0]

  log += "\nSolução:\n"
  log += "x="+x+"\ny="+y+"\nz="+z

  out(log)
}

// ---------------- T2 ----------------
function T2(){
  let Ab = [
    [1,2,3,4],
    [2,4,6,8]
  ]

  let log = "T2 - Sistema SPI\n\n"

  let f = Ab[1][0]/Ab[0][0]
  for(let j=0;j<4;j++) Ab[1][j] -= f*Ab[0][j]

  log += "Escalonada: " + JSON.stringify(Ab) + "\n\n"
  log += "z = t\n"
  log += "y = (4 - 3t)/2\n"
  log += "x = 4 - 2y - 3t\n\n"

  log += "Exemplos:\n"
  for(let t of [0,1,2]){
    let y = (4-3*t)/2
    let x = 4 - 2*y - 3*t
    log += "t="+t+" → ("+x+","+y+","+t+")\n"
  }

  out(log)
}

// ---------------- T3 ----------------
function T3(){
  let Ab = [
    [1,1,1,3],
    [2,2,2,10]
  ]

  let f = Ab[1][0]/Ab[0][0]
  for(let j=0;j<4;j++) Ab[1][j] -= f*Ab[0][j]

  let log = "T3 - Sistema impossível (SI)\n\n"
  log += JSON.stringify(Ab)+"\n\n"
  log += "0 = 4 → Contradição\n"
  log += "Geometricamente: retas paralelas"

  out(log)
}

// ---------------- T4 ----------------
function rank(M){
  let r=0
  for(let i=0;i<M.length;i++){
    if(M[i].some(v=>v!==0)) r++
  }
  return r
}

function classificar(A,b){
  let Ab = A.map((r,i)=>[...r,b[i]])
  let rA = rank(A)
  let rAb = rank(Ab)
  if(rA!==rAb) return "SI"
  if(rA===A[0].length) return "SPD"
  return "SPI"
}

function T4(){
  let sistemas = [
    {A:[[1,2],[3,4]], b:[5,6]},
    {A:[[1,1],[2,2]], b:[3,6]},
    {A:[[1,1],[2,2]], b:[3,3]},
    {A:[[1,0,1],[0,1,1],[1,1,2]], b:[3,4,7]},
    {A:[[1,2,3],[2,4,6],[1,1,1]], b:[6,12,4]}
  ]

  let log = "T4 - Classificação\n\n"

  sistemas.forEach((s,i)=>{
    log += "S"+(i+1)+": "+classificar(s.A,s.b)+"\n"
  })

  out(log)
}

// ---------------- T5 ----------------
function T5(){
  let log = "T5 - SPI com 3 incógnitas e 2 equações\n\n"
  log += "x + y + z = 4\n"
  log += "2x + y + 3z = 10\n\n"
  log += "z = t\n"
  log += "x = 6 - 2t\n"
  log += "y = -2 + t\n\n"
  log += "Solução geral:\n"
  log += "(x,y,z) = (6 - 2t, -2 + t, t)\n"

  out(log)
}

// ---------------- T6 ----------------
function T6(){
  let log = "T6 - Comparação com solver\n\n"
  log += "Como JS não tem solver nativo, só mostramos que o Gauss funciona.\n"
  log += "Se fosse singular → não dava para resolver.\n"
  out(log)
}

// ---------------- T7 ----------------
function T7(){
  let log = "T7 - Visualizações\n\n"
  log += "Aqui só descrevemos porque JS puro não gera gráficos sozinho.\n\n"
  log += "2D:\n"
  log += "- SPD → duas retas que se cruzam\n"
  log += "- SPI → duas retas iguais\n"
  log += "- SI → duas retas paralelas\n\n"
  log += "3D:\n"
  log += "Três planos a cruzarem num ponto."
  out(log)
}
