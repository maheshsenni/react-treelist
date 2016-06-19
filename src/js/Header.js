import React from 'react';
import '../css/header.css';

import HeaderCell from './HeaderCell';
import Colgroup from './Colgroup';
import ColumnResizeHandler from './ColumnResizeHandler';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.displayName = 'Header';
  }

  _makeTableHeaders(columns) {
    const headerCells = columns.map((col, index) => {
      return (
        <HeaderCell
          key={'colh-' + index}
          column={col}
          sort={this.props.sortedColumns[col.field]}
          onSort={this.props.onSort}>
        </HeaderCell>
      );
    });
    return headerCells;
  }

  render() {
    const { columns } = this.props;
    const headerCells = this._makeTableHeaders(columns);

    return (
      <div className='tgrid-header-wrapper'>
        <table className='tgrid-header-table'>
          <Colgroup columns={columns}></Colgroup>
          <thead>
            <tr>
              {headerCells}
            </tr>
          </thead>
        </table>
        <ColumnResizeHandler></ColumnResizeHandler>
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