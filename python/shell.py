"""
Bootstrap ipython interperter with useful imports. Handy for debugging
Usage: ipython -i shell.py
"""
from data_structures import BinHeap, Stack
from problem_solving import Fraction

b = BinHeap()
b.insert(1)
b.insert(2)
b.insert(3)
b.insert(4)
b.insert(5)
