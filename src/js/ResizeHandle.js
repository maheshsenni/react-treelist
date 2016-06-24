import React, { Component, PropTypes } from 'react';
import '../css/resize-handle.css'

class ResizeHandle extends Component {
  constructor(props) {
    super(props);
    this.displayName = 'ResizeHandle';
    this.onMouseLeave = this.onMouseLeave.bind(this);
  }

  onMouseLeave() {
    this.props.onLeave();
  }

  render() {
    return (
      <div
        className='resize-handle'
        style={{...this.props}}
        onMouseLeave={this.onMouseLeave}></div>
    );
  }
}

ResizeHandle.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  top: PropTypes.number.isRequired,
  left: PropTypes.number.isRequired,
  onLeave: PropTypes.func.isRequired
};

export default ResizeHandle;
