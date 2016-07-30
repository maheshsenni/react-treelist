import React, { Component, PropTypes } from 'react';
import '../css/header-cell.css';

const RESIZE_INDICATOR_WIDTH = 10;

class HeaderCell extends Component {
  constructor(props) {
    super(props);
    this.displayName = 'HeaderCell';
    this.handleClick = this.handleClick.bind(this);
    this.onResizeMouseEnter = this.onResizeMouseEnter.bind(this);
    this.onColumnOptionsClick = this.onColumnOptionsClick.bind(this);
  }

  handleClick() {
    this.props.onSort(this.props.column.field);
  }

  onResizeMouseEnter() {
    const boundingRect = this.refs.resizeIndicator.getBoundingClientRect();
    const currentWidth = this.refs.header.clientWidth;
    this.props.onResizeEnter(this.props.column, boundingRect, currentWidth);
  }

  onColumnOptionsClick(event) {
    const iconRect = event.target.getBoundingClientRect();
    this.props.onColumnOptionsClick(iconRect.left, this.props.column);
    event.stopPropagation();
  }

  componentDidMount() {
    const rect = this.refs.header.getBoundingClientRect();
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
        ref='header'
        className='tgrid-column-header'
        onClick={this.handleClick}>
        <span className='tgrid-column-header-text-wrapper'>
          <span className='tgrid-column-header-text'>
            {this.props.column.title}
          </span>
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
  onResizeEnter: PropTypes.func.isRequired,
  onColumnOptionsClick: PropTypes.func.isRequired,
  whenWidthAvailable:  PropTypes.func.isRequired
};

export default HeaderCell;