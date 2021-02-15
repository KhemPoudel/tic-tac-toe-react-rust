import React, {Component} from "react";
import {Container, Row, Col} from 'react-bootstrap';
import wasm from 'tic-tac-toe-wasm-khem';
import Board from './Board.js';
import SymbolSelectionPage from './SymbolSelectionPage.js';



class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //wasm: null,
      //isWasmLoaded: false,
      userSymbol: null,
      board: null,
      moves: [0, 0, 0, 0, 0, 0, 0, 0, 0],
    }
  }

  // componentDidMount() {
  //   import("wasm").then(module => {
  //     this.setState({ isWasmLoaded: true, wasm: module });
  //   });
  // }

  handleBoxClick(boxNumber) {
    //console.log(boxNumber)
    let {board, moves, userSymbol} = this.state;
    if(userSymbol && userSymbol == board.get_current_turn()) {
      try {
        board.make_move(boxNumber);
        console.log("moves before: ", moves);
        moves[boxNumber] = userSymbol;
        console.log("moves after: ", moves);
        this.setState({moves});
        this.makeAutoMove();
      } catch(e) {
        alert(e);
      }
    }
  }

  makeAutoMove() {
    let {board, moves, userSymbol} = this.state;
    let best_move = board.get_best_move();
    try {
      board.make_move(best_move);
      moves[best_move] = userSymbol == 1 ? 2 : 1;
      this.setState({moves});
    } catch(e) {
      alert(e);
    }
  }

  handleSymbolClick(userSymbol) {
    let board = new wasm.Board(userSymbol);
    this.setState({ board, userSymbol });
  }

  render() {
    // let activePage = this.state.isWasmLoaded
    //   ? this.state.board?<Board moves={this.state.moves} handleBoxClick={this.handleBoxClick.bind(this)}/> :<SymbolSelectionPage handleSymbolClick={this.handleSymbolClick.bind(this)}/>
    //   : <h2>Loading...</h2>
    let activePage = this.state.board
      ?<Board moves={this.state.moves} handleBoxClick={this.handleBoxClick.bind(this)}/> 
      :<SymbolSelectionPage handleSymbolClick={this.handleSymbolClick.bind(this)}/>;
    return (
      <div className="tic_container">
        <div class="item-centerd">
            {activePage}
        </div>
      </div>
    );
  }
}

export default App;
