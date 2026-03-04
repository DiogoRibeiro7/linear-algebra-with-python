import { describe, it, expect } from "vitest";
import {
  classificar_matriz,
  criar_diagonal,
  criar_identidade,
  criar_matriz_nula,
  criar_simetrica,
  dimensao
} from "../src/matrices";
import { expectMatrixClose } from "./testUtils";

function isAllZero(A: number[][]): boolean {
  return A.every((row) => row.every((v) => Math.abs(v) <= 1e-12));
}

function identity(n: number): number[][] {
  const out = Array.from({ length: n }, () => new Array(n).fill(0));
  for (let i = 0; i < n; i += 1) {
    out[i][i] = 1;
  }
  return out;
}

describe("matrices", () => {
  it("criar_matriz_nula", () => {
    const A = criar_matriz_nula(3, 4);
    expect(A.length).toBe(3);
    expect(A[0].length).toBe(4);
    expect(isAllZero(A)).toBe(true);
  });

  it("criar_identidade", () => {
    const I = criar_identidade(4);
    expectMatrixClose(I, identity(4));
  });

  it("classificar_identidade", () => {
    const labels = classificar_matriz(identity(3));
    expect(labels).toEqual([
      "square",
      "identity",
      "diagonal",
      "symmetric",
      "upper_triangular",
      "lower_triangular"
    ]);
  });

  it("classificar_retangular", () => {
    const A = [
      [1, 2, 3],
      [4, 5, 6]
    ];
    expect(classificar_matriz(A)).toEqual(["rectangular"]);
  });

  it("classificar_simetrica", () => {
    const S = criar_simetrica(4, 0);
    const labels = classificar_matriz(S);
    expect(labels).toContain("symmetric");
    expect(labels).toContain("square");
  });

  it("dimensao", () => {
    const A = criar_diagonal([1, 2, 3]);
    expect(dimensao(A)).toEqual([3, 3]);
  });
});
