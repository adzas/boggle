import React, { useState, useEffect } from 'react';
import Letter from './Letter/';
import './Letters.css';

function Letters(props) {
    const { letters, isStart } = props;
    
    const [lettersState, setLettersState] = useState({clicked: false, word: ""});
    const {clicked, word} = lettersState;

    let style = "";
    if(!isStart) style = "off-letters";

    const setWord = () => {
        if(word.length > 0)
            setLettersState({clicked: false, word: word});
    }
    
    useEffect(() => {
        if(!clicked && word.length >= 3)
        {
            console.log('sendWord');
            setLettersState({clicked: false, word: ''});
        }
    }, [clicked]);

    return(
        <div className="containerForLetters">
            <div className={`letters ${style}`} onMouseLeave={setWord} >
                {
                    letters.map((letter, i) => {
                        return (
                            <Letter 
                                key={i} 
                                id={i}
                                value={letter} 
                                setLettersState={setLettersState} 
                                setWord={setWord}
                                word={word} 
                                clicked={clicked}
                            />
                        );
                    })
                }
            </div>
        </div>
    );
}

export default Letters;