import React, { Component, PropTypes } from 'react';
import '../css/header.css';

import HeaderCell from './HeaderCell';
import Colgroup from './Colgroup';
import ResizeGhost from './ResizeGhost';
import ResizeHint from './ResizeHint';

class Header extends Component {
  constructor(props) {
    super(props);
    this.displayName = 'Header';

    this.state = {
      showResizeGhost: false,
      showResizeHint: false,
      resizeColumn: null,
      resizeGhostPos: null
    };

    this.showResizeGhost = this.showResizeGhost.bind(this);
    this.removeResizeGhost = this.removeResizeGhost.bind(this);
    this.onResizeStart = this.onResizeStart.bind(this);
    this.onResize = this.onResize.bind(this);
    this.onResizeEnd = this.onResizeEnd.bind(this);
  }

  showResizeGhost(column, indicatorPos, currentWidth) {
    this._currentWidth = currentWidth;
    const headerOffsetLeft = this.refs.header.offsetLeft;
    const handlePos = {
      width: indicatorPos.width,
      height: indicatorPos.height,
      top: 0,
      left: indicatorPos.left - headerOffsetLeft
    };
    this.setState({
      showResizeGhost: true,
      resizeColumn: column,
      resizeGhostPos: handlePos
    });
  }

  removeResizeGhost() {
    this.setState({
      showResizeGhost: false,
      resizeColumn: null,
      resizeGhostPos: null
    });
  }

  onResizeStart(clientX) {
    const headerOffsetLeft = this.refs.header.offsetLeft;
    this._resizeStartX = clientX - headerOffsetLeft;
    this.setState({
      showResizeHint: true,
      resizeHintLeft: this._resizeStartX
    });
  }

  onResize(movedX) {
    let left = this._resizeStartX + movedX;
    const headerWidth = this.refs.header.offsetWidth;

    if (left < 0) {
      left = 0;
    } else if (left > headerWidth) {
      left = headerWidth;
    }

    this.setState({
      resizeHintLeft: left
    });
  }

  onResizeEnd(movedX) {
    const newWidth = this._currentWidth + movedX;
    this.setState({
      showResizeGhost: false,
      showResizeHint: false,
      resizeColumn: null,
      resizeGhostPos: null
    });
    this.props.onResize(this.state.resizeColumn, newWidth);
  }

  _makeTableHeaders(columns) {
    const headerCells = columns.map((col, index) => {
      return (
        <HeaderCell
          key={'colh-' + index}
          column={col}
          sort={this.props.sortedColumns[col.field]}
          onSort={this.props.onSort}
          onResizeEnter={this.showResizeGhost}>
        </HeaderCell>
      );
    });
    return headerCells;
  }

  render() {
    const { columns } = this.props;
    const headerCells = this._makeTableHeaders(columns);

    let resizeGhost = null;
    if (this.state.showResizeGhost) {
      resizeGhost = (
        <ResizeGhost
          height={this.state.resizeGhostPos.height}
          width={this.state.resizeGhostPos.width}
          top={this.state.resizeGhostPos.top}
          left={this.state.resizeGhostPos.left}
          onLeave={this.removeResizeGhost}
          onDragStart={this.onResizeStart}
          onDrag={this.onResize}
          onDragEnd={this.onResizeEnd}>
        </ResizeGhost>
      );
    }

    let resizeHint = null;
    if (this.state.showResizeHint) {
      resizeHint = (
        <ResizeHint left={this.state.resizeHintLeft}></ResizeHint>
      );
    }

    return (
      <div className='tgrid-header-wrapper' ref='header'>
        {resizeGhost}
        {resizeHint}
        <table className='tgrid-header-table'>
          <Colgroup columns={columns}></Colgroup>
          <thead>
            <tr>
              {headerCells}
            </tr>
          </thead>
        </table>
      </div>
    );
  }
}

Header.propTypes = {
  columns: PropTypes.array.isRequired,
  onSort: PropTypes.func.isRequired,
  sortedColumns: PropTypes.object.isRequired,
  onResize: PropTypes.func.isRequired
};

export default Header;