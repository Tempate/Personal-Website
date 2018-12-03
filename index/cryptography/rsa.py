from .api.BitwiseOperators import *
from .api.PrimeNumbers import *
from .api.BlockCipher import *


class RSA(object):
    def __init__(self):
        p, q = get_primes(2, bits=100)

        # RSA's security is based on factorization.
        self.n = p * q

        # Totient of n
        self.phi = (p - 1) * (q - 1)

        e = self.generate_public_key()

        # ed = 1 => d = e⁻¹
        d = self.generate_private_key(e)

        self.public_key = (e, self.n)
        self.private_key = (d, self.n)

    def generate_public_key(self):
        while True:
            e = random.randint(1, self.phi)
            if gcd(e, self.phi) == 1:
                return e

    def generate_private_key(self, e: int) -> int:
        """
        Current implementation uses the Extended Euclidean Algorithm.
        This algorithm is an efficient method for computing
        the greatest common divisor of two numbers.
        """
        return xgcd(e, self.phi) % self.phi


def encrypt(msg: str, key: List[int]) -> str:
    """
    Encrypts each byte using RSA. A real example would work with high primes and,
    therefore, it wouldn't generate a list of words but rather a list of bytes.
    Making it very hard to crack with known attacks.
    The most used one is factorization, despite it being 'impossible' on big primes.
    """
    cipher = ""

    for char in msg:
        cipher += number_to_format(ord(char), 8, "b")

    # x ** e (mod n)
    y = pow(int(cipher, 2), key[0], key[1])
    print(y)
    return number_to_msg(y)


def decrypt(msg: int, key: List[int]) -> str:
    """
    Follows the same equation as in the encryption.
    Different functions are used for easiness of use.
    """

    cipher = ""

    for char in msg:
        cipher += number_to_format(ord(char), 8, "b")

    print(int(cipher, 2))

    # x ** d (mod n)
    x = pow(int(cipher, 2), key[0], key[1])
    bytes_ = word_to_list(x, 8)

    plain_text = "".join([chr(byte) for byte in bytes_])

    return plain_text


def gcd(a: int, b: int) -> int:
    """
    Euclid's algorithm for determining the greatest common divisor.
    The iteration is used as it's faster for larger integers.
    """
    while b != 0:
        a, b = b, a % b

    return a


def xgcd(e: int, n: int) -> int:
    """
    The Extended Euclidean Algorithm, computes in addition, the coefficients
    of Bezout's identity, which are integers a and b such that:
        ax + by = gcd(a, b)
    """
    x0, x1, y0, y1 = 1, 0, 0, 1

    while n != 0:
        q, e, n = e // n, n, e % n
        x0, x1 = x1, x0 - q * x1
        y0, y1 = y1, y0 - q * y1

    return x0
