import React, { useState, useEffect } from 'react';
import Letter from './Letter/';
import './Letters.css';

function Letters(props) {
    const { letters, isStart, setLettersState, lettersState, saveWordsMouseThrough } = props;
    const {clicked, word, lettersId} = lettersState;

    let style = "";
    if(!isStart) style = "off-letters";

    const styleSelected = (element) => {
        element.style.opacity = 0.5;
    }

    const styleUnselected = () => {
        if(!clicked) {
            const classelement = document.getElementsByClassName("letterMask");
            for (let i = 0; i < classelement.length; i++) {
                classelement[i].style.opacity = 0.1;
            }
        }
    }
    
    const mouseDownHandler = (e) => {
        setLettersState({clicked: true, word: '', lettersId: []});
    }

    const setWord = () => {
        if(word.length > 0)
            setLettersState({clicked: false, word: word, lettersId: lettersId});
    }
    
    useEffect(() => {
        if(!clicked) {
            if(word.length >= 3)
                saveWordsMouseThrough(word);
            styleUnselected();
            setLettersState({clicked: false, word: '', lettersId: []});
        } 
    }, [clicked]);

    return(
        <div className="containerForLetters">
            <div 
                className={`letters ${style}`} 
                onMouseUp={setWord}
                onMouseDown={mouseDownHandler}
            >
                {
                    letters.map((letter, i) => {
                        return (
                            <Letter 
                                key={i} 
                                id={i}
                                styleSelected={styleSelected}
                                value={letter} 
                                setLettersState={setLettersState} 
                                word={word} 
                                clicked={clicked}
                                lettersId={lettersId}
                            />
                        );
                    })
                }
            </div>
        </div>
    );
}

export default Letters;