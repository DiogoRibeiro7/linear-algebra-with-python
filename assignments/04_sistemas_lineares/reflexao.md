# Reflection — Assignment 4

A system has a unique solution when the coefficient matrix has full rank, meaning there is a pivot in every variable. In terms of ranks, this occurs when rank(A) = rank([A|b]) = n, where n is the number of unknowns. The Rouché–Capelli theorem formalizes this relationship.

Gaussian elimination makes the classification visible by revealing pivots and contradictions. If a zero row appears with a nonzero entry in the augmented column, the system is inconsistent (SI). If there are fewer pivots than variables but no contradiction, the system has infinitely many solutions (SPI). Full pivot count means a unique solution (SPD).

Geometrically, each equation is a hyperplane. A unique solution is a single intersection point, infinite solutions mean the hyperplanes intersect along a line or plane, and no solution means the hyperplanes never meet at a common point.
