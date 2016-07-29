import React, { Component, PropTypes } from 'react';
import '../css/header.css';

import HeaderCell from './HeaderCell';
import Colgroup from './Colgroup';
import ResizeGhost from './ResizeGhost';
import ResizeHint from './ResizeHint';
import ColumnOptions from './ColumnOptions';
import getScrollbarWidth from './util/ScrollbarWidth';

const COLUMN_MINIMUM_WIDTH = 75;

class Header extends Component {
  constructor(props) {
    super(props);
    this.displayName = 'Header';

    this.state = {
      showResizeGhost: false,
      showResizeHint: false,
      resizeColumn: null,
      resizeGhostPos: null,
      showColumnOptions: false,
      columnOptionsPos: null,
      columnOptions: null,
      scrollbarWidth: null
    };
    // this is not in state as the component need not
    // re-render when this is changed
    this.columnWidths = {};

    this.showResizeGhost = this.showResizeGhost.bind(this);
    this.removeResizeGhost = this.removeResizeGhost.bind(this);
    this.onResizeStart = this.onResizeStart.bind(this);
    this.onResize = this.onResize.bind(this);
    this.onResizeEnd = this.onResizeEnd.bind(this);
    this.onColumnOptionsClick = this.onColumnOptionsClick.bind(this);
    this.hideColumnOptions = this.hideColumnOptions.bind(this);
    this.cacheColumnWidth = this.cacheColumnWidth.bind(this);
  }

  onColumnOptionsClick(iconXPos, column) {
    const headerOffsetLeft = this.refs.header.getBoundingClientRect().left;
    const columnOptionsLeft = iconXPos - headerOffsetLeft;
    if (this.state.showColumnOptions) {
      // check if different column
      if (this.state.columnOptions.field !== column.field) {
        // show options for the new column
        this.showColumnOptions(columnOptionsLeft, column);
      } else {
        // hide column menu
        this.hideColumnOptions();
      }
    } else {
      // show column menu
      this.showColumnOptions(columnOptionsLeft, column);
    }
  }

  showColumnOptions(left, column) {
    const { sortedColumns, filters } = this.props;
    this.setState({
      showColumnOptions: true,
      columnOptionsLeft: left,
      columnOptions: {
        field: column.field,
        type: column.type
      }
    });
  }

  hideColumnOptions() {
    this.setState({
      showColumnOptions: false,
      columnOptionsLeft: null,
      columnOptions: null
    });
  }

  showResizeGhost(column, indicatorPos, currentWidth) {
    this._currentWidth = currentWidth;
    const headerOffsetLeft = this.refs.header.getBoundingClientRect().left;
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
    const headerOffsetLeft = this.refs.header.getBoundingClientRect().left;
    this._resizeStartX = clientX - headerOffsetLeft;
    this.setState({
      showResizeHint: true,
      resizeHintLeft: this._resizeStartX
    });
  }

  onResize(movedX) {
    let left = this._resizeStartX + movedX;
    const headerWidth = this.refs.header.clientWidth;

    if (left < 0) {
      left = 0;
    } else if (left > headerWidth) {
      left = headerWidth;
    }

    this.setState({
      resizeHintLeft: left
    });
  }

  onResizeEnd() {
    const movedX = this.state.resizeHintLeft - this._resizeStartX;
    let newWidth = this._currentWidth + movedX;
    let minimumWidth = this.props.minimumColWidth || COLUMN_MINIMUM_WIDTH;
    this.setState({
      showResizeGhost: false,
      showResizeHint: false,
      resizeColumn: null,
      resizeGhostPos: null
    });

    newWidth = newWidth < minimumWidth ? minimumWidth : newWidth;

    // determine change to total width here
    const headerWidth = this.refs.header.getBoundingClientRect().width;
    const existingWidth = this.columnWidths[this.state.resizeColumn.field];
    const widthDiff = newWidth - existingWidth;

    this.props.onResize(this.state.resizeColumn, newWidth, headerWidth + widthDiff);
  }

  cacheColumnWidth(field, width) {
    this.columnWidths[field] = width;
  }

  componentDidMount() {
    const rect = this.refs.header.getBoundingClientRect();
  }

  componentWillMount() {
    let scrollbarWidth = getScrollbarWidth();
    if (scrollbarWidth > 0) {
      this.setState({scrollbarWidth});
    }
  }

  _makeTableHeaders(columns) {
    const headerCells = columns.map((col, index) => {
      return (
        <HeaderCell
          key={'colh-' + index}
          column={col}
          sort={this.props.sortedColumns[col.field]}
          onSort={this.props.onSort}
          onResizeEnter={this.showResizeGhost}
          onColumnOptionsClick={this.onColumnOptionsClick}
          whenWidthAvailable={this.cacheColumnWidth}>
        </HeaderCell>
      );
    });
    return headerCells;
  }

  componentDidUpdate() {
    this.refs.header.scrollLeft = this.props.scrollLeft;
  }

  render() {
    const { columns, sortedColumns, filters, width } = this.props;
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

    let columnOptions = null
    if (this.state.showColumnOptions) {
      columnOptions = (
        <ColumnOptions
          left={this.state.columnOptionsLeft}
          field={this.state.columnOptions.field}
          dataType={this.state.columnOptions.type}
          sort={sortedColumns[this.state.columnOptions.field]}
          filter={filters[this.state.columnOptions.field]}
          onSort={this.props.onSort}
          onFilter={this.props.onFilter}
          hide={this.hideColumnOptions}>
        </ColumnOptions>
      );
    }

    return (
      <div className='tgrid-header-wrapper' ref='header' style={{ marginRight: this.state.scrollbarWidth}}>
        {resizeGhost}
        {resizeHint}
        {columnOptions}
        <table className='tgrid-header-table' style={{ width: width}}>
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
  minimumColWidth: PropTypes.number,
  onSort: PropTypes.func.isRequired,
  onFilter: PropTypes.func.isRequired,
  sortedColumns: PropTypes.object.isRequired,
  filters: PropTypes.object.isRequired,
  onResize: PropTypes.func.isRequired,
  width: PropTypes.number,
  scrollLeft: PropTypes.number.isRequired
};

Header.defaultProps = {
  scrollLeft: 0
};

export default Header;