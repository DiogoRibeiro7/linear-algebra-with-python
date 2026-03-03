# Reflection — Assignment 5

Cramer's rule is most useful for very small systems (2×2 or 3×3) and for symbolic reasoning, because it provides explicit formulas for each variable. However, its computational cost grows extremely fast (roughly O(n·n!)), making it impractical for larger systems.

Gaussian elimination is a general-purpose method with O(n³) complexity. It works for any system and naturally reveals whether the system has a unique solution, infinite solutions, or no solution. It is a good default method for most problems.

LU decomposition is preferred when the same matrix A is used with multiple right-hand sides b. The expensive factorization is done once (O(n³)), and each additional solve is much cheaper (O(n²)). This is common in engineering and simulation tasks.
