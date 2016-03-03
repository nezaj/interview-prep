"""
ADT to represent Fractions
"""

class Fraction(object):

    def __init__(self, num, den):
        common = self.gcd(num, den)
        self.num = num / common
        self.den = den / common

    def get_num(self):
        return self.num

    def get_den(self):
        return self.den

    def __add__(self, other):
        new_num = (self.num * other.den) + (other.num * self.den)
        new_den = (self.den * other.den)
        return Fraction(new_num, new_den)

    def __sub__(self, other):
        new_num = (self.num * other.den) - (other.num * self.den)
        new_den = (self.den * other.den)
        return Fraction(new_num, new_den)

    def __str__(self):
        if self.num == 0:
            return "0"
        elif self.den == 1:
            return str(self.num)
        else:
            return "{}/{}".format(self.num, self.den)

    def __repr__(self):
        return str(self)

    @staticmethod
    def gcd(m, n):
        """Returns GCD of two numbers using Euclid's Algorithim"""
        dividend, divisor = max(m, n), min(m, n)
        remainder = dividend % divisor
        while remainder != 0:
            dividend = divisor
            divisor = remainder
            remainder = dividend % divisor
        return divisor
