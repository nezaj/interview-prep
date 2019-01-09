"""
Implements HashMap ADT
"""
# import hashlib
#
# class HashMap(object):
#     SIZE = 1000
#
#     @staticmethod
#     def factory(pairs):
#         hm = HashMap()
#         for k, v in pairs:
#             hm[k] = v
#         return hm
#
#     @staticmethod
#     def _hash(key):
#         for c in key:
#
#         hash_object = hashlib.sha256(b'${key}')
#         import pdb; pdb.set_trace()
#         hex_dig = hash_object.hexdigest()
#         return hex_dig % HashMap.SIZE
#
#     def __init__(self):
#         self.data = [None] * HashMap.SIZE
#
#     def __getitem__(self, key):
#         hash = self._hash(key)
#         self.data[hash]
#
#     def __setitem__(self, key, value):
#         hash = self._hash(key)
#         self.data[hash] = value
#
#     def __repr__(self):
#         return repr(self.data)
#
#     def __len__(self):
#         return len(self.data)
#

pairs = [
    ('a', 10),
    ('b', 10),
    ('c', 2),
    ('e', 100),
    ('a', 100),
]

h = HashMap.factory(pairs)
assert h['a'] == 100

print('All tests pass!')
