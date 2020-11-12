import React from 'react';
import './dist/Letter.css';

function Letter(props) {
    const { value, id, setLettersState, clicked, word, setWord, isStart } = props;

    const mouseDownHandler = (e) => {
        const value = e.target.getAttribute('data-value');
        setLettersState({clicked: true, word: value});
    }
    
    const mouseEnterHandler = (e) => {
        const value = e.target.getAttribute('data-value');
        if(clicked)
            setLettersState({clicked: true, word: word + value});
    }

    return(
        <div className={`letter ${isStart ? '' : 'letter-red'} `} >
            <p className="letterView">
                { value }
            </p>
            <div 
                className="letterMask" 
                data-value={value} 
                data-id={id} 
                onMouseDown={mouseDownHandler} 
                onMouseUp={setWord} 
                onMouseEnter={mouseEnterHandler}
            ></div>
        </div>
    );
}

export default Letter;