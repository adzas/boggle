import React from 'react';

class WordsList extends React.Component
{
    render() {
        return <div className="wordsList">
            <ol>
                {this.props.words.map((word, i) => {
                    return  <li key={i} >
                                {word.word + word.state}
                            </li>
                })}
            </ol>
        </div>
    }
}

export default WordsList;