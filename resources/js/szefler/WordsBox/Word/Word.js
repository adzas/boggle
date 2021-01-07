import React from 'react';
import PropTypes from 'prop-types';
import './dist/Word.css';

class Word extends React.Component
{
    render() {
        return <div className="word">
            {this.props.value}
        </div>
    }
}

Word.propTypes = {
    value: PropTypes.string
};

export default Word;