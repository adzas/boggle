
import React from 'react';
import ReactDOM from 'react-dom/client';
import Boggle from './Boggle';

const root = document.getElementById('app');

if (root) {
    ReactDOM.createRoot(root).render(<Boggle />);
}