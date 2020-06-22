import React from 'react';

function Other({player}) {
    
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

    return (
        <div className="ContentPlayer">
            <h3 className="namePlayer">
                {nick}
            </h3>
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
    )
}

export default Other;