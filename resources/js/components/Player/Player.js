import React, { useState, useEffect } from 'react';
import './Player.css';

function Player(props) {

    const { player, saveWords, counter, justWord, handleInputChange } = props;
    const { nick, state, arrayWords } = player;

    const [ thisIsOtherPlayer, setThisIsOtherPlayer ] = useState(true);

    const checkIfOtherPlayer = () => {
        if(counter === 'null')
            setThisIsOtherPlayer(false);
        else
            setThisIsOtherPlayer(true);
    }

    
    if(Array.isArray(arrayWords))
        var maping = true;
    else
        var maping = false;


    useEffect(() => {
        checkIfOtherPlayer();
    }, []);

    return(
        <div className="player">
            
            <h3 
                className="namePlayer"
            >
                {nick}
            </h3>

            {state == 2 ? 'Button Start' : ''}
            
            {thisIsOtherPlayer ? 
                <div className="contentPlayer">
                    <ol>
                        {maping ? arrayWords.map((word, i) => {
                            return <li key={i} >{word}</li>
                        }) : ''}
                    </ol>
                </div>
            :
                <div className="contentPlayer">
                    <input 
                        className="newWord" 
                        value={justWord}
                        placeholder="Nowe słowo" 
                        onKeyUp={saveWords}
                        onChange={handleInputChange}
                    />
                    <ol>
                        {maping ? arrayWords.map((word, i) => {
                            return <li key={i} >{word}</li>
                        }) : ''}
                    </ol>
                </div>
            }
            
        </div>
    );
}

export default Player;