"""
Given that integers are read from a data stream, find the median of elements read so far in an efficient way.
"""
from __future__ import division
import heapq


class StreamedMedian(object):
    """
    Efficent data structure for finding medians from a streamed input
    of numbers. Use two heaps to keep track of median
    """

    def __init__(self):
        self.max_heap, self.min_heap = [], []
        self.n = 0

    def insert(self, val):
        if self.n % 2 == 0:
            self.n += 1
            heapq.heappush(self.max_heap, -1 * val)
            if len(self.min_heap) == 0:
                return
            if -1 * self.max_heap[0] > self.min_heap[0]:
                to_min = -1 * heapq.heappop(self.max_heap)
                to_max = -1 * heapq.heappop(self.min_heap)
                heapq.heappush(self.max_heap, to_max)
                heapq.heappush(self.min_heap, to_min)
        else:
            self.n += 1
            to_min = -1 * heapq.heappushpop(self.max_heap, -1 * val)
            heapq.heappush(self.min_heap, to_min)

    def get_median(self):
        if self.n % 2 == 0:
            return (-1 * self.max_heap[0] + self.min_heap[0]) / 2
        else:
            return -1 * self.max_heap[0]

    def __repr__(self):
        return repr((self.max_heap, self.min_heap))

sm = StreamedMedian()
for i in range(1, 10):
    sm.insert(i)
    exp = 1.0 + (0.5 * (i-1))
    act = sm.get_median()
    assert act == exp, 'Got {} -- Expected {}'.format(act, exp)

print 'All tests pass!'
