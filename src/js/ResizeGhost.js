import React, { Component, PropTypes } from 'react';
import '../css/resize-ghost.css';

class ResizeGhost extends Component {
  constructor(props) {
    super(props);
    this.displayName = 'ResizeGhost';
    this.onMouseLeave = this.onMouseLeave.bind(this);
    this.onDrag = this.onDrag.bind(this);
    this.onDragStart = this.onDragStart.bind(this);
    this.onDragEnd = this.onDragEnd.bind(this);
  }

  onMouseLeave() {
    this.props.onLeave();
  }

  onDragStart(event) {
    this._initialX = event.clientX;
    this.props.onDragStart(event.clientX);
  }

  onDrag(event) {
    const movedX = event.clientX - this._initialX;
    this.props.onDrag(movedX);
  }

  onDragEnd(event) {
    const movedX = event.clientX - this._initialX;
    this.props.onDragEnd(movedX);
  }

  render() {
    return (
      <div draggable='true'
        className='resize-handle'
        style={{...this.props}}
        onMouseLeave={this.onMouseLeave}
        onDrag={this.onDrag}
        onDragStart={this.onDragStart}
        onDragEnd={this.onDragEnd}></div>
    );
  }
}

ResizeGhost.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  top: PropTypes.number.isRequired,
  left: PropTypes.number.isRequired,
  onLeave: PropTypes.func.isRequired,
  onDragStart: PropTypes.func.isRequired,
  onDrag: PropTypes.func.isRequired,
  onDragEnd: PropTypes.func.isRequired
};

export default ResizeGhost;
