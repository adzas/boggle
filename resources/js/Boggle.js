import React from 'react';
import ReactDOM from 'react-dom';
import Room from './components/room';

function Boggle(props) {
    return (
        <div className="boggle">
            Boggle Online
            <Room />
        </div>
    );
}

export default Boggle;

if (document.getElementById('boggle')) {
    ReactDOM.render(<Boggle />, document.getElementById('boggle'));
}