import React, { Component, PropTypes } from 'react';
import '../css/column-options.css';

class ColumnOptions extends Component {
  constructor(props) {
    super(props);
    this.displayName = 'ColumnOptions';
    this.handleSort = this.handleSort.bind(this);
  }

  handleSort(dir) {
    this.props.onSort(this.props.field, dir);
  }

  render() {
    const { left, sort, filter } = this.props;

    return (
      <ul className='column-options' style={{ left: left }}>
        <li
          className={sort === 'asc' ? 'active' : null}
          onClick={this.handleSort.bind(this, 'asc')}>Sort ascending</li>
        <li
          className={sort === 'desc' ? 'active' : null}
          onClick={this.handleSort.bind(this, 'desc')}>Sort descending</li>
      </ul>
    );
  }
}

ColumnOptions.propTypes = {
  left: PropTypes.number.isRequired,
  field: PropTypes.string.isRequired,
  sort: PropTypes.string,
  filter: PropTypes.object,
  onSort: PropTypes.func.isRequired
};

export default ColumnOptions;
