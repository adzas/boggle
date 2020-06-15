import React from 'react';
import './readyButton.css';

function ReadyButton(props) {

    const { onclick } = props;
    
    const changeColorButton = () => {
        //console.log('hover button');
    }

    return (
        <div className="containerFroButton" >
            <button 
                className="readyPlayerButton" 
                onClick={onclick}
                onMouseEnter={changeColorButton}
            >
                Ready
            </button>
        </div>
    );
}

export default ReadyButton;