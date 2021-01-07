import React from 'react';
import WordsList from '../WordsList/WordsList.js';

function You({player, isStart, checkPlayers, checkWords, justWord, saveWords, setJustWord}) {
    
    const { 
        nick,
        words
    } = player;
    
    return(
        <div className="ContentPlayer">
            <h3 className="namePlayer">
                {nick}
            </h3>
            {!isStart ? 
                <div>
                    <button 
                        className="btn btn-default checkPlayerButton"
                        onClick={checkPlayers}
                    >
                        Check Players
                    </button>
                    <button 
                        className="btn btn-default checkPlayerButton"
                        onClick={checkWords}
                    >
                        Check my words
                    </button>
                </div>
            :
                <input 
                    className="newWord" 
                    value={justWord}
                    placeholder="Nowe słowo" 
                    onKeyUp={saveWords}
                    onChange={setJustWord}
                />
            }
            <WordsList words={words} />
        </div>
    );

}

export default You;