import React from 'react';
import './dist/Menu.css';
import '../../dist/Buttons.css';

class Menu extends React.Component {
    render() {
        return <div className="my-menu">
            <nav>
                <ul className="my-menu-list">
                    <li className="btn btn-green">
                        <a href="/">Główna</a>
                    </li>
                    <li className="btn btn-green">
                        <a href="/room/1">Room - 1</a>
                    </li>
                    <li className="btn btn-default float-right">
                        <a href="/logout">Wyloguj</a>
                    </li>
                </ul>
            </nav>
        </div>
    };
}

export default Menu;
