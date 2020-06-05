import React from 'react';

function GenerateButton(props) {

    const { onclick } = props;
    
    const changeColorButton = () => {
        //console.log('hover button');
    }

    return (
        <div className="containerFroButton" >
            <button 
                className="generateNewLettersArrayButton" 
                onClick={onclick}
                onMouseEnter={changeColorButton}
            >
                NEW
            </button>
        </div>
    );
}

export default GenerateButton;