import React from 'react';
import '../css/header.css';

import HeaderCell from './HeaderCell';
import Colgroup from './Colgroup';
import ResizeHandle from './ResizeHandle';

import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

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

  attactResizeHandle(column, position) {
    console.log('start resize ' + column.field, position);
    this.setState({
      showResizeHandle: true,
      resizeColumn: column,
      resizeHandlePos: position
    });
  }

  removeResizeHandle() {
    console.log('end resize ' + this.state.resizeColumn.field);
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
      <div className='tgrid-header-wrapper'>
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

export default DragDropContext(HTML5Backend)(Header);