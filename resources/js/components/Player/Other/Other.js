import React from 'react';

function Other({player}) {
    
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

    return (
        <div className="ContentPlayer">
            <h3 className="namePlayer">
                {nick}
            </h3>
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
    )
}

export default Other;