import * as math from "mathjs";

const v1 = [1, 2, 3];
const v2 = [2, 4, 6];
const cross = math.cross(v1, v2);
console.log("Cross (parallel -> zero)", cross);

const n = [0, 0, 1];
const lineDir = [1, 1, 0];
console.log("Line parallel to plane?", math.dot(n, lineDir) === 0);
