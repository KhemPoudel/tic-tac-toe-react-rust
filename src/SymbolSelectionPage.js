import React from 'react';
import {Button} from 'react-bootstrap';

function SymbolSelectionPage({ handleSymbolClick }) {
  return (
    <div>
      <h2>Choose Your Mark</h2>
      <Button variant="dark" onClick={() => handleSymbolClick(1)} block>Player(X)</Button>
      <Button variant="warning" onClick={() => handleSymbolClick(2)} block>Player(O)</Button>
    </div>
  )
}

export default SymbolSelectionPage;
