import React, { Component, PropTypes } from 'react';
import '../css/column-options.css';
import FilterContainer from'./FilterContainer';

class ColumnOptions extends Component {
  constructor(props) {
    super(props);
    this.displayName = 'ColumnOptions';
    this.handleSort = this.handleSort.bind(this);
    this.documentClickHandler = this.documentClickHandler.bind(this);
    this.onFilterApply = this.onFilterApply.bind(this);
    this.onFilterClear = this.onFilterClear.bind(this);
  }

  handleSort(dir, event) {
    this.props.onSort(this.props.field, dir);
  }

  documentClickHandler(event) {
    const container = this.refs.container;
    const targetInContainer = container.contains(event.target);
    let isColumnMenuIcon = false;
    const targetClassName = event.target.className;

    if (typeof targetClassName === 'string' &&
      targetClassName.length > 0) {
      isColumnMenuIcon = targetClassName.indexOf('i-column-menu') >= 0;
    }

    if (!targetInContainer && !isColumnMenuIcon) {
      this.props.hide();
    }
  }

  componentDidMount() {
    document.addEventListener('click', this.documentClickHandler, false);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.documentClickHandler, false);
  }

  onFilterApply() {
    console.log('On filter apply');
  }

  onFilterClear() {
    console.log('On filter clear');
  }

  render() {
    const { left, sort, filter, dataType } = this.props;

    return (
      <ul className='column-options' style={{ left: left }} ref='container'>
        <li
          className={sort === 'asc' ? 'active' : null}
          onClick={this.handleSort.bind(this, 'asc')}>Sort ascending</li>
        <li
          className={sort === 'desc' ? 'active' : null}
          onClick={this.handleSort.bind(this, 'desc')}>Sort descending</li>
        <li className='filter-option'>
          Filter<i className='i-arrow-right'></i>
          <FilterContainer
            dataType={dataType}
            onApply={this.onFilterApply}
            onClear={this.onFilterClear}>
          </FilterContainer>
        </li>
      </ul>
    );
  }
}

ColumnOptions.propTypes = {
  left: PropTypes.number.isRequired,
  field: PropTypes.string.isRequired,
  dataType: PropTypes.string.isRequired,
  sort: PropTypes.string,
  filter: PropTypes.object,
  onSort: PropTypes.func.isRequired,
  hide: PropTypes.func.isRequired
};

export default ColumnOptions;
