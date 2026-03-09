import * as math from "mathjs";

function superficieCilindro(r, h, n) {
  const theta = math.range(0, 2 * Math.PI, 2 * Math.PI / n, true).toArray();
  const z = math.range(0, h, h / n, true).toArray();
  const X = [];
  const Y = [];
  const Z = [];
  for (let i = 0; i < z.length; i += 1) {
    const rowX = [];
    const rowY = [];
    const rowZ = [];
    for (let j = 0; j < theta.length; j += 1) {
      rowX.push(r * Math.cos(theta[j]));
      rowY.push(r * Math.sin(theta[j]));
      rowZ.push(z[i]);
    }
    X.push(rowX);
    Y.push(rowY);
    Z.push(rowZ);
  }
  return { X, Y, Z };
}

const cyl = superficieCilindro(1, 2, 20);
console.log("Cylinder grid", cyl.X.length, cyl.X[0].length);
