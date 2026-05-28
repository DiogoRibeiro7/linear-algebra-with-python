# Reflection — Assignment 3

The determinant measures the signed scaling of area (in 2D) or volume (in 3D) produced by a linear transformation. If a matrix transforms the unit square into a parallelogram with area 2, the determinant is 2; if it flips orientation, the determinant is negative. In higher dimensions, it generalizes to volume scaling.

When the determinant is zero, the transformation collapses the space into a lower-dimensional subspace. That means distinct input vectors can map to the same output, so the transformation is not one-to-one. Geometrically, a unit square can be flattened into a line segment, or a unit cube into a plane.

Because an inverse requires a one-to-one mapping, any matrix with det(A) = 0 is singular and has no inverse. This is also connected to linear dependence: if rows or columns are dependent, the transformation loses dimension, and the determinant becomes zero.
