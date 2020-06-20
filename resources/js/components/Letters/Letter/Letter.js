import React from 'react';
import './Letter.css';

function Letter(props) {
    const { value, setLettersState, clicked, word, setWord } = props;

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
        <div 
            className="letter" 
            data-value={value} 
            onMouseDown={mouseDownHandler} 
            onMouseUp={setWord} 
            onMouseEnter={mouseEnterHandler}
        >
            { value }
        </div>
    );
}

export default Letter;