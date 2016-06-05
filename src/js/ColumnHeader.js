import React from 'react';
import '../css/column-header.css';

class ColumnHeader extends React.Component {
  render() {
    return (
      <th className='tgrid-column-header'>{this.props.title}</th>
      );
  }
}

export default ColumnHeader;