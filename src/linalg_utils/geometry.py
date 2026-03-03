from __future__ import annotations

from collections.abc import Callable

import numpy as np
import numpy.typing as npt

Array = npt.NDArray[np.floating]


def _as_vector(v: npt.ArrayLike) -> Array:
    arr = np.array(v, dtype=float).reshape(-1)
    if arr.size == 0:
        raise ValueError("Vector must be non-empty.")
    return arr


def reta_2d(
    ponto: npt.ArrayLike,
    direcao: npt.ArrayLike,
    t_range: tuple[float, float] = (-5, 5),
    n: int = 100,
) -> tuple[Array, Array]:
    """Parametric line in R2.

    Args:
        ponto: Point on the line (2D).
        direcao: Direction vector (2D).
        t_range: Parameter range (min, max).
        n: Number of samples.

    Returns:
        Tuple (x, y) arrays.

    Raises:
        ValueError: If inputs are not 2D vectors or n is invalid.

    Example:
        >>> x, y = reta_2d([0, 0], [1, 2])
        >>> x.shape == y.shape
        True
    """
    p = _as_vector(ponto)
    d = _as_vector(direcao)
    if p.size != 2 or d.size != 2:
        raise ValueError("Point and direction must be 2D vectors.")
    if n <= 1:
        raise ValueError("n must be greater than 1.")
    t = np.linspace(t_range[0], t_range[1], n)
    x = p[0] + t * d[0]
    y = p[1] + t * d[1]
    return x, y


def reta_3d(
    ponto: npt.ArrayLike,
    direcao: npt.ArrayLike,
    t_range: tuple[float, float] = (-5, 5),
    n: int = 100,
) -> tuple[Array, Array, Array]:
    """Parametric line in R3.

    Args:
        ponto: Point on the line (3D).
        direcao: Direction vector (3D).
        t_range: Parameter range (min, max).
        n: Number of samples.

    Returns:
        Tuple (x, y, z) arrays.

    Raises:
        ValueError: If inputs are not 3D vectors or n is invalid.

    Example:
        >>> x, y, z = reta_3d([0, 0, 0], [1, 0, 0])
        >>> x.shape == y.shape == z.shape
        True
    """
    p = _as_vector(ponto)
    d = _as_vector(direcao)
    if p.size != 3 or d.size != 3:
        raise ValueError("Point and direction must be 3D vectors.")
    if n <= 1:
        raise ValueError("n must be greater than 1.")
    t = np.linspace(t_range[0], t_range[1], n)
    x = p[0] + t * d[0]
    y = p[1] + t * d[1]
    z = p[2] + t * d[2]
    return x, y, z


def plano_parametrico(
    ponto: npt.ArrayLike,
    v1: npt.ArrayLike,
    v2: npt.ArrayLike,
    s_range: tuple[float, float] = (-5, 5),
    t_range: tuple[float, float] = (-5, 5),
    n: int = 50,
) -> tuple[Array, Array, Array]:
    """Generate a parametric plane meshgrid.

    Args:
        ponto: Point on the plane (3D).
        v1: Direction vector 1 (3D).
        v2: Direction vector 2 (3D).
        s_range: Range for parameter s.
        t_range: Range for parameter t.
        n: Number of samples per parameter.

    Returns:
        Meshgrid arrays (X, Y, Z).

    Raises:
        ValueError: If inputs are not 3D vectors or n is invalid.

    Example:
        >>> X, Y, Z = plano_parametrico([0,0,0],[1,0,0],[0,1,0])
        >>> X.shape == Y.shape == Z.shape
        True
    """
    p = _as_vector(ponto)
    v1_arr = _as_vector(v1)
    v2_arr = _as_vector(v2)
    if p.size != 3 or v1_arr.size != 3 or v2_arr.size != 3:
        raise ValueError("Point and direction vectors must be 3D.")
    if n <= 1:
        raise ValueError("n must be greater than 1.")
    s = np.linspace(s_range[0], s_range[1], n)
    t = np.linspace(t_range[0], t_range[1], n)
    S, T = np.meshgrid(s, t)
    X = p[0] + S * v1_arr[0] + T * v2_arr[0]
    Y = p[1] + S * v1_arr[1] + T * v2_arr[1]
    Z = p[2] + S * v1_arr[2] + T * v2_arr[2]
    return X, Y, Z


def plano_cartesiano_para_parametrico(
    a: float, b: float, c: float, d: float
) -> tuple[Array, Array, Array]:
    """Convert a plane ax + by + cz = d to parametric form.

    Args:
        a: Plane coefficient.
        b: Plane coefficient.
        c: Plane coefficient.
        d: Plane constant.

    Returns:
        Tuple (point, v1, v2) where point is on the plane.

    Raises:
        ValueError: If the normal vector is zero.

    Example:
        >>> p, v1, v2 = plano_cartesiano_para_parametrico(1, 1, 1, 3)
        >>> abs(np.dot([1,1,1], p) - 3) < 1e-9
        True
    """
    n = np.array([a, b, c], dtype=float)
    if np.allclose(n, 0.0):
        raise ValueError("Plane normal vector cannot be zero.")

    if abs(c) > 1e-12:
        point = np.array([0.0, 0.0, d / c])
    elif abs(b) > 1e-12:
        point = np.array([0.0, d / b, 0.0])
    else:
        point = np.array([d / a, 0.0, 0.0])

    if abs(a) > 1e-12 or abs(b) > 1e-12:
        v1 = np.array([-b, a, 0.0], dtype=float)
    else:
        v1 = np.array([1.0, 0.0, 0.0], dtype=float)

    if abs(c) > 1e-12 or abs(a) > 1e-12:
        v2 = np.array([-c, 0.0, a], dtype=float)
    else:
        v2 = np.array([0.0, 0.0, 1.0], dtype=float)

    return point, v1, v2


def posicao_relativa_retas_2d(
    p1: npt.ArrayLike,
    d1: npt.ArrayLike,
    p2: npt.ArrayLike,
    d2: npt.ArrayLike,
    *,
    tol: float = 1e-12,
) -> str:
    """Classify the relative position of two lines in 2D.

    Args:
        p1: Point on line 1.
        d1: Direction of line 1.
        p2: Point on line 2.
        d2: Direction of line 2.
        tol: Tolerance for colinearity checks.

    Returns:
        "intersecting", "parallel", or "coincident".

    Raises:
        ValueError: If inputs are not 2D vectors.

    Example:
        >>> posicao_relativa_retas_2d([0,0],[1,0],[0,1],[1,0])
        'parallel'
    """
    p1_arr = _as_vector(p1)
    d1_arr = _as_vector(d1)
    p2_arr = _as_vector(p2)
    d2_arr = _as_vector(d2)
    if p1_arr.size != 2 or d1_arr.size != 2 or p2_arr.size != 2 or d2_arr.size != 2:
        raise ValueError("All inputs must be 2D vectors.")

    cross = d1_arr[0] * d2_arr[1] - d1_arr[1] * d2_arr[0]
    if abs(cross) > tol:
        return "intersecting"

    diff = p2_arr - p1_arr
    cross_diff = d1_arr[0] * diff[1] - d1_arr[1] * diff[0]
    if abs(cross_diff) <= tol:
        return "coincident"
    return "parallel"


def posicao_relativa_retas_3d(
    p1: npt.ArrayLike,
    d1: npt.ArrayLike,
    p2: npt.ArrayLike,
    d2: npt.ArrayLike,
    *,
    tol: float = 1e-12,
) -> str:
    """Classify the relative position of two lines in 3D.

    Args:
        p1: Point on line 1.
        d1: Direction of line 1.
        p2: Point on line 2.
        d2: Direction of line 2.
        tol: Tolerance for colinearity checks.

    Returns:
        "intersecting", "parallel", "coincident", or "skew".

    Raises:
        ValueError: If inputs are not 3D vectors.

    Example:
        >>> posicao_relativa_retas_3d([0,0,0],[1,0,0],[0,1,0],[1,0,0])
        'parallel'
    """
    p1_arr = _as_vector(p1)
    d1_arr = _as_vector(d1)
    p2_arr = _as_vector(p2)
    d2_arr = _as_vector(d2)
    if p1_arr.size != 3 or d1_arr.size != 3 or p2_arr.size != 3 or d2_arr.size != 3:
        raise ValueError("All inputs must be 3D vectors.")

    cross = np.cross(d1_arr, d2_arr)
    if np.linalg.norm(cross) <= tol:
        diff = p2_arr - p1_arr
        if np.linalg.norm(np.cross(diff, d1_arr)) <= tol:
            return "coincident"
        return "parallel"

    diff = p2_arr - p1_arr
    if abs(np.dot(diff, cross)) > tol:
        return "skew"

    A = np.column_stack([d1_arr, -d2_arr])
    sol, residuals, _, _ = np.linalg.lstsq(A, diff, rcond=None)
    if residuals.size == 0 or residuals[0] <= tol**2:
        return "intersecting"
    return "skew"


def posicao_relativa_planos(
    n1: npt.ArrayLike, d1: float, n2: npt.ArrayLike, d2: float, *, tol: float = 1e-12
) -> str:
    """Classify the relative position of two planes.

    Args:
        n1: Normal vector of plane 1.
        d1: Constant of plane 1 (n1 · x = d1).
        n2: Normal vector of plane 2.
        d2: Constant of plane 2.
        tol: Tolerance for colinearity checks.

    Returns:
        "secant", "parallel", or "coincident".

    Raises:
        ValueError: If normal vectors are invalid.

    Example:
        >>> posicao_relativa_planos([1,0,0], 1, [1,0,0], 2)
        'parallel'
    """
    n1_arr = _as_vector(n1)
    n2_arr = _as_vector(n2)
    if n1_arr.size != 3 or n2_arr.size != 3:
        raise ValueError("Normal vectors must be 3D.")
    cross = np.cross(n1_arr, n2_arr)
    if np.linalg.norm(cross) > tol:
        return "secant"

    k = None
    for i in range(3):
        if abs(n1_arr[i]) > tol:
            k = n2_arr[i] / n1_arr[i]
            break
    if k is None:
        raise ValueError("Normal vector cannot be zero.")

    if abs(d2 - k * d1) <= tol:
        return "coincident"
    return "parallel"


def intersecao_reta_plano(
    p_reta: npt.ArrayLike,
    d_reta: npt.ArrayLike,
    normal: npt.ArrayLike,
    d: float,
    *,
    tol: float = 1e-12,
) -> Array | None:
    """Compute the intersection point between a line and a plane.

    Args:
        p_reta: Point on the line.
        d_reta: Direction vector of the line.
        normal: Plane normal vector.
        d: Plane constant (normal · x = d).
        tol: Tolerance for parallelism checks.

    Returns:
        Intersection point as a 3D vector, or None if parallel and non-intersecting.

    Raises:
        ValueError: If inputs are not 3D vectors.

    Example:
        >>> intersecao_reta_plano([0,0,0],[1,0,0],[1,0,0],2)
        array([2., 0., 0.])
    """
    p = _as_vector(p_reta)
    dvec = _as_vector(d_reta)
    nvec = _as_vector(normal)
    if p.size != 3 or dvec.size != 3 or nvec.size != 3:
        raise ValueError("All vectors must be 3D.")

    denom = float(np.dot(nvec, dvec))
    if abs(denom) <= tol:
        if abs(np.dot(nvec, p) - d) <= tol:
            return p.astype(float)
        return None

    t = (d - np.dot(nvec, p)) / denom
    return (p + t * dvec).astype(float)


def superficie_cilindro(r: float = 1.0, h: float = 2.0, n: int = 50) -> tuple[Array, Array, Array]:
    """Generate a cylinder surface meshgrid.

    Args:
        r: Radius.
        h: Height.
        n: Number of samples.

    Returns:
        Meshgrid (X, Y, Z) for the cylinder.

    Raises:
        ValueError: If parameters are invalid.

    Example:
        >>> X, Y, Z = superficie_cilindro()
        >>> X.shape == Y.shape == Z.shape
        True
    """
    if r <= 0 or h <= 0 or n <= 1:
        raise ValueError("Invalid cylinder parameters.")
    theta = np.linspace(0.0, 2.0 * np.pi, n)
    z = np.linspace(0.0, h, n)
    Theta, Z = np.meshgrid(theta, z)
    X = r * np.cos(Theta)
    Y = r * np.sin(Theta)
    return X, Y, Z


def superficie_cone(r: float = 1.0, h: float = 2.0, n: int = 50) -> tuple[Array, Array, Array]:
    """Generate a cone surface meshgrid.

    Args:
        r: Radius at the top.
        h: Height.
        n: Number of samples.

    Returns:
        Meshgrid (X, Y, Z) for the cone.

    Raises:
        ValueError: If parameters are invalid.

    Example:
        >>> X, Y, Z = superficie_cone()
        >>> X.shape == Y.shape == Z.shape
        True
    """
    if r <= 0 or h <= 0 or n <= 1:
        raise ValueError("Invalid cone parameters.")
    theta = np.linspace(0.0, 2.0 * np.pi, n)
    z = np.linspace(0.0, h, n)
    Theta, Z = np.meshgrid(theta, z)
    R = (r / h) * Z
    X = R * np.cos(Theta)
    Y = R * np.sin(Theta)
    return X, Y, Z


def superficie_esfera(r: float = 1.0, n: int = 50) -> tuple[Array, Array, Array]:
    """Generate a sphere surface meshgrid.

    Args:
        r: Radius.
        n: Number of samples.

    Returns:
        Meshgrid (X, Y, Z) for the sphere.

    Raises:
        ValueError: If parameters are invalid.

    Example:
        >>> X, Y, Z = superficie_esfera()
        >>> X.shape == Y.shape == Z.shape
        True
    """
    if r <= 0 or n <= 1:
        raise ValueError("Invalid sphere parameters.")
    phi = np.linspace(0.0, np.pi, n)
    theta = np.linspace(0.0, 2.0 * np.pi, n)
    Phi, Theta = np.meshgrid(phi, theta)
    X = r * np.sin(Phi) * np.cos(Theta)
    Y = r * np.sin(Phi) * np.sin(Theta)
    Z = r * np.cos(Phi)
    return X, Y, Z


def superficie_revolucao(
    curva: Callable[[Array], tuple[Array, Array]],
    eixo: str = "z",
    t_range: tuple[float, float] = (0.0, 2.0),
    n: int = 50,
) -> tuple[Array, Array, Array]:
    """Generate a surface of revolution from a generating curve.

    Args:
        curva: Function curve(t) -> (r, z).
        eixo: Axis of revolution ("x", "y", or "z").
        t_range: Parameter range for the curve.
        n: Number of samples.

    Returns:
        Meshgrid (X, Y, Z) for the surface.

    Raises:
        ValueError: If the axis or parameters are invalid.

    Example:
        >>> def c(t): return (t, t**2)
        >>> X, Y, Z = superficie_revolucao(c, eixo="z")
        >>> X.shape == Y.shape == Z.shape
        True
    """
    if eixo not in {"x", "y", "z"}:
        raise ValueError("Axis must be 'x', 'y', or 'z'.")
    if n <= 1:
        raise ValueError("n must be greater than 1.")

    t = np.linspace(t_range[0], t_range[1], n)
    r_vals, z_vals = curva(t)
    r_vals = np.array(r_vals, dtype=float)
    z_vals = np.array(z_vals, dtype=float)
    theta = np.linspace(0.0, 2.0 * np.pi, n)
    Theta, R = np.meshgrid(theta, r_vals)
    Z = np.tile(z_vals.reshape(-1, 1), (1, n))

    if eixo == "z":
        X = R * np.cos(Theta)
        Y = R * np.sin(Theta)
        return X, Y, Z
    if eixo == "x":
        Y = R * np.cos(Theta)
        Z = R * np.sin(Theta)
        X = np.tile(z_vals.reshape(-1, 1), (1, n))
        return X, Y, Z

    X = R * np.cos(Theta)
    Z = R * np.sin(Theta)
    Y = np.tile(z_vals.reshape(-1, 1), (1, n))
    return X, Y, Z
