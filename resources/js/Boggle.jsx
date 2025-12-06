import React from 'react';
import ReactDOM from 'react-dom';
import Room from './components/Room';
import './Boggle.css';
import {
  BrowserRouter,
  Routes,
  Route,
  Link
} from "react-router-dom";

function Boggle(props) {
    return (
        <BrowserRouter>
          <div>
            <div className="nav">
              <nav>
                <ul>
                  <li className="room">
                    <Link to="/">Home</Link>
                  </li>
                  <li className="room">
                    <Link to="/1">Room 1</Link>
                  </li>
                  <li className="room">
                    <Link to="/2">Room 2</Link>
                  </li>
                </ul>
              </nav>
            </div>
            <Routes>
              <Route path="/1" element={<Room id="1" roomId="1" />} />
              <Route path="/2" element={<Room id="2" roomId="2" />} />
              <Route path="/" element={<Home />} />
            </Routes>
          </div>
        </BrowserRouter>
    );
}

export default Boggle;

import { createRoot } from 'react-dom/client';

if (document.getElementById('boggle')) {
    createRoot(document.getElementById('boggle')).render(<Boggle />);
}



function Home() {
  return  <div className="home">
            <h2>Boggle Online</h2>
          </div>
}
