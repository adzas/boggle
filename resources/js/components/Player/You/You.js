import React from 'react';

function You({player, isStart, checkPlayers, checkWords, justWord, saveWords, setJustWord}) {
    
    let point = '';
    const { 
        nick,
        words
    } = player;
    
    if(Array.isArray(words))
        var maping = true;
    else
        var maping = false;
    
    // TODO przerobić words na objekt z parametrem -> state
    // if(Array.isArray(stateWords))
    //     var mapingState = true;
    // else
    //     var mapingState = false;
    
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
            <ol>
                {maping ? words.map((word, i) => {
                    point = '';
                    /* if(mapingState) {
                        if(stateWords[i]==1) {
                            point = ' + ';
                        }
                    } */
                    return  <li key={i} >
                                {word.word + point}
                            </li>
                }) : ''}
            </ol>
        </div>
    );

}

export default You;