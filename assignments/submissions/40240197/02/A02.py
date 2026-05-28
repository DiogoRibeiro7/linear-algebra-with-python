import numpy as np

# Step 1: Define matrices
A = np.array([
    [1, 2, 3],
    [4, 5, 6]
])  # 2x3

C = np.array([
    [1, 0],
    [0, 1],
    [1, 1]
])  # 3x2

# Step 2: Compute products
AC = A @ C
CA = C @ A

# Step 3: Print results
print("Matrix A (2x3):\n", A)
print("Shape of A:", A.shape)

print("\nMatrix C (3x2):\n", C)
print("Shape of C:", C.shape)

print("\nProduct AC (A @ C):\n", AC)
print("Shape of AC:", AC.shape)

print("\nProduct CA (C @ A):\n", CA)
print("Shape of CA:", CA.shape)

# Step 4: Explanation
print("\n--- Explanation ---")
print("A is 2x3 and C is 3x2.")
print("AC is valid because inner dimensions match (3). Result is 2x2.")
print("CA is valid because inner dimensions match (2). Result is 3x3.")
print("AC and CA are not equal because matrix multiplication is not commutative.")