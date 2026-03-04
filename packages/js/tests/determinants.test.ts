import { describe, it, expect } from "vitest";
import {
  det_2x2,
  det_3x3_sarrus,
  det_cofactor,
  det_gauss,
  inversa_2x2,
  inversa_gauss_jordan
} from "../src/determinants";
import { identity, matMul } from "../src/utils";
import { expectMatrixClose, expectClose } from "./testUtils";

describe("determinants", () => {
  it("det_2x2 known", () => {
    const A = [
      [1, 2],
      [3, 4]
    ];
    expect(det_2x2(A)).toBe(-2);
  });

  it("det_3x3_sarrus", () => {
    const A = [
      [1, 2, 3],
      [0, 1, 4],
      [5, 6, 0]
    ];
    expectClose(det_3x3_sarrus(A), 1);
  });

  it("det_cofactor matches gauss", () => {
    const A = [
      [2, 1, 0],
      [3, 4, 1],
      [1, 0, 2]
    ];
    const [detGauss] = det_gauss(A);
    expectClose(det_cofactor(A), detGauss, 1e-7);
  });

  it("det_gauss known", () => {
    const A = [
      [3, 2, -1],
      [1, 0, 2],
      [4, 1, 1]
    ];
    const [detVal] = det_gauss(A);
    expectClose(detVal, 7, 1e-7);
  });

  it("inversa_2x2", () => {
    const A = [
      [2, 1],
      [5, 3]
    ];
    const inv = inversa_2x2(A);
    const prod = matMul(A, inv);
    expectMatrixClose(prod, identity(2), 1e-6);
  });

  it("inversa_gauss_jordan", () => {
    const A = [
      [1, 2, 1],
      [0, 1, 0],
      [2, 3, 4]
    ];
    const [inv] = inversa_gauss_jordan(A);
    const prod = matMul(A, inv);
    expectMatrixClose(prod, identity(3), 1e-6);
  });

  it("singular raises", () => {
    const A = [
      [1, 2],
      [2, 4]
    ];
    expect(() => inversa_2x2(A)).toThrow();
  });
});
