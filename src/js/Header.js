import React from 'react';
import '../css/header.css';

import ColumnHeader from './ColumnHeader';

class Header extends React.Component {

  _makeColumnHeaders() {
    let columns = this.props.columns;
    let headerWidth = Math.floor(100 / columns.length);

    let columnHeaders = columns.map(function(col) {
      return <ColumnHeader key={col.title} width={headerWidth} title={col.title}></ColumnHeader>
    });
    return columnHeaders;
  }

  render() {
    let columnHeaders = this._makeColumnHeaders();

    return (
      <div className='tgrid-header'>
        {columnHeaders}
      </div>
      );
  }
}

export default Header;