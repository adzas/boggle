import React from 'react';
import ReactDOM from 'react-dom';
import Room from './components/Room';
import './Boggle.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

function Boggle(props) {
    return (
        <Router>
          <div>
            <div className="nav">
              <nav>
                <ul>
                  <li className="room">
                    <Link to="/boggle/public/room1">Room 1</Link>
                  </li>
                </ul>
              </nav>
            </div>
    
            {/* A <Switch> looks through its children <Route>s and
                renders the first one that matches the current URL. */}
            <Switch>
              <Route path="/boggle/public/room1">
                <Room id="1" />
              </Route>
              <Route path="/">
                <Home />
              </Route>
            </Switch>
          </div>
        </Router>
    );
}

export default Boggle;

if (document.getElementById('boggle')) {
    ReactDOM.render(<Boggle />, document.getElementById('boggle'));
}



function Home() {
  return <h2></h2>;
}
