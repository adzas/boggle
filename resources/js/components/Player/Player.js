import React from 'react';
import './Player.css';

function Player(props) {
    const { player, saveWord } = props;
    const { nick, state, arrayWords } = player;
    return(
        <div className="player">
            
            <h3 
                className="namePlayer"
            >
                {nick} - {state}
            </h3>

            <input 
                class="newWord" 
                value={arrayWords} 
                placeholder="Nowe słowo" 
                onClick={saveWord}
            />
            
        </div>
    );
}

export default Player;