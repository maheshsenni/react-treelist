import React from 'react';
import '../css/header.css';

import ColumnHeader from './ColumnHeader';
import Colgroup from './Colgroup';
import ColumnResizeHandler from './ColumnResizeHandler';

class Header extends React.Component {
  constructor(props) {
    super(props);
  }

  _makeTableHeaders(columns) {
    const columnHeaders = columns.map(function(col) {
      return <ColumnHeader key={col.title} title={col.title}></ColumnHeader>
    });
    return columnHeaders;
  }

  render() {
    const { columns } = this.props;
    const columnHeaders = this._makeTableHeaders(columns);

    return (
      <div className='tgrid-header-wrapper'>
        <table className='tgrid-header-table'>
          <Colgroup columns={columns}></Colgroup>
          <thead>
            <tr>
              {columnHeaders}
            </tr>
          </thead>
        </table>
        <ColumnResizeHandler></ColumnResizeHandler>
      </div>
    );
  }
}

export default Header;