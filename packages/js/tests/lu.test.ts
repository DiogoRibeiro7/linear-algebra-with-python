import { describe, it } from "vitest";
import {
  decomposicao_lu,
  det_via_lu,
  resolver_lu,
  resolver_lu_multiplos_rhs
} from "../src/lu";
import { matMul, matVecMul } from "../src/utils";
import { expectMatrixClose, expectVectorClose, expectClose } from "./testUtils";

describe("lu", () => {
  it("lu decomposition", () => {
    const A = [
      [2, 1],
      [3, 4]
    ];
    const [P, L, U] = decomposicao_lu(A);
    const left = matMul(P, A);
    const right = matMul(L, U);
    expectMatrixClose(left, right, 1e-6);
  });

  it("resolver_lu", () => {
    const A = [
      [2, 1],
      [1, 3]
    ];
    const b = [5, 7];
    const x = resolver_lu(A, b);
    expectVectorClose(matVecMul(A, x), b, 1e-6);
  });

  it("multiple rhs", () => {
    const A = [
      [4, 1],
      [2, 3]
    ];
    const B = [
      [1, 2],
      [3, 4]
    ];
    const X = resolver_lu_multiplos_rhs(A, B);
    const AX = matMul(A, X);
    expectMatrixClose(AX, B, 1e-6);
  });

  it("det_via_lu", () => {
    const A = [
      [1, 2],
      [3, 4]
    ];
    expectClose(det_via_lu(A), -2, 1e-7);
  });
});
