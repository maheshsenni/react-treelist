import '../css/body.css';

import React, { Component, PropTypes } from 'react';
import Colgroup from './Colgroup';
import { Row, createRow } from './Row';
import { getRootParents, getChildren } from './util/TreeUtils';

const _isExpanded = function(rowId, expandedRows) {
  return expandedRows.indexOf(rowId) > -1;
};

class Body extends Component {

  constructor(props) {
    super(props);
    this.displayName = 'Body';
    this.handleExpandToggle = this.handleExpandToggle.bind(this);
    this.onScroll = this.onScroll.bind(this);
    this.state = {
      expandedRows: [],
      scrollTop: 0,
      scrollLeft: 0
    };
    this._scrolling = false;
    this._expandAllComplete = false;
  }

  makeRows(data, metadata, columns, idField, parentIdField, expandAll) {
    // start with first level records
    const rootParents = getRootParents(data, parentIdField);

    // add all parent rows to 'expandedRows' if expandAll
    // option is true. Only do this for first render
    if (expandAll && !this._expandAllComplete) {
      this.state.expandedRows.push(...metadata.parentRowIds);
      this._expandAllComplete = true;
    }

    const rows = [];
    rootParents.forEach((d) => {
      // parent rows start at level 0
      rows.push(...this.makeRowsRecursive(d, 0, metadata.map, columns, idField, parentIdField));
    });
    return rows;
  }

  makeRowsRecursive(row, level, metadata, columns, idField, parentIdField) {
    const rows = [];
    const canExpand = row[idField] in metadata;
    // push the parent row first
    rows.push(createRow(row, level, columns, idField,
      canExpand, this.state.expandedRows.indexOf(row[idField]) > -1,
      this.handleExpandToggle));
    // children in next level for indentation
    const nextLevel = ++level;
    if (canExpand && _isExpanded(row[idField], this.state.expandedRows)) {
      let children = getChildren(row, this.props.data, idField, parentIdField);
      children.forEach((d) => {
        rows.push(...this.makeRowsRecursive(d, nextLevel, metadata, columns, idField, parentIdField));
      });
    }
    return rows;
  }

  handleExpandToggle(row) {
    const rowId = row[this.props.idField];
    if (this.state.expandedRows.indexOf(rowId) > -1) {
      // expanded and has to be collapsed
      // remove collapsed row and all it's children
      const children = this.props.metadata.map[rowId];
      const expandedRows = this.state.expandedRows.filter(function(r) {
        if (r === rowId) {
          return false;
        } else {
          return children.indexOf(r) < 0;
        }
      });
      this.setState({
        expandedRows: expandedRows
      });
    } else {
      // collapsed and has to be expanded
      this.setState({
        expandedRows: [...this.state.expandedRows, rowId]
      });
    }
  }

  onScroll(event) {
    const { scrollLeft, scrollTop } = event.target;
    this._scrollLeft = scrollLeft;
    this._scrollTop = scrollTop;
    this.requestScrollUpdate();
  }

  requestScrollUpdate() {
    if (!this._scrolling) {
      requestAnimationFrame(this.scrollUpdate.bind(this));
    }
    this._scrolling = true;
  }

  scrollUpdate() {
    this._scrolling = false;
    const { _scrollLeft, _scrollTop } = this;
    if (this.state.scrollLeft !== _scrollLeft) {
      this.props.onHScroll(_scrollLeft);
      this.setState({ scrollLeft: _scrollLeft });
    }
    if (this.state.scrollTop !== _scrollTop) {
      this.setState({ scrollTop: _scrollTop });
    }
  }

  getVisibleRowsRange(totalRows) {
    const { scrollTop, scrollLeft } = this.state;
    const { itemHeight, height } = this.props;

    const rowsInView = Math.floor(height/itemHeight);
    let startIndex = Math.floor(scrollTop/itemHeight);

    startIndex = Math.max(0, startIndex - rowsInView);
    let endIndex = startIndex + (rowsInView * 3);
    endIndex = Math.min(endIndex, totalRows);

    const totalHeight = totalRows * itemHeight;
    const topFillerHeight = startIndex * itemHeight;
    const renderedRowsHeight = (endIndex - startIndex) * itemHeight;
    const bottomFillerHeight = totalHeight - topFillerHeight - renderedRowsHeight;

    return [startIndex, endIndex, topFillerHeight, bottomFillerHeight];
  }

  shouldComponentUpdate(nextProps, nextState) {
    // adding this as scroll causes re-render
    // checking just expanded rows for now, can add
    // 'data' in future
    return nextState.scrollTop !== this.state.scrollTop ||
      nextState.scrollLeft !== this.state.scrollLeft ||
      nextProps.width !== this.props.width ||
      nextState.expandedRows.length !== this.state.expandedRows.length ||
      nextProps.updateHash.sort !== this.props.updateHash.sort;
  }

  render() {
    const { columns, data, metadata, idField,
      parentIdField, width, height, expandAll } = this.props;

    const rows = this.makeRows(data, metadata, columns,
      idField, parentIdField, expandAll);

    const [startIndex, endIndex,
      topFillerHeight, bottomFillerHeight] = this.getVisibleRowsRange(rows.length);
    const visibleRows = rows.slice(startIndex, endIndex);

    let tableBody;
    if (typeof height === 'number') {
      tableBody = (
        <tbody>
          <tr style={{ height: topFillerHeight }}></tr>
          {visibleRows}
          <tr style={{ height: bottomFillerHeight }}></tr>
        </tbody>
      );
    } else {
      tableBody = <tbody>{rows}</tbody>;
    }

    return (
      <div className='tgrid-body-wrapper'
        onScroll={this.onScroll} style={{ height: height }}>
        <table className='tgrid-body-table' style={{ width: width}}>
          <Colgroup columns={columns}></Colgroup>
          {tableBody}
        </table>
      </div>
    );
  }
}

Body.propTypes = {
  columns: PropTypes.array.isRequired,
  data: PropTypes.array.isRequired,
  metadata: PropTypes.object.isRequired,
  idField: PropTypes.string.isRequired,
  parentIdField: PropTypes.string.isRequired,
  width: PropTypes.number,
  height: PropTypes.number,
  onHScroll: PropTypes.func.isRequired,
  updateHash: PropTypes.object,
  expandAll: PropTypes.bool,
  itemHeight: PropTypes.number
};

Body.defaultProps = {
  height: null,
  updateHash: {},
  expandAll: false,
  itemHeight: 35
};

export default Body;
