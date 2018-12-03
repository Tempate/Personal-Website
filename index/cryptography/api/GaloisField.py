from .BitwiseOperators import *

import numpy as np


def inv_mix_columns(state: List[int]) -> List[int]:
    for i in range(0, 16, 4):
        a = np.zeros((4,), dtype=object)
        b = np.zeros((4,), dtype=object)
        # a is a copy of the input array
        # b is a multiplied by 2

        for j in range(4):
            a[j] = state[j]
            # Implicitly removes high bit because b[i] is an 8-bit char,
            # so we xor by 0x1b and not by 0x11b in the next line.
            b[j] = shift(state[j], 1, size=8, d="left")
            # Rijndael's Galois Field
            if int(state[j]) >= 128:
                b[j] ^= 0x1B  # Rijndael's indivisible polynomial.

        state[i+0] = b[0] ^ a[3] ^ a[2] ^ b[1] ^ a[1]   # 2 * a0 + a3 + a2 + 3 * a1
        state[i+1] = b[1] ^ a[0] ^ a[3] ^ b[2] ^ a[2]   # 2 * a1 + a0 + a3 + 3 * a2
        state[i+2] = b[2] ^ a[1] ^ a[0] ^ b[3] ^ a[3]   # 2 * a2 + a1 + a0 + 3 * a3
        state[i+3] = b[3] ^ a[2] ^ a[1] ^ b[0] ^ a[0]   # 2 * a3 + a2 + a1 + 3 * a4

    return state


def matrix_mult(A, B) -> List[int]:
    x = np.zeros((4,4), dtype=object)

    for i in range(A.shape[0]):
        for j in range(B.shape[1]):
            for k in range(A.shape[1]):
                x[i, j] ^= rijn_mult(B[k, j], A[i, k])

    return matrix_to_list(x.T)


def rijn_mult(x, y):
    return globals()["times%d" % y](x)


def times1(x):
    return x


def times2(x):
    # Implicitly removes high bit because b[i] is an 8-bit char,
    # so we xor by 0x1b and not by 0x11b in the next line.
    y = shift(x, 1, size=8, d="left")
    # Rijndael's Galois Field
    if int(x) >= 128:
        y ^= 0x1B  # Rijndael's indivisible polynomial.

    return y


def times3(x):
    return times2(x) ^ x


def times9(x):
    return times2(times2(times2(x))) ^ x


def times11(x):
    return times2(times2(times2(x)) ^ x) ^ x


def times13(x):
    return times2(times2(times2(x) ^ x)) ^ x


def times14(x):
    return times2(times2(times2(x) ^ x) ^ x)


def list_to_matrix(b: List[int]):
    """ Converts a list of size 16 to a transposed (4x4) matrix. """
    b = np.matrix(b, dtype=int)
    b = np.reshape(b, (4, 4))
    return np.transpose(b)


def matrix_to_list(A):
    return np.array(A).reshape(-1,).tolist()
