import { expect } from "vitest";

export function expectClose(actual: number, expected: number, tol = 1e-7): void {
  expect(Math.abs(actual - expected)).toBeLessThanOrEqual(tol);
}

export function expectVectorClose(actual: number[], expected: number[], tol = 1e-7): void {
  expect(actual.length).toBe(expected.length);
  for (let i = 0; i < actual.length; i += 1) {
    expectClose(actual[i], expected[i], tol);
  }
}

export function expectMatrixClose(actual: number[][], expected: number[][], tol = 1e-7): void {
  expect(actual.length).toBe(expected.length);
  expect(actual[0].length).toBe(expected[0].length);
  for (let i = 0; i < actual.length; i += 1) {
    for (let j = 0; j < actual[0].length; j += 1) {
      expectClose(actual[i][j], expected[i][j], tol);
    }
  }
}
