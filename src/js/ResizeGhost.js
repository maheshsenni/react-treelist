import React, { Component, PropTypes } from 'react';
import '../css/resize-ghost.css';

class ResizeGhost extends Component {
  constructor(props) {
    super(props);
    this.displayName = 'ResizeGhost';
    this.onMouseLeave = this.onMouseLeave.bind(this);
    this.onDragStart = this.onDragStart.bind(this);
    this.onDragEnd = this.onDragEnd.bind(this);
    this.documentDragoverHandler = this.documentDragoverHandler.bind(this);
    this.state = {
      resizing: false,
      dragX: 0
    };
  }

  onMouseLeave() {
    this.props.onLeave();
  }

  onDragStart(event) {
    // setting 'event.dataTransfer' for firefox :(
    event.dataTransfer.setData('text', '');
    this._initialX = event.clientX;
    this.props.onDragStart(event.clientX);
  }

  onDragEnd(event) {
    this.props.onDragEnd();
  }

  documentDragoverHandler(event) {
    const movedX = event.clientX - this._initialX;
    this.props.onDrag(movedX);
  }

  componentDidMount() {
    document.addEventListener('dragover', this.documentDragoverHandler, false);
  }

  componentWillUnmount() {
    document.removeEventListener('dragover', this.documentDragoverHandler, false);
  }

  render() {
    return (
      <div draggable='true'
        className='resize-handle'
        style={{...this.props}}
        onMouseLeave={this.onMouseLeave}
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
