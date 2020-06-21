import React, { useState, useEffect } from 'react';
import './GenerateButton.css';

function GenerateButton({ gen, start }) {

    const [content, setContent] = useState('BUTTON');
    const [content2, setContent2] = useState('');
    const [className, setClassName] = useState('generateNewLettersArrayButton');
    const [className2, setClassName2] = useState('d-none');

    useEffect(() => {
        setContent('NEW');
        setContent2('REFRESH');
        setClassName('generateNewLettersArrayButton half')
        setClassName2('generateNewLettersArrayButton half')
    }, [start])

    return (
        <div className="containerFroButton" >
            <button 
                className={className2} 
                onClick={() => gen(true)}
            >
                {content2}
            </button>
            <button 
                className={className} 
                onClick={() => gen(false)}
            >
                {content}
            </button>
        </div>
    );
}

export default GenerateButton;