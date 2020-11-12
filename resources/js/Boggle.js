import React from 'react';
import ReactDOM from 'react-dom';
import Room from './components/Room';
import Menu from './components/Menu';
import './Boggle.css';

function Boggle(props) {
    return (
      <div className="homeScreen">
        <Menu />
        <h1>
          WELCOME IN BOGGLE
        </h1>
      </div>
    );
}

export default Boggle;

if (document.getElementById('home')) {
    ReactDOM.render(<Boggle />, document.getElementById('home'));
}
if (document.getElementById('room')) {
    ReactDOM.render(<Room id="1" roomId="1" />, document.getElementById('room'));
}
