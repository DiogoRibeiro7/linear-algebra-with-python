import { describe, it, expect } from "vitest";
import {
  intersecao_reta_plano,
  posicao_relativa_planos,
  posicao_relativa_retas_2d,
  posicao_relativa_retas_3d
} from "../src/geometry";
import { expectVectorClose } from "./testUtils";

describe("geometry", () => {
  it("posicao_retas_2d_intersecting", () => {
    expect(posicao_relativa_retas_2d([0, 0], [1, 1], [0, 1], [1, -1])).toBe("intersecting");
  });

  it("posicao_retas_2d_parallel", () => {
    expect(posicao_relativa_retas_2d([0, 0], [1, 0], [0, 1], [1, 0])).toBe("parallel");
  });

  it("posicao_retas_2d_coincident", () => {
    expect(posicao_relativa_retas_2d([0, 0], [1, 1], [1, 1], [2, 2])).toBe("coincident");
  });

  it("posicao_retas_3d_skew", () => {
    const result = posicao_relativa_retas_3d([0, 0, 0], [1, 0, 0], [0, 1, 1], [0, 1, 0]);
    expect(result).toBe("skew");
  });

  it("intersecao_reta_plano_known", () => {
    const p = intersecao_reta_plano([0, 0, 0], [1, 0, 0], [1, 0, 0], 2);
    expect(p).not.toBeNull();
    if (p) {
      expectVectorClose(p, [2, 0, 0], 1e-7);
    }
  });

  it("intersecao_reta_plano_parallel", () => {
    const p = intersecao_reta_plano([0, 0, 1], [1, 0, 0], [0, 0, 1], 0);
    expect(p).toBeNull();
  });

  it("posicao_planos", () => {
    expect(posicao_relativa_planos([1, 0, 0], 1, [1, 0, 0], 2)).toBe("parallel");
  });
});
