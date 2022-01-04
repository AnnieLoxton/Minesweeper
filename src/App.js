/* Followed this tutorial for the game functionality:
https://iq.opengenus.org/minesweeper-game-in-react-js/ */

import React from 'react';
import Board from './components/Board';
import './App.css';

function App(){
  return(
    <div>
      <h1 className="gameHeading">Minesweeper</h1>
      <div className="gameBoard">   
        <Board/>
      </div>
    </div>
  )
}

export default App;