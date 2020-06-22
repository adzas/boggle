import React from 'react';

function You({player, isStart, checkPlayers, checkWords, justWord, saveWords, setJustWord}) {
    
    let point = '';
    const { 
        nick, 
        arrayWords, 
        stateWords 
    } = player;
    
    if(Array.isArray(arrayWords))
        var maping = true;
    else
        var maping = false;
    
    if(Array.isArray(stateWords))
        var mapingState = true;
    else
        var mapingState = false;
    
    return(
        <div className="ContentPlayer">
            <h3 className="namePlayer">
                {nick}
            </h3>
            {!isStart ? 
                <div>
                    <button 
                        className="checkPlayerButton"
                        onClick={checkPlayers}
                    >
                        Check Players
                    </button>
                    <button 
                        className="checkPlayerButton"
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
            <ol>
                {maping ? arrayWords.map((word, i) => {
                    point = '';
                    if(mapingState) {
                        if(stateWords[i]==1) {
                            point = ' + ';
                        }
                    }
                    return  <li key={i} >
                                {word + point}
                            </li>
                }) : ''}
            </ol>
        </div>
    );

}

export default You;