# Reflection — Assignment 2

Matrix multiplication is not commutative: in general AB ≠ BA. This is not an arbitrary rule but a direct consequence of how multiplication is defined. Each entry of AB is a dot product of a row of A with a column of B, and swapping the order changes which rows and columns interact. Two matrices may even have AB defined but BA undefined if their dimensions are incompatible.

The product Ax can be read as a linear combination of the columns of A, weighted by the entries of x. This column-space interpretation is central to understanding what a matrix "does": it maps vectors into the span of its columns. When we solve Ax = b, we are asking whether b can be written as such a combination.

Transpose properties like (AB)ᵀ = BᵀAᵀ mirror the reversal seen in inverses: (AB)⁻¹ = B⁻¹A⁻¹. Both reflect the fact that composed operations must be undone in reverse order. Verifying these identities computationally reinforces algebraic intuition with concrete numerical evidence.
