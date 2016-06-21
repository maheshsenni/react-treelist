import '../css/body.css';
import React from 'react';
import Colgroup from './Colgroup';
import { Row, createRow } from './Row';
import { getRootParents, getChildren } from './util/TreeUtils';

const _isExpanded = function(rowId, expandedRows) {
  return expandedRows.indexOf(rowId) > -1;
};

class Body extends React.Component {

  constructor(props) {
    super(props);
    this.displayName = 'Body';
    this.handleExpandToggle = this.handleExpandToggle.bind(this);
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
  
  render() {
    const { columns, data, metadata, idField, parentIdField } = this.props;
    const rows = this.makeRows(data, metadata, columns, idField, parentIdField);

    console.log('Expanded rows:', this.state.expandedRows);

    return (
      <div className='tgrid-body-wrapper'>
        <table className='tgrid-body-table'>
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
  columns: React.PropTypes.array.isRequired,
  data: React.PropTypes.array.isRequired,
  metadata: React.PropTypes.object.isRequired,
  idField: React.PropTypes.string.isRequired,
  parentIdField: React.PropTypes.string.isRequired
};

export default Body;
