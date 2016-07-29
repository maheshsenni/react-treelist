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
    this.onHorizontalScroll = this.onHorizontalScroll.bind(this);
    this.state = {
      expandedRows: []
    };
  }

  makeRows(data, metadata, columns, idField, parentIdField) {
    // start with first level records
    const rootParents = getRootParents(data, parentIdField);

    const rows = [];
    rootParents.forEach((d) => {
      // parent rows start at level 0
      rows.push(...this.makeRowsRecursive(d, 0, metadata, columns, idField, parentIdField));
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
      const children = this.props.metadata[rowId];
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

  onHorizontalScroll(event) {
    this.props.onHScroll(event.target.scrollLeft);
  }

  shouldComponentUpdate(nextProps, nextState) {
    // adding this as scroll causes re-render
    // checking just expanded rows for now, can add
    // 'data' in future
    return nextProps.width !== this.props.width ||
      nextState.expandedRows.length !== this.state.expandedRows.length;
  }
  
  render() {
    const { columns, data, metadata, idField,
      parentIdField, width, height } = this.props;
    const rows = this.makeRows(data, metadata, columns,
      idField, parentIdField);

    console.log('Expanded rows:', this.state.expandedRows);

    return (
      <div className='tgrid-body-wrapper'
        onScroll={this.onHorizontalScroll} style={{ height: height }}>
        <table className='tgrid-body-table' style={{ width: width}}>
          <Colgroup columns={columns}></Colgroup>
          <tbody>
            {rows}
          </tbody>
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
  onHScroll: PropTypes.func.isRequired
};

Body.defaultProps = {
  height: null
};

export default Body;
