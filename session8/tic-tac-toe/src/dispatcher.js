const call_server = (url, init) => 
  fetch(url, init)
  .then(res => res.ok ? res.json() : Promise.reject(res.status))


const wait_for = (url, condition) => {
  const loop = async (resolve, reject) => {
    try {
      const res = await fetch(url)
      const json = await res.json()
      if (res.ok && condition(json))
        resolve(json)
      else
        setTimeout(loop, 100, resolve, reject)
    } catch (error) {
      reject(error)
    }
  }
  return new Promise(loop)
}

const run_moves_updater = async (gameNumber, dispatch) => {
  const updater = async original_moves => {
    const response = await fetch(`http://localhost:8080/games/${gameNumber}/moves`)
    const json = await response.json()
    if (json.moves.length > original_moves.length) {
      console.log(json)
      const state = await dispatch({
        type: 'make-moves', 
        moves: json.moves.slice(original_moves.length),
        inTurn: json.inTurn,
        winner: json.winner,
        stalemate: json.stalemate
      })
      console.log(state)
      if (state.game.winner || state.game.stalemate) return;
    }
    setTimeout(updater, 100, json.moves)
  }
  const res = await fetch(`http://localhost:8080/games/${gameNumber}/moves`)
  const { moves } = await res.json()
  updater(moves)
}

const server_dispatch = async (action, dispatch) => {
  switch(action.type) {
    case 'new': {
      const game = await call_server('http://localhost:8080/games', { method: 'POST' })
      const { game:{gameNumber}, player } = await dispatch({type: 'reset', player: 'X', game})
      const ongoing_game = await wait_for(`http://localhost:8080/games/${gameNumber}`, game => game.ongoing)
      run_moves_updater(gameNumber, dispatch)
      return await dispatch({type: 'reset', player, game: ongoing_game})
    }
    case 'join': {
      const game = await call_server(`http://localhost:8080/games/${action.gameNumber}`, { method: 'PATCH', body: JSON.stringify({ongoing: true})})
      const state = await dispatch({type: 'reset', player: 'O', game})
      run_moves_updater(state.game.gameNumber, dispatch)
      return state
    }
    case 'move': {
      const { x, y, player } = action
      const { moves, inTurn, winner, stalemate } = await call_server(
        `http://localhost:8080/games/${action.gameNumber}/moves`, 
        { method: 'POST', body: JSON.stringify({x, y, inTurn: player})})
        return await dispatch({type: 'make-moves', moves, inTurn, winner, stalemate})
    }
    case 'concede': {
      const winner  = action.player === 'X' ? 'O' : 'X'
      const game = await call_server(`http://localhost:8080/games/${action.gameNumber}`, { method: 'PATCH', body: JSON.stringify({winner})})
      return await dispatch({type: 'reset', player: action.player, game})
    }
    default:
      return null
  }
}

const create_dispatcher = store => {
  const dispatch = async action => {
    const res = await server_dispatch(action, dispatch)
    return res || store.onAction(action)
  }
  return dispatch
}

export default create_dispatcher
