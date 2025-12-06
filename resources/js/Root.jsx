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

import { createRoot } from 'react-dom/client';

if (document.getElementById('root')) {
    createRoot(document.getElementById('root')).render(<App />);
}