import React from 'react';
import {Button} from 'react-bootstrap';
const SYMBOLS = ["", "X", "O"];
function Board(props) {
  return (
      <div className="boardContainer">
        <div className="boardMessage">{props.message}</div>
          <div className="board">
          {
            [0, 1, 2].map((row_num)=>{
              let newProps = {...props, row_num};
              return <BoardRow key={row_num} {...newProps}/>
            })
          }
          </div>
        <div className="boardActions">
          {
            props.board ?
              <Button variant="dark" onClick={props.reset} block>Reset</Button>
            :
              <div>
                <Button variant="outline-dark" onClick={()=>props.selectStartPlayer(true)}>Go First</Button>
                <Button variant="dark" onClick={()=>props.selectStartPlayer(false)}>Go Second</Button>
              </div>

            }
        </div>
      </div>
  );
}

function BoardRow(props) {
  return (
    <>
    {
      [0, 1, 2].map((elem)=>{
        let col_num = props.row_num * 3 + elem;
        let newProps = {...props, col_num};
        return <BoardCol key={col_num} {...newProps}/>
      })
    }
    </>
  );
}

function BoardCol({col_num, handleBoxClick, moves, userPlayer, board}) {
  let active = board && board.get_current_turn() == userPlayer && !moves[col_num] ? "active" : "";
  return <div className={`boardCell boardCell${col_num} ${active}`} onClick={() => handleBoxClick(col_num)}>{SYMBOLS[(moves && moves[col_num]) || 0]}</div>;
}

export default Board;
