"""
Implements Min Binary Heap ADT
"""


class BinHeap(object):
    """ Min Bineary Heap Implementation """

    def __init__(self):
        self.heap_list = [0]
        self.current_size = 0

    def __repr__(self):
        return repr(self.heap_list)

    @staticmethod
    def factory(alist):
        """ constructs a min binary heap from a list """
        pass

    def insert(self, k):
        """ Add a new item to the heap """
        self.heap_list.append(k)
        k_index = self.current_size + 1
        self._swap_up(k_index)
        self.current_size += 1

    def find_min(self):
        """ Returns the min node, i.e. the root """
        return self.heap_list[1]

    def del_min(self):
        """ Removes the root node and reconstructs the heap """
        min_node = self.heap_list[1]
        self.heap_list[1] = self.heap_list.pop()
        self.current_size -= 1
        self._swap_down(1)
        return min_node

    def is_empty(self):
        """ Indicates whether heap is empty """
        return self.current_size == 0

    def size(self):
        """ Returns number of nodes in the heap """
        return self.current_size

    def _swap_pc(self, child_i, parent_i):
        """ Swaps values at parent and child indices """
        tmp = self.heap_list[parent_i]
        self.heap_list[parent_i] = self.heap_list[child_i]
        self.heap_list[child_i] = tmp

    def _swap_up(self, i):
        """ Swaps a node at index i up until it is in the right palce """
        done_swapping = False
        while i // 2 > 0 and not done_swapping:
            child_i, parent_i = i, i // 2
            if self.heap_list[child_i] < self.heap_list[parent_i]:
                self._swap_pc(child_i, parent_i)
                i = i // 2
            else:
                done_swapping = True

    def _swap_down(self, i):
        """ Swaps a node at index i down until it is in the right place """
        done_swapping = False
        while (i * 2) <= self.current_size and not done_swapping:
            mc_index = self._get_mc_index(i)
            child_i, parent_i = mc_index, i
            if self.heap_list[child_i] < self.heap_list[parent_i]:
                self._swap_pc(child_i, parent_i)
                i = mc_index
            else:
                done_swapping = True

    def _get_mc_index(self, i):
        """ Returns the index of minimum child of node at position i """
        if (2 * i) + 1 > self.current_size:
            return 2 * i
        left, right = 2 * i, (2 * i) + 1
        left_c, right_c = self.heap_list[left], self.heap_list[right]
        return left if left_c <= right_c else right
