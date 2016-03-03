
def memoize(f):
    cache = {}
    def wrapper(*args):
        if args in cache:
            return cache[args]
        else:
            cache[args] = f(*args)
            return cache[args]
    return wrapper

@memoize
def fib(n):
    """ Return nth fibonacii number recursively """
    if n < 1:
        raise ValueError, "Provided {}: Must provide value > 1".format(n)
    if n == 1:
        return 1
    if n == 2:
        return 1

    return fib(n - 1) + fib(n - 2)
