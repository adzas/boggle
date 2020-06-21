import React from 'react';

function Other({player}) {
    
    const { 
        nick, 
        arrayWords, 
        stateWords 
    } = player;
    
    if(Array.isArray(arrayWords))
        var maping = true;
    else
        var maping = false;

    return (
        <div className="ContentPlayer">
            <h3 className="namePlayer">
                {nick}
            </h3>
            <div className="player">
                <ol>
                    {maping ? arrayWords.map((word, i) => {
                        return  <li key={i} >
                                    {word}
                                    {stateWords.length > 0 && stateWords[i]==1 ? ' + ' : ''}
                                </li>
                    }) : ''}
                </ol>
            </div>
        </div>
    )
}

export default Other;