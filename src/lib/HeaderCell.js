import React, { Component } from 'react';
import PropTypes from 'prop-types';

import '../css/header-cell.css';

const RESIZE_INDICATOR_WIDTH = 10;

class HeaderCell extends Component {
  constructor(props) {
    super(props);
    this.headerRef;
    this.resizeIndicatorRef;
    this.displayName = 'HeaderCell';
    this.handleClick = this.handleClick.bind(this);
    this.onResizeMouseEnter = this.onResizeMouseEnter.bind(this);
    this.onColumnOptionsClick = this.onColumnOptionsClick.bind(this);
  }

  handleClick() {
    this.props.onSort(this.props.column.field);
  }

  onResizeMouseEnter() {
    const boundingRect = this.resizeIndicatorRef.getBoundingClientRect();
    const currentWidth = this.headerRef.clientWidth;
    this.props.onResizeEnter(this.props.column, boundingRect, currentWidth);
  }

  onColumnOptionsClick(event) {
    const iconRect = event.target.getBoundingClientRect();
    this.props.onColumnOptionsClick(iconRect.left, this.props.column);
    event.stopPropagation();
  }

  componentDidMount() {
    const rect = this.headerRef.getBoundingClientRect();
    this.props.whenWidthAvailable(this.props.column.field, rect.width);
  }

  render() {
    const { sort } = this.props;
    let sortIndicator = null;

    if (sort === 'asc') {
      sortIndicator = <span className='i-sort i-sort-asc'></span>;
    } else if (sort === 'desc') {
      sortIndicator = <span className='i-sort i-sort-desc'></span>;
    }

    return (
      <th
        ref={(el) => this.headerRef = el}
        className='tgrid-column-header'
        onClick={this.handleClick}>
        <span className='tgrid-column-header-text-wrapper'>
          <span className='tgrid-column-header-text'>
            {this.props.column.title}
          </span>
          {sortIndicator}
        </span>
        <div className='resize-indicator'
          ref={(el) => this.resizeIndicatorRef = el}
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
  onResizeEnter: PropTypes.func.isRequired,
  onColumnOptionsClick: PropTypes.func.isRequired,
  whenWidthAvailable:  PropTypes.func.isRequired
};

export default HeaderCell;