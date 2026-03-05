import * as math from "mathjs";

const A = [[2, 1, -1], [-3, -1, 2], [-2, 1, 2]];
const b = [8, -11, -3];

const x = math.lusolve(A, b);
console.log("Solution (math.lusolve)", x.valueOf());
