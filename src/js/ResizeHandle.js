import React, { Component, PropTypes } from 'react';
import '../css/resize-handle.css'

class ResizeHandle extends Component {
  constructor(props) {
    super(props);
    this.displayName = 'ResizeHandle';
    this.onMouseLeave = this.onMouseLeave.bind(this);
    this.onDrag = this.onDrag.bind(this);

    const { left, width, height } = this.props;
    this.state = {
      top: 0,
      left: left,
      width: width,
      height: height
    };
  }

  onMouseLeave() {
    this.props.onLeave();
  }

  onDrag() {
    console.log('Dragged');
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      left: nextProps.left
    });
  }

  render() {
    return (
      <div draggable='true'
        className='resize-handle'
        style={{...this.state}}
        onMouseLeave={this.onMouseLeave}
        onDrag={this.onDrag}></div>
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
