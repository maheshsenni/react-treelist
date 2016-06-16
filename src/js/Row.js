import '../css/row.css';
import React from 'react';

const ROW_EXPAND = 1;
const ROW_COLLAPSE = 2;

class Row extends React.Component {
  constructor(props) {
    super(props);
    this.displayName = 'Row';
    this.state = { expanded: false };
    this.handleExpandToggle = this.handleExpandToggle.bind(this);
  }

  handleExpandToggle() {
    if (this.state.expanded) {
      this.setState({ expanded: false });
      this.props.onExpandToggle(this.props.data, ROW_COLLAPSE);
    } else {
      this.setState({ expanded: true });
      this.props.onExpandToggle(this.props.data, ROW_EXPAND);
    }
  }

  makeCells(columns, data, canExpand) {
    return columns.map((col, index) => {
      return (
        <td className='tgrid-data-cell' key={ 'col' + col.field }>
          {(() => {
            if (index === 0 && canExpand && !this.state.expanded) {
              return <span className='i-expand' onClick={this.handleExpandToggle}>+</span>;
            } else if (index === 0 && canExpand && this.state.expanded) {
              return <span className='i-collapse' onClick={this.handleExpandToggle}>-</span>;
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
  columns: React.PropTypes.array.isRequired,
  data: React.PropTypes.object.isRequired,
  level: React.PropTypes.number.isRequired,
  canExpand: React.PropTypes.bool.isRequired,
  onExpandToggle: React.PropTypes.func
};

const createRow = function(data, level, columns, idField, canExpand, onExpandToggleHandler) {
  return (<Row
            key={'row-' + data[idField]}
            columns={columns}
            data={data}
            level={level}
            canExpand={canExpand}
            onExpandToggle={onExpandToggleHandler}></Row>);
}

export { Row, createRow, ROW_EXPAND, ROW_COLLAPSE };
