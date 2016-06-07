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

  makeCells(columns, data) {
    return columns.map((col, index) => {
      return (
        <td className='tgrid-data-cell' key={ 'col' + col.field }>
          {(() => {
            if (index === 0 && data.child && !this.state.expanded) {
              return <span className='i-expand' onClick={this.handleExpandClick}>+</span>;
            } else if (index === 0 && data.child && this.state.expanded) {
              return <span className='i-collapse' onClick={this.handleExpandClick}>-</span>;
            }
          })()}
          {data[col.field]}
        </td>
      );
    });
  }

  render() {
    const { columns, data } = this.props;
    const cells = this.makeCells(columns, data);

    return (
      <tr>{cells}</tr>
    );
  }
}

Row.propTypes = {
  columns: React.PropTypes.array.isRequired,
  data: React.PropTypes.object.isRequired,
  onExpand: React.PropTypes.func
};

export default Row;
