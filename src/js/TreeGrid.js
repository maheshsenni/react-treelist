import '../css/treegrid.css';
import React, { Component, PropTypes } from 'react';
import Header from './Header';
import Body from './Body';
import { getRowsWithChildren } from './util/TreeUtils';
import getSortedData from './util/SortUtils';
import getFilteredData from './util/FilterUtils';
import FilterWrapper from './FilterWrapper';

class TreeGrid extends Component {
  constructor(props) {
    super(props);
    this.displayName = 'TreeGrid';

    this.handleSort = this.handleSort.bind(this);
    this.handleFilter = this.handleFilter.bind(this);
    this.resizeColumn = this.resizeColumn.bind(this);

    const { columns } = this.props;

    this.state = {
      sortedColumns: {},
      filters: {},
      columns: columns
    };
  }

  handleSort(field, sortDir) {
    if (typeof sortDir === 'string') {
      this.state.sortedColumns[field] = sortDir;
    } else {
      // toggle sort dir if not specified explicitly
      if (field in this.state.sortedColumns) {
        // toggle sorting
        const sortDir = this.state.sortedColumns[field];
        if (sortDir === 'asc') {
          this.state.sortedColumns[field] = 'desc';
        } else if (sortDir === 'desc') {
          // remove sorting if it is already sorted by descending order
          delete this.state.sortedColumns[field];
        }
      } else {
        // sort column in ascending order first time
        this.state.sortedColumns[field] = 'asc';
      }
    }
    // apply changed sortedColumns to state
    this.setState({
      sortedColumns: this.state.sortedColumns
    });
  }

  handleFilter(field, type, value) {
    const filterObj = this.state.filters;
    if (typeof type === 'string') {
      // apply filter on the field
      filterObj[field] = {
        [type]: value
      };
    } else {
      // clear filter on the field
      delete filterObj[field];
    }
    this.setState({
      filters: filterObj
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
    // if (Object.keys(this.state.filters).length > 0) {
    //   renderData = getFilteredData(data, this.state.filters, id, parentId);
    // }
    
    // check if sort is applied in any of the columns
    const sortKeys = Object.keys(this.state.sortedColumns);
    if (sortKeys.length > 0) {
      renderData = getSortedData(renderData, this.state.sortedColumns);
    }

    // generate metadata with final data after filtering and sorting
    const metadata = getRowsWithChildren(renderData, id, parentId);

    return (
      <div className='tgrid'>
        <Header
          columns={columns}
          onSort={this.handleSort}
          onFilter={this.handleFilter}
          sortedColumns={this.state.sortedColumns}
          filters={this.state.filters}
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