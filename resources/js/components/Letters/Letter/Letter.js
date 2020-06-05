import React from 'react';
import './Letter.css';

function Letter(props) {
    const { value } = props;

    return(
        <div className="letter" >
            { value }
        </div>
    );
}

export default Letter;