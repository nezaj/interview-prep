"""
Implement rand7() using rand5()
"""
import random

def rand2():
    """
    Returns 1 or 2 with equal probability by using rand5
    -- Returns 1 if rand5() == 1, 3
    -- Returns 0 if rand5() == 2, 4
    -- Re-runs rand2() if rand5() == 5
    """
    val = rand5()
    if val == 5:
        val = rand2()
    return val % 2

def rand5():
    return random.randint(1, 5)

def rand7():
    val = (4 * rand2()) + (2 * rand2()) + rand2()
    if val == 0:
        val = rand7()  # Repeat process, we want to return 1 - 7
    return val
