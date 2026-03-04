import { describe, it, expect } from "vitest";
import {
  classificar_sistema,
  cramer,
  cramer_2x2,
  cramer_3x3,
  resolver_gauss
} from "../src/systems";
import { matVecMul } from "../src/utils";
import { expectVectorClose } from "./testUtils";

describe("systems", () => {
  it("spd system", () => {
    const A = [
      [2, 1],
      [1, 3]
    ];
    const b = [5, 7];
    const [x, classification] = resolver_gauss(A, b);
    expect(classification).toBe("SPD");
    expect(x).not.toBeNull();
    if (x) {
      expectVectorClose(matVecMul(A, x), b, 1e-6);
    }
  });

  it("spi system", () => {
    const A = [
      [1, 2],
      [2, 4]
    ];
    const b = [3, 6];
    expect(classificar_sistema(A, b)).toBe("SPI");
  });

  it("si system", () => {
    const A = [
      [1, 2],
      [2, 4]
    ];
    const b = [3, 7];
    expect(classificar_sistema(A, b)).toBe("SI");
  });

  it("cramer_2x2", () => {
    const A = [
      [1, 2],
      [3, 4]
    ];
    const b = [5, 6];
    const x = cramer_2x2(A, b);
    expectVectorClose(matVecMul(A, x), b, 1e-6);
  });

  it("cramer_3x3", () => {
    const A = [
      [2, 1, -1],
      [1, 2, 3],
      [3, -1, 2]
    ];
    const b = [3, 9, 4];
    const x = cramer_3x3(A, b);
    expectVectorClose(matVecMul(A, x), b, 1e-6);
  });

  it("cramer general", () => {
    const A = [
      [2, -1, 0],
      [1, 2, 1],
      [0, -3, 1]
    ];
    const b = [1, 4, -2];
    const x = cramer(A, b);
    expectVectorClose(matVecMul(A, x), b, 1e-6);
  });

  it("cramer singular raises", () => {
    const A = [
      [1, 2],
      [2, 4]
    ];
    const b = [1, 2];
    expect(() => cramer(A, b)).toThrow();
  });
});
