import React from 'react';
import './dist/ReadyButton.css';
import '../../dist/Buttons.css';

function ReadyButton(props) {

    const { onclick } = props;
    
    const changeColorButton = () => {
        //console.log('hover button');
    }

    return (
        <div className="containerFroButton" >
            <button 
                className="readyPlayerButton btn btn-green" 
                onClick={onclick}
                onMouseEnter={changeColorButton}
            >
                Ready
            </button>
        </div>
    );
}

export default ReadyButton;