
def is_won(matrix):
    """ Returns whether someone has won tic-tac-toe """
    return check_horiz(matrix) \
        or check_vert(matrix) \
        or check_diag(matrix)


def check_horiz(matrix):
    for i in range(3):
        row = matrix[i]
        if check_win(row):
            return check_win(row)

def check_vert(matrix):
    for c in range(3):
        col = []
        for r in range(3):
            col.append(matrix[r][c])
        if check_win(col):
            return check_win(col)

def check_diag(matrix):
    top_left = [matrix[0][0], matrix[1][1], matrix[2][2]]
    top_right = [matrix[0][2], matrix[1][1], matrix[2][0]]
    for diag in [top_left, top_right]:
        if check_win(diag):
            return check_win(diag)

def check_win(alist):
    if all(e == 'X' for e in alist):
        return 'X'
    if all(e == 'O' for e in alist):
        return 'O'

horiz = [
    ['X', 'X', 'X'],
    [ 'O', 'O', 'X'],
    [ 'O', 'X', 'O']
]

assert is_won(horiz) == 'X'

diag = [
    ['O', 'X', 'X'],
    [ 'O', 'O', 'X'],
    [ 'X', 'X', 'O']
]

assert is_won(diag) == 'O'

vert = [
    ['X', 'X', 'O'],
    [ 'O', 'X', 'X'],
    [ 'O', 'X', 'O']
]

assert is_won(vert) == 'X'

draw = [
    ['X', 'O', 'X'],
    [ 'O', 'X', 'X'],
    [ 'O', 'X', 'O']
]

assert is_won(draw) == None

print 'All tests pass!'
