import React from 'react';
import ReactDOM from 'react-dom';
import Room from './components/Room';
import Szefler from './szefler/Szefler';
import Menu from './components/Menu';
import './dist/Boggle.css';

function Boggle(props) {
    return (
      <div className="homeScreen">
        <Menu />
        <h1 className="welcomeText">
          WITAJ NA PORTALU GIER KREATYWNYCH
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
if (document.getElementById('room')) {
    ReactDOM.render(<Szefler id="1" roomId="1" />, document.getElementById('szefler'));
}
