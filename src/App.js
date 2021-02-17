import React, {Component} from "react";
import {Container, Row, Col} from 'react-bootstrap';
import Board from './Board.js';
import SymbolSelectionPage from './SymbolSelectionPage.js';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      wasm: null,
      isWasmLoaded: false,
      userPlayer: null,
      board: null,
      moves: {},
      boardMessage: "",
    }
  }

  componentDidMount() {
    import("tic-tac-toe-wasm-khem").then(module => {
      this.setState({ isWasmLoaded: true, wasm: module });
    });
  }

  makeMove(move, player) {
    let {board, moves} = this.state;
    let boardStatus = board.get_board_state();
    let boardMessage = "";
    if(boardStatus != 2) {
      return;
    }

    try {
      board.make_move(move);
      moves[move] = player;
      this.setState({moves});
      boardStatus = board.get_board_state();
      if (boardStatus == 0) {
        boardMessage = "GAME DRAW";
      } else if (boardStatus == 1) {
        boardMessage = `Player(${board.get_winner() == 1 ? "X" : "O"}) WON`;
      } else {
        boardMessage = `Player(${board.get_current_turn() == 1 ? 'X' : 'O'})'s TURN`;
      }
    } catch(e) {
      boardMessage += e;
    }

    this.setState({boardMessage})
  }

  handleBoxClick(boxNumber) {
    let {board, userPlayer} = this.state;
    if(userPlayer && userPlayer == board.get_current_turn()) {
      this.makeMove(boxNumber, userPlayer);
      setTimeout(this.makeAutoMove.bind(this), 200);
    }
  }

  makeAutoMove() {
    let {board, userPlayer} = this.state;
    let best_move = board.get_best_move();
    this.makeMove(best_move, userPlayer == 1 ? 2 : 1);
  }

  selectStartPlayer(isUserFirst) {
    let {userPlayer} = this.state;
    let startPlayer = isUserFirst ? userPlayer : userPlayer == 1 ? 2 : 1;
    let board = new this.state.wasm.Board(startPlayer);
    this.setState({ board, boardActive: isUserFirst, boardMessage: `Player(${board.get_current_turn() == "1" ? "X" : "O"})'s TURN`});
    if(!isUserFirst) {
      setTimeout(this.makeAutoMove.bind(this), 200);
    }
  }

  handleSymbolClick(userPlayer) {
    this.setState({ userPlayer, boardMessage: `Select if you want to go first or second`});
  }

  reset() {
    this.setState({board: null, moves:{}, boardMessage: `Select if you want to go first or second`})
  }

  render() {
    let {board, boardMessage, moves, startPlayer, userPlayer} = this.state;
    let activePage = this.state.isWasmLoaded
      ? userPlayer
        ?<Board
          board= {board}
          message={boardMessage}
          moves={moves}
          userPlayer = {userPlayer}
          reset = {this.reset.bind(this)}
          selectStartPlayer= {this.selectStartPlayer.bind(this)}
          handleBoxClick={this.handleBoxClick.bind(this)}/>
        :<SymbolSelectionPage handleSymbolClick={this.handleSymbolClick.bind(this)}/>
      : <h2>Loading...</h2>
    return (
      <div className="ticContainer">
          {activePage}
      </div>
    );
  }
}

export default App;
