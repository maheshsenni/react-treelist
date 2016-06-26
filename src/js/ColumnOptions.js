import React, { Component, PropTypes } from 'react';
import '../css/column-options.css';

class ColumnOptions extends Component {
  constructor(props) {
    super(props);
    this.displayName = 'ColumnOptions';
  }
  render() {
    const { left } = this.props;
    return (
      <div className='column-options' style={{ left: left }}>
      </div>
    );
  }
}

ColumnOptions.propTypes = {
  left: PropTypes.number.isRequired
};

export default ColumnOptions;
