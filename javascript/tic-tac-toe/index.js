(function () {
  // Main object which holds all our game properties and logic.
  // board: keeps track of values of X's and O's
  // turn: Keeps track of who's turn it is
  // status: Records whether the game is currently being played, x wins, o wins,
  // or the game is a draw.
  function Game () {
    this.board = []
    this.turn = 'X'
    this.status = 'playing'
  }

  // Initialize the board as a 3x3 matrix of Cells
  Game.prototype.initializeBoard = function () {
    for (var i = 0; i < 3; i++) {
      var row = []
      for (var j = 0; j < 3; j++) {
        var id = '' + i + '-' + j
        row.push(new Cell(id))
      }
      this.board.push(row)
    }
  }

  // Add the board and information to the DOM
  Game.prototype.drawGame = function (container) {
    var table = document.createElement('table')

    // Draw board
    this.board.forEach(function (row) {
      var rowHTML = document.createElement('tr')
      row.forEach(function (cell) {
        var cellHTML = document.createElement('td')
        cellHTML.setAttribute('id', cell.id)
        rowHTML.appendChild(cellHTML)
      })
      table.appendChild(rowHTML)
    })
    container.innerHTML = table.outerHTML

    // Add turn information
    var info = document.createElement('h2')
    info.setAttribute('id', 'info')
    this.updateInfo('Current turn: ' + this.turn, info)
    container.appendChild(info)

    // Add a New Game button
    var new_game = document.createElement('button')
    new_game.setAttribute('id', 'new-game')
    new_game.innerHTML = 'New Game'
    container.appendChild(new_game)
  }

  Game.prototype.addClickHandlers = function () {
    var that = this

    // Handle clicking on cells
    var cells = [].slice.call(document.getElementsByTagName('td'))
    cells.forEach(function (cell) {
      cell.addEventListener('click', that.handleClick.bind(that))
    })

    // Handle clicking new game
    var new_game = document.getElementById('new-game')
    new_game.addEventListener('click', newGame)
  }

  // We check the rows, columns, and diagonals for a
  // win. If there is none we check to see if all the squares are filled.
  // In this case the game is a draw. Update the status if one of these
  // terminal conditions is true
  Game.prototype.isOver = function () {
    var values = this.board.map(function (row) {
      return row.map(function (cell) { return cell.value })
    })

    var x_wins, o_wins, i, length

    // Check rows
    if (this.status === 'playing') {
      for (i = 0, length = values.length; i < length; i++) {
        var row = values[i]

        x_wins = row.every(function (v) { return v === 'X' })
        if (x_wins) {
          this.status = 'X Wins!'
          break
        }

        o_wins = row.every(function (v) { return v === 'O' })
        if (o_wins) {
          this.status = 'O Wins!'
          break
        }
      }
    }

    // Check columns
    if (this.status === 'playing') {
      for (i = 0, length = values.length; i < length; i++) {
        var col = [values[0][i], values[1][i], values[2][i]]

        x_wins = col.every(function (v) { return v === 'X' })
        if (x_wins) {
          this.status = 'X Wins!'
          break
        }

        o_wins = col.every(function (v) { return v === 'O' })
        if (o_wins) {
          this.status = 'O Wins!'
          break
        }
      }
    }

    // Check diagonals
    if (this.status === 'playing') {
      var diag1 = [values[0][0], values[1][1], values[2][2]]
      var diag2 = [values[2][0], values[1][1], values[0][2]]

      x_wins = diag1.every(function (v) { return v === 'X' }) ||
        diag2.every(function (v) { return v === 'X' })
      if (x_wins) {
        this.status = 'X Wins!'
      }

      o_wins = diag1.every(function (v) { return v === 'O' }) ||
        diag2.every(function (v) { return v === 'O' })
      if (o_wins) {
        this.status = 'O Wins!'
      }
    }

    // Check for draw
    if (this.status === 'playing') {
      var full = values.every(function (row) {
        return row.every(function (v) { return v !== '' })
      })
      if (full) { this.status = 'Draw!' }
    }

    // Update info if terminal condition
    if (this.status !== 'playing') {
      this.updateInfo(this.status)
    }
  }

  Game.prototype.handleClick = function (e) {
    // No-op if square is filled or game is over
    if (!e.target.innerHTML && this.status === 'playing') {
      // Draw the player's mark on the square
      e.target.innerHTML = this.turn

      // Update board value
      var row = e.target.id[0]
      var col = e.target.id[2]
      this.board[row][col].value = this.turn

      // Update turn
      this.turn = this.turn === 'X' ? 'O' : 'X'
      this.updateInfo('Current turn: ' + this.turn)

      // Check if game is over
      this.isOver()
    }
  }

  Game.prototype.updateInfo = function (info, target) {
    target = target || document.getElementById('info')
    target.innerHTML = info
  }

  // Helper object for representing individual cell data
  function Cell (id) {
    this.value = ''
    this.id = id
  }

  // Starts a new tic-tac-toe Game
  function newGame () {
    var container = document.getElementById('container')
    var g = new Game()
    g.initializeBoard()
    g.drawGame(container)
    g.addClickHandlers()
  }

  newGame()
})()
