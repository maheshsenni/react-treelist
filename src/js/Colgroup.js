import React from 'react';

class Colgroup extends React.Component {
    
  constructor(props) {
      super(props);
  }

  _makeCols(columns) {
    return columns.map(function(column) {
      return <col key={'col-' + column.field} style={{width: column.width}}></col>;
    });
  }

  render() {
    const { columns } = this.props;
    const cols = this._makeCols(columns);
    
    return (
      <colgroup>
        {cols}
      </colgroup>
      );
  }
}

Colgroup.propTypes = {
  columns: React.PropTypes.array.isRequired
};

export default Colgroup;
