import React, { Component, PropTypes } from 'react';
import '../css/resize-hint.css';

class ResizeHint extends Component {
  constructor(props) {
    super(props);
    this.displayName = 'ResizeHint';
  }
  render() {
    return (
      <div
        className='resize-hint'
        style={{...this.props}}>
      </div>
    );
  }
}

ResizeHint.propTypes = {
  left: PropTypes.number.isRequired
};

export default ResizeHint;
