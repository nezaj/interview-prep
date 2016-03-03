"""
Road Reform: https://www.hackerrank.com/contests/w17/challenges/roads-building
Problem Statement

The road network of Byteland can be described as a graph with N nodes, describing the cities, and M edges, describing the roads. Historically, all the roads are toll roads, so each road has positive integer cost associated with it. Moreover, all the roads are bidirectional and you can reach any city from any other city of Byteland by roads.

Historically, there are two capital cities in Byteland - ByteCity and St. Byteburg. They are described as the nodes with the numbers 1 and N respectively.

Now it's time for a road reform in Byteland. The treasury has enough funds for building exactly one bidirectional road with an arbitrary positive integer cost between any pair of different cities. In order for the reform to be efficient, there is a requirement that the shortest distance between ByteCity and St. Byteburg should decrease.

Please count the number of ways the road reform can be performed, i.e. find the number of ways to build a road with a positive integer cost between an unordered pair of different cities so that the distance between the cities 1 and N decrease.
"""
from collections import deque

class Vertex(object):

    def __init__(self, key):
        self.key = key
        self.neighbors = {}

    def add_neighbor(self, n, cost):
        self.neighbors[n] = cost

    def __repr__(self):
        return "V{}: {}".format(self.key, self.neighbors)

class Edge(object):

    def __init__(self, start, end, cost):
        self.start = start
        self.end = end
        self.cost = cost

    def __repr__(self):
        return "Edge: {} <-> {}, Cost: {}".format(self.x, self.y, self.cost)

class Graph(object):

    @staticmethod
    def factory(vertices, edges):
        for e in edges:
            v = vertices[e.start - 1]
            v.add_neighbor(e.end, e.cost)

        return Graph(vertices)

    def __init__(self, vertices):
        self.vertices = {v.key: v for v in vertices}

    def get_vertex(self, v):
        return self.vertices[v]

    def paths(self, s, e, path=[]):
        start = self.vertices[s]
        end = self.vertices[e]
        path = path + [start.key]
        if start == end:
            return path
        routes = []
        for neighbor in start.neighbors:
            route = self.paths(neighbor, e, path)
            if route:
                routes.append(route)

        return routes

    def __repr__(self):
        return str(self.vertices)

vertices = [Vertex(i) for i in range(1, 4)]
e1 = Edge(1, 3, 4)
e2 = Edge(1, 2, 1)
e3 = Edge(2, 3, 2)
edges = [e1, e2, e3]
graph = Graph.factory(vertices, edges)
print graph.paths(1, 3)
