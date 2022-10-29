const model = (() => {
    const array = (length, init) => Array.apply(null, new Array(length)).map(init || (_ => undefined))
    const updateArray = (a, i, f) => a.map((e, j) => (i === j) ? f(e, j) : e)

    function createModel(board, inTurn, gameNumber, moves) {
        const setTile = (board, x, y, value) => updateArray(board, x, row => updateArray(row, y, _ => value))
        
        const row = (x, y, dx, dy) => array(board.length, (_, i) => ({x: x + i * dx, y: y + i * dy}))
        const verticalRows = array(board.length, (_, i) => row(0, i, 1, 0))
        const horizontalRows = array(board.length, (_, i) => row(i, 0, 0, 1))
        const diagonalRows = [row(0, 0, 1, 1), row(0, 2, 1, -1)]
        const allRows = verticalRows.concat(horizontalRows).concat(diagonalRows)
        const plateFull = board.every(row => row.every(x => x))
        
        const hasWon = (theRow, candidate) =>  theRow.every(({x, y}) => board[x][y] === candidate)
        const winningRow = (candidate) => allRows.find(x => hasWon(x, candidate))
        const getWinner = (candidate) => {
            const w = winningRow(candidate)
            return w && { winner: candidate, row : w }
        }
        const winState = getWinner('X') || getWinner('O')
        const stalemate = plateFull && !winState
        
        const legalMove = (x, y) => {
            if (x < 0 || y < 0 || x > 2 || y > 2) return false
            if (board[x][y]) return false
            if (winState || stalemate) return false
            return true
        }
        
        const makeMove = (x, y) => {
            if (!legalMove(x, y)) throw 'Illegal move'
            return createModel(setTile(board, x, y, inTurn), (inTurn === 'X') ? 'O' : 'X', gameNumber, [...moves, {x, y, player: inTurn}])
        }
        
        const json = (extras = {}) => ({...extras, board, inTurn, winner: winState, stalemate, gameNumber})

        const conceded = winner => {
            const winState = { winner, row: undefined}
            const conceded_state = { 
                winState, 
                stalemate: false, 
                playerInTurn: inTurn, 
                legalMove: () => false, 
                makeMove: () => conceded_state,
                conceded: () => conceded_state, 
                board, 
                json: (extras = {}) => Object.assign(extras,  {board, inTurn, winState, stalemate, gameNumber}), 
                gameNumber, 
                moves: [...moves, { conceded: true, player: inTurn }]
            }
            return conceded_state
        }
        
        return { 
            winState, 
            stalemate, 
            playerInTurn: inTurn, 
            legalMove, 
            makeMove,
            conceded, 
            board, 
            json, 
            gameNumber, 
            moves 
        }
    }

    return gameNumber => createModel(array(3, _ => array(3)), 'X', gameNumber, [])
})()

module.exports = model
