# Reflection — Assignment 8

The condition number of a matrix measures how much errors in the input can be amplified in the solution. It is the ratio of the largest to the smallest singular value, so a large condition number means the system is ill-conditioned. In practice, this means that small measurement errors in b can lead to large errors in x.

In applied contexts such as manufacturing, engineering, and finance, this matters because data is never exact. A high condition number indicates that the computed solution is sensitive and potentially unreliable, even if the computation is performed correctly.

Geometrically, an ill-conditioned system corresponds to nearly parallel planes: they intersect at a point, but the intersection is extremely sensitive to small changes. This geometric view helps explain why solutions can vary widely with minor perturbations.

Although Gauss, Cramer, and inverse methods are mathematically equivalent, they differ in computational cost and numerical stability. The condition number provides a practical criterion for deciding how much trust to place in the solution.
