import React, { Component, PropTypes } from 'react';
import '../css/header-cell.css';

const RESIZE_INDICATOR_WIDTH = 10;

class HeaderCell extends Component {
  constructor(props) {
    super(props);
    this.displayName = 'HeaderCell';
    this.handleClick = this.handleClick.bind(this);
    this.onResizeMouseEnter = this.onResizeMouseEnter.bind(this);
  }

  handleClick() {
    this.props.onSort(this.props.column);
  }

  onResizeMouseEnter() {
    const boundingRect = this.refs.resizeIndicator.getBoundingClientRect();
    const currentWidth = this.refs.header.offsetWidth;
    this.props.onResizeEnter(this.props.column, boundingRect, currentWidth);
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
        ref='header'
        className='tgrid-column-header'
        onClick={this.handleClick}>
        <span className='tgrid-column-header-text'>
          {this.props.column.title}
          {sortIndicator}
        </span>
        <div className='resize-indicator'
          ref='resizeIndicator'
          style={{width: RESIZE_INDICATOR_WIDTH}}
          onMouseEnter={this.onResizeMouseEnter}>
        </div>
      </th>
    );
  }
}

HeaderCell.propTypes = {
  column: PropTypes.object.isRequired,
  onSort: PropTypes.func.isRequired,
  sort: PropTypes.string,
  onResizeEnter: PropTypes.func.isRequired
};

export default HeaderCell;