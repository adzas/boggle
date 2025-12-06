import React from 'react';
import './Timer.css';

function Timer({value, setIsStartHandle}) {
    if(value<=0)
    {
        setIsStartHandle(false);
        value = 0;
    }
        
    return(
        <div className="Timer">
            <h1>{value}s</h1>
        </div>
    );
}

export default Timer;