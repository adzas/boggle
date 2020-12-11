import React from 'react';
import './dist/CheckWordInput.css';

function CheckWordInput({enteredWordToCheck, storeCheckWord, statusCheckedWord}) {
    
    var status = '';
    var inputBorder = 'border-default';
    switch (statusCheckedWord) {
        case 1:
            inputBorder = 'border-green';
            status = 'OK';
            break;

        case 0:
            inputBorder = 'border-red';
            status = ':(';
            break;
    
        default:
            inputBorder = 'border-default';
            status = '';
            break;
    }

    return(
        <div className="checkInput">
            <input
                className={`border-radius ${inputBorder}`}
                value={enteredWordToCheck}
                placeholder="Sprawdź w SJP"
                onChange={storeCheckWord}
            />{status}
        </div>
    );
}

export default CheckWordInput;