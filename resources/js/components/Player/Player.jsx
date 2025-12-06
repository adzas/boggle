import React, { useState, useEffect } from 'react';
import You from './You/You.js';
import Other from './Other/Other.js';
import './Player.css';

function Player(props) {
    
    const [ thisIsOtherPlayer, setThisIsOtherPlayer ] = useState(true);
    const { 
        player, 
        saveWords, 
        checkWords, 
        itsYou, 
        justWord, 
        setJustWord, 
        isStart,
        checkPlayers
    } = props;


    useEffect(() => {
        if(itsYou === 'true')
            setThisIsOtherPlayer(false);
    }, []);

    return(
        <div className="player">
            {!thisIsOtherPlayer ? 
                <You 
                    player={player} 
                    isStart={isStart}
                    checkPlayers={checkPlayers}
                    checkWords={checkWords}
                    justWord={justWord}
                    saveWords={saveWords}
                    setJustWord={(event) => {setJustWord(event.target.value)}}
                />
            :
                <Other player={player} />
            }
        </div>
    );
}

export default Player;