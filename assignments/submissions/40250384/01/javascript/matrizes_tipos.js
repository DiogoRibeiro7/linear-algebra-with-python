import * as math from "mathjs";

const m3x4zero = math.zeros(3,4)
const Z = m3x4zero.get([1,2])
console.log("3x4 zero",Z,m3x4zero.valueOf());

const m4x4identity = math.identity(4,4)
const I = m4x4identity.get([1,2])
console.log("4x4 identidade",I,m4x4identity.valueOf());

// uma função para estabilizar os processos da diagonal, que por algum motivo
// se criar uma diagonal usando math.diag ela é diferente das outras, 
// essa função serve para recria-la de forma que seja uma matriz normal como as outras
// so funciona para 3x3 :/
function PorraDaDiagonal(merdaDaDiagonal) {
let digStr=String(merdaDaDiagonal)
const diago=digStr.split(',')
const ddd = []
for (dif of diago){
  ddd.push(Number(dif))
}
const quaseDiagonal=[]
quaseDiagonal.push(ddd.slice(0,3))
quaseDiagonal.push(ddd.slice(3,6))
quaseDiagonal.push(ddd.slice(6,9))

const diagonal= math.matrix(quaseDiagonal)
return diagonal
}

const dig = math.diag([2,5,-1])
const m3x3diagonal = PorraDaDiagonal(dig)
const D = m3x3diagonal.get([1,2])
console.log("3x3 diagonal",D,m3x3diagonal.valueOf());

const m3x3triSUP = math.matrix([
  [1,1,1],
  [0,1,1],
  [0,0,1]])
  const SUP = m3x3triSUP.get([1,2])
console.log("3x3 triangular superior",SUP,m3x3triSUP.valueOf());

const m3x3triINF = math.matrix([
  [1,0,0],
  [1,1,0],
  [1,1,1]])
   const INF = m3x3triINF.get([1,2])
console.log("3x3 triangular inferior",INF,m3x3triINF.valueOf());

const matriz = math.matrix([
  [Math.floor(Math.random() * (10)),Math.floor(Math.random() * (10)),Math.floor(Math.random() * (10))],
  [Math.floor(Math.random() * (10)),Math.floor(Math.random() * (10)),Math.floor(Math.random() * (10))],
  [Math.floor(Math.random() * (10)),Math.floor(Math.random() * (10)),Math.floor(Math.random() * (10))]
])
const msimetrico = math.add(matriz, math.transpose(matriz))
 const S = msimetrico.get([1,2])
console.log("3x3 simetrico",S,msimetrico.valueOf());


function shape(A) {
  const size = math.size(A).valueOf();
  return `${size[0]}x${size[1]}`;
}


function triangular(m) {
    // tamanho da matriz á ser classificada
  let veraciade = true
  let linha = Number(shape(m)[0])
  let coluna = Number(shape(m)[2] )
     for (let mm = 1; mm < linha; mm++) {
      const numeral =[]
      let sequencia = true
      for (let nn = 0; nn <coluna; nn++) {
        let x = m.get([mm,nn])      
        if (x == 0 && sequencia)  {
          numeral.push(x)
          }
        else if(mm != numeral.length ){sequencia = false}
        }
      
      if (numeral.length<mm){
        veraciade = false
        mm = linha
      }
       
    }
    return veraciade
    }


// classificar matriz
function classificar_matriz(m) {
  // tamanho da matriz á ser classificada
  let linha = Number(shape(m)[0])
  let coluna = Number(shape(m)[2] )

  // retorna uma lista com todas as classificações encontradas
  const classificar=[]

  // quadrada
  if (linha == coluna){
    classificar.push('square')
     
    // identidade
     let identidade = true
    for (let mm = 0; mm < linha; mm++) {
      const numeral =[]
      for (let nn = 0; nn <coluna; nn++) {
        let x = m.get([mm,nn])
        if (x != 0)  {
          numeral.push(x)}
      }
      if (numeral.length!=1 || numeral[0]!=1){
        identidade = false
        mm = linha
      } 
    }
     if (identidade){
     classificar.push('identity')}
    
    //  diagonal
     let diagonal = true
    for (let mm = 0; mm < linha; mm++) {
      const numeral =[]
      for (let nn = 0; nn <coluna; nn++) {
        let x = m.get([mm,nn])
        if (x != 0)  {
          numeral.push(x)}
      }
      if (numeral.length!=1){
        diagonal = false
        mm = linha
      } 
    }
     if (diagonal){
     classificar.push('diagonal')}
      
//  simetrica
    let simetrica =true
    for (let mm = 1; mm < linha; mm++) {
      for (let nn = 0; nn <coluna; nn++) {
        if (nn != mm){
          let x = m.get([mm,nn])
          let y = m.get([nn,mm])
          if (x != y){
            simetrica = false
          }
        }
      }
    }
    if (simetrica){classificar.push('symmetric')}

//  triangular
     let triSUP = triangular(m)
     if (triSUP){
     classificar.push('upper_triangular')}

     //  triangular inferior
     let triINF = triangular(math.transpose(m))
     if (triINF){
     classificar.push('lower_triangular')}

    
  } 

  // retangula
  else {
    classificar.push('rectangular')
  }

  // zero
  const ff = math.zeros(linha,coluna)  
  if (String(m)==String(ff)) {
    classificar.push('zero')
  }
  
 
  
  return classificar
}


console.log('zero ',classificar_matriz(m3x4zero));
console.log('identidade ',classificar_matriz(m4x4identity));
console.log('diagonal ',classificar_matriz(m3x3diagonal));
console.log('triangular SUP ',classificar_matriz(m3x3triSUP));
console.log('triangular INF ',classificar_matriz(m3x3triINF));
console.log('matriz aleatoria ',classificar_matriz(matriz));
console.log('matriz simetrica ',classificar_matriz(msimetrico));

try {
  math.add(math.zeros(2, 3), math.zeros(4, 2));
} catch (err) {
  console.log("Add error (expected)", err.message);
}

try {
  math.multiply(math.zeros(2, 3), math.zeros(4, 2));
} catch (err) {
  console.log("Multiply error (expected)", err.message);
}


