import React from 'react';
import '../css/column-header.css';

class ColumnHeader extends React.Component {
  render() {
    return (
      <div className='tgrid-column-header' style={{width: this.props.width + '%'}}>{this.props.title}</div>
      );
  }
}

export default ColumnHeader;