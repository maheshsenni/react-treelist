import React from 'react';
import '../css/header.css';

import HeaderCell from './HeaderCell';
import Colgroup from './Colgroup';
import ResizeHandle from './ResizeHandle';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.displayName = 'Header';
    // state
    this.state = {
      showResizeHandle: false,
      resizeColumn: null,
      resizeHandlePos: null
    };

    this.attactResizeHandle = this.attactResizeHandle.bind(this);
    this.removeResizeHandle = this.removeResizeHandle.bind(this);
  }

  attactResizeHandle(column, indicatorPos) {
    const headerOffsetLeft = this.refs.header.offsetLeft;
    const handlePos = {
      width: indicatorPos.width,
      height: indicatorPos.height,
      top: 0,
      left: indicatorPos.left - headerOffsetLeft
    };
    this.setState({
      showResizeHandle: true,
      resizeColumn: column,
      resizeHandlePos: handlePos
    });
  }

  removeResizeHandle() {
    this.setState({
      showResizeHandle: false,
      resizeColumn: null,
      resizeHandlePos: null
    });
  }

  _makeTableHeaders(columns) {
    const headerCells = columns.map((col, index) => {
      return (
        <HeaderCell
          key={'colh-' + index}
          column={col}
          sort={this.props.sortedColumns[col.field]}
          onSort={this.props.onSort}
          onResizeEnter={this.attactResizeHandle}>
        </HeaderCell>
      );
    });
    return headerCells;
  }

  render() {
    const { columns } = this.props;
    const headerCells = this._makeTableHeaders(columns);

    let resizeHandle = null;
    if (this.state.showResizeHandle) {
      resizeHandle = (
        <ResizeHandle
          height={this.state.resizeHandlePos.height}
          width={this.state.resizeHandlePos.width}
          top={this.state.resizeHandlePos.top}
          left={this.state.resizeHandlePos.left}
          onLeave={this.removeResizeHandle}>
        </ResizeHandle>
      );
    }

    return (
      <div className='tgrid-header-wrapper' ref='header'>
        {resizeHandle}
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
  columns: React.PropTypes.array.isRequired,
  onSort: React.PropTypes.func.isRequired,
  sortedColumns: React.PropTypes.object.isRequired
};

export default Header;