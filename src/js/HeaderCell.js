import React from 'react';
import '../css/header-cell.css';

class HeaderCell extends React.Component {
  constructor(props) {
    super(props);
    this.displayName = 'HeaderCell';
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.onSort(this.props.column);
  }

  render() {
    const { sort } = this.props;
    let sortIndicator = null;

    if (sort === 'asc') {
      sortIndicator = <span className='i-sort-asc'>&gt;</span>;
    } else if (sort === 'desc') {
      sortIndicator = <span className='i-sort-desc'>&gt;</span>;
    }

    return (
      <th
        className='tgrid-column-header'
        onClick={this.handleClick}>
        {this.props.column.title}
        {sortIndicator}
      </th>
    );
  }
}

HeaderCell.propTypes = {
  column: React.PropTypes.object.isRequired,
  onSort: React.PropTypes.func.isRequired,
  sort: React.PropTypes.string
};

export default HeaderCell;