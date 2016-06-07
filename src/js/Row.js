import React from 'react';

class Row extends React.Component {
  constructor(props) {
    super(props);
    this.displayName = 'Row';
  }

  _makeCells(columns, data) {
    return columns.map(function(col) {
      return (
        <td className='tgrid-column' key={ 'col' + col.field }>{data[col.field]}</td>
      );
    });
  }

  render() {
    const { columns, data } = this.props;
    const cells = this._makeCells(columns, data);

    return (
      <tr>{cells}</tr>
    );
  }
}

export default Row;
