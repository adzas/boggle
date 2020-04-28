import React from 'react';
import ReactDOM from 'react-dom';

function App(props) {
    return (
        <div className="app">
            Hello World
        </div>
    );
}

export default App;

if (document.getElementById('root')) {
    ReactDOM.render(<App />, document.getElementById('root'));
}