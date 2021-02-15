import React from 'react';
const SYMBOLS = ["", "X", "O"];
function Board(props) {
  return (
      <div className="board">
        {
          [0, 1, 2].map((row_num)=>{
            let newProps = {...props, row_num};
            return <BoardRow key={row_num} {...newProps}/>
          })
        }
      </div>
  );
}

function BoardRow(props) {
  return (
    <div key={props.row_num}>
    {
      [0, 1, 2].map((elem)=>{
        let col_num = props.row_num * 3 + elem;
        let newProps = {...props, col_num};
        return <BoardCol key={col_num} {...newProps}/>
      })
    }
    </div>
  );
}

function BoardCol({col_num, handleBoxClick, moves}) {
  let className = "boardCell " + "boardCell"+ col_num;
  return <div className={"boardCell " + "boardCell"+ col_num} onClick={() => handleBoxClick(col_num)}>{SYMBOLS[moves[col_num]]}</div>;
}

export default Board;
