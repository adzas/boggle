import React from 'react';
import WordsBox from './WordsBox';
import InputBox from './InputBox';

class Szefler extends React.Component
{
    render () {
        return <div className="szefler">
            <h1>Gra Szefler</h1>
            <WordsBox />
            <InputBox />
        </div>
    }
}

export default Szefler;