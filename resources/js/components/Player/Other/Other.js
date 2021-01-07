import React from 'react';
import WordsList from '../WordsList/WordsList.js';

function Other({player}) {
    
    const { 
        nick, 
        words
    } = player;

    return (
        <div className="ContentPlayer">
            <h3 className="namePlayer">
                {nick}
            </h3>
            <WordsList words={words} />
        </div>
    )
}

export default Other;