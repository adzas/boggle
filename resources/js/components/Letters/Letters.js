import React from 'react';
import Letter from './Letter/';
import './Letters.css';

function Letters(props) {
    const { letters, isStart } = props;

    var style = "";
    if(!isStart)
    {
        style = "off-letters";
    }

    return(
        <div className="containerForLetters">
            <div className={`letters ${style}`} >
                {
                    letters.map((letter, i) => {
                        return (
                            <Letter key={i} value={letter} />
                        );
                    })
                }
            </div>
        </div>
    );
}

export default Letters;