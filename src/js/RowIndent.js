import '../css/row-indent.css';
import React from 'react';

class RowIndent extends React.Component {
  constructor(props) {
    super(props);
    this.displayName = 'RowIndent';
  }
  render() {
    const { indent, reactKey } = this.props;

    let indentDummies = null;
    if (indent > 0) {
      indentDummies = [];
      for (let i = indent; i > 0; i--) {
        indentDummies.push(
          <span
            key={reactKey + '-indent-' + i}
            className='row-indent'>
          </span>
        );
      }
    }

    if (indent > 0) {
      return (
        <span className='row-indent-wrapper'>
          {indentDummies}
        </span>
      );
    } else {
      return null;
    }
  }
}

RowIndent.propTypes = {
  indent: React.PropTypes.number.isRequired,
  reactKey: React.PropTypes.string.isRequired
};

export default RowIndent;
