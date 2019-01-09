"""
1.7 Rotate Matrix: Given an image represented by an NxN matrix, where each pixel in the image is 4 bytes, write a method to rotate the image by 90 degrees. Can you do this in place?
"""
def rotate(matrix):
    # Idea is to do this in layers going from outer to inner
    # We rotate like so

    # Exit if not N x N matrix
    if (len(matrix) == 0 or len(matrix) != len(matrix[0])):
        return False

    n = len(matrix)
    max_layers = n // 2
    for layer in range(0, max_layers):
        first = layer
        last = n - 1 - layer

        for i in range(first, last):
            offset = i - first

            # save top
            top = matrix[first][i]

            # left -> top
            matrix[first][i] = matrix[last - offset][first]

            # bottom -> left
            matrix[last - offset][first] = matrix[last][last - offset]

            # right -> bottom
            matrix[last][last - offset] = matrix[i][last]

            # top -> right
            matrix[i][last] = top

    return matrix

matrix = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
]

rotated = [
    [7, 4, 1],
    [8, 5, 2],
    [9, 6, 3],
]

assert rotate(matrix) == rotated

print('All tests pass!')
