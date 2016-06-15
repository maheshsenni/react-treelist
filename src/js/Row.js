import '../css/row.css';
import React from 'react';

class Row extends React.Component {
  constructor(props) {
    super(props);
    this.displayName = 'Row';
    this.state = { expanded: false };
    this.handleExpandClick = this.handleExpandClick.bind(this);
  }

  handleExpandClick() {
    if (this.state.expanded) {
      this.setState({ expanded: false });
    } else {
      this.setState({ expanded: true });
      if (typeof(this.props.onExpand) !== undefined) {
        this.props.onExpand(this.props.data.id);
      }
    }
  }

  makeCells(columns, data, canExpand) {
    return columns.map((col, index) => {
      return (
        <td className='tgrid-data-cell' key={ 'col' + col.field }>
          {(() => {
            if (index === 0 && canExpand && !this.state.expanded) {
              return <span className='i-expand' onClick={this.handleExpandClick}>+</span>;
            } else if (index === 0 && canExpand && this.state.expanded) {
              return <span className='i-collapse' onClick={this.handleExpandClick}>-</span>;
            }
          })()}
          {data[col.field]}
        </td>
      );
    });
  }

  render() {
    const { columns, data, canExpand } = this.props;
    const cells = this.makeCells(columns, data, canExpand);

    return (
      <tr>{cells}</tr>
    );
  }
}

Row.propTypes = {
  key: React.PropTypes.string.isRequired,
  columns: React.PropTypes.array.isRequired,
  data: React.PropTypes.object.isRequired,
  canExpand: React.PropTypes.bool.isRequired,
  onExpand: React.PropTypes.func
};

const createRow = function(data, columns, idField, canExpand, onExpandHandler) {
  console.log('Create row for ' + canExpand);
  return (<Row
            key={'row-' + data[idField]}
            columns={columns}
            data={data}
            canExpand={canExpand}
            onExpand={onExpandHandler}></Row>);
}

export { Row, createRow };
