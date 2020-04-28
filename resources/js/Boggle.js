import React from 'react';
import ReactDOM from 'react-dom';

function Boggle(props) {
    return (
        <div className="boggle">
            Boggle Online
        </div>
    );
}

export default App;

if (document.getElementById('boggle')) {
    ReactDOM.render(<Boggle />, document.getElementById('boggle'));
}