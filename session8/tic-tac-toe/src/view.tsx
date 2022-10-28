import { Store } from '@reduxjs/toolkit';
import * as React from 'react';
import { Provider, useSelector, useDispatch } from 'react-redux'
import { State } from './store';
import './view.css';

const Lobby = () => {
  const games = useSelector((s: State) => s.lobby)

  return (
    <div>
      <h1>Lobby</h1>
      {
        games.map(({gameNumber}) => 
          <div key={gameNumber}>
            Game {gameNumber}
          </div>)
      }
      <button id = 'new'>New game</button>
    </div>
  )
}

export const View = (store: Store<State>) =>
<Provider store={store}>
  <Lobby></Lobby>
</Provider>

/*
const Message = ({status: {winner, inTurn, stalemate, ongoing}, player}) => {
  if (winner)
  return <p>{winner.winner} won!</p>
  else if (stalemate)
  return <p>Stalemate!</p>
  else if (!ongoing || player !== inTurn) 
  return <p>Waiting for player...</p>
  else    
  return <p>Your turn, {inTurn}</p>
}        

const Board = ({ game: { board, gameNumber }, dispatch, player }) =>
<table>
<tbody>
{board.map((row, x) =>
          <tr key={x}>{row.map ( (tile, y) => 
            <td key={x+''+y}
            className={tile || 'blank'}
            onClick= {() => dispatch({type:'move', x, y, player, gameNumber })}/>)
          }</tr>
          )}
          </tbody>
          </table>
          
          const GamesList = ({ games, dispatch }) => (
            <div>
            {games.map(({gameNumber}) => 
            <div 
            key={gameNumber}
            onClick={() => dispatch({type: 'join', gameNumber})}>
            Game {gameNumber}
            </div>)}
            </div>
            )
            
            const game_list_view = dispatch => ({ games }) => 
            <div>
            <h1>Choose game</h1>
            <GamesList games={games} dispatch = {dispatch} />
            <button id = 'new' onClick = { () => dispatch({type: "new"})}>New game</button>
            </div>
            
            
            const game_view = dispatch => ({ game, player }) => 
<div> 
      <h1>Tic-tac-toe</h1>
      <Message status = {game} player = {player} />
      {
        (game.ongoing)?
        <Board game={game} dispatch = {dispatch} player = {player} />
        : <div></div>
      }
      <button id = 'concede' 
      onClick = {() => 
        dispatch({
          type: "concede", 
          player: player, 
          gameNumber: game.gameNumber})}>
          Concede
          </button>
          </div>
          
          const View = ({ state, dispatch }) => state.accept({
            visit_pre_game: game_list_view(dispatch),
            visit_game: game_view(dispatch)
          })
          
          
          const render = dispatch => state => ReactDOM.render(<View state={ state } dispatch = {dispatch} />, document.getElementById('root'));
          
          export default render;
          
*/