import React from 'react';
import './Letter.css';

function Letter(props) {
    const { value, id, setLettersState, clicked, word, lettersId, styleSelected } = props;
    
    const mouseEnterHandler = (e) => {
        const value = e.target.getAttribute('data-value');
        const id = e.target.getAttribute('data-id');
        let repeatId = false;

        for (let i = 0; i < lettersId.length; i++) {
            if(lettersId[i] == id)
                repeatId = true;
        }

        if(clicked && !repeatId) {
            styleSelected(e.target);
            setLettersState({clicked: true, word: word + value, lettersId: [...lettersId, id]});
        }
    }

    return(
        <div className="letter" >
            <div className="letterView" >
                { value }
            </div>
            <div 
                className="letterMask" 
                data-value={value} 
                data-id={id} 
                onMouseEnter={mouseEnterHandler}
            ></div>
        </div>
    );
}

export default Letter;