import '../css/treegrid.css';
import React, { Component, PropTypes } from 'react';
import Header from './Header';
import Body from './Body';
import { getRowsWithChildren } from './util/TreeUtils';
import { getFilteredData, getSortedData } from './util/DataUtils';
import FilterWrapper from './FilterWrapper';

class TreeGrid extends Component {
  constructor(props) {
    super(props);
    this.displayName = 'TreeGrid';

    this.handleSort = this.handleSort.bind(this);
    this.applyFilter = this.applyFilter.bind(this);
    this.clearFilters = this.clearFilters.bind(this);
    this.resizeColumn = this.resizeColumn.bind(this);

    const { columns } = this.props;

    this.state = {
      sortedColumns: {},
      filters: {},
      columns: columns
    };
  }

  handleSort(column) {
    if (column.field in this.state.sortedColumns) {
      // toggle sorting
      const sortDir = this.state.sortedColumns[column.field];
      if (sortDir === 'asc') {
        this.state.sortedColumns[column.field] = 'desc';
      } else if (sortDir === 'desc') {
        // remove sorting if it is already sorted by descending order
        delete this.state.sortedColumns[column.field];
      }
      this.setState({
        sortedColumns: this.state.sortedColumns
      });
    } else {
      // sort column in ascending order
      this.state.sortedColumns[column.field] = 'asc';
      this.setState({
        sortedColumns: this.state.sortedColumns
      });
    }
  }

  applyFilter(field, value) {
    this.setState({
      filters: {
        ...this.state.filters,
        [field]: value
      }
    });
  }

  clearFilters() {
    this.setState({
      filters: {}
    });
  }

  resizeColumn(column, width) {
    const newColumn = {...column, width};
    this.state.columns.forEach((c) => {
      if (c.field === column.field) {
        column.width = width;
      }
    });
    this.setState({
      columns: this.state.columns
    });
  }

  render() {
    let { id, parentId } = this.props;
    const { data } = this.props;
    const { columns } = this.state;

    // assign defaults
    if (!id) {
      id = 'id';
    }
    if(!parentId) {
      parentId = 'parentId';
    }

    // use intial data from props by default
    let renderData = data;
    if (Object.keys(this.state.filters).length > 0) {
      renderData = getFilteredData(data, this.state.filters, id, parentId);
    }
    
    // check if sort is applied in any of the columns
    const sortKeys = Object.keys(this.state.sortedColumns);
    if (sortKeys.length > 0) {
      renderData = getSortedData(renderData, this.state.sortedColumns);
    }

    // generate metadata with final data after filtering and sorting
    const metadata = getRowsWithChildren(renderData, id, parentId);

    return (
      <div className='tgrid'>
        <FilterWrapper
          columns={columns}
          onFilter={this.applyFilter}
          onClearAll={this.clearFilters}>
        </FilterWrapper>
        <Header
          columns={columns}
          onSort={this.handleSort}
          sortedColumns={this.state.sortedColumns}
          onResize={this.resizeColumn}>
        </Header>
        <Body
          columns={columns}
          data={renderData}
          metadata={metadata}
          idField={id}
          parentIdField={parentId}>
        </Body>
      </div>
    );
  }
}

TreeGrid.propTypes = {
  data: PropTypes.array.isRequired,
  columns: PropTypes.array.isRequired,
  id: PropTypes.string,
  parentId: PropTypes.string
}

export default TreeGrid;