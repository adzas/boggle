import React from 'react';
import './dist/Menu.css';

class Menu extends React.Component {
    render() {
        return <div className="my-menu">
            <nav>
                <ul className="my-menu-list">
                    <li>
                        <a href="/">Główna</a>
                    </li>
                    <li>
                        <a href="/room/1">Room - 1</a>
                    </li>
                    <li>
                        <a href="/logout">Wyloguj</a>
                    </li>
                </ul>
            </nav>
        </div>
    };
}

export default Menu;
