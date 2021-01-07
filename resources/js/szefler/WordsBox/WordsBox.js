import axios from 'axios';
import React from 'react';
import Word from './Word';
import './dist/WordsBox.css';
import PropTypes from 'prop-types';

class WordsBox extends React.Component
{
    constructor(props) {
        super(props);
        this.state = {words: []};
        axios.get('/get-password-words/9')
        .then(res => {
            this.setState({ words: res.data })
        })
    }

    render() {
        return <div className="wordsBox">
            {this.state.words.map((v, k) => {
                return <Word value={v.word} key={v.id} />
            })}
        </div>
    }
}

WordsBox.propTypes = {
    words: PropTypes.array
};

export default WordsBox;