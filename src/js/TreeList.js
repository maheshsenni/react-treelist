import '../css/treegrid.css';
import React, { Component, PropTypes } from 'react';
import hash from 'object-hash';
import Header from './Header';
import Body from './Body';
import { getRowsWithChildren } from './util/TreeUtils';
import getSortedData from './util/SortUtils';
import getFilteredData from './util/FilterUtils';

class TreeList extends Component {
  constructor(props) {
    super(props);
    this.displayName = 'TreeList';

    this.handleSort = this.handleSort.bind(this);
    this.handleFilter = this.handleFilter.bind(this);
    this.resizeColumn = this.resizeColumn.bind(this);
    this.onBodyHScroll = this.onBodyHScroll.bind(this);

    const { columns } = this.props;

    this.state = {
      sortedColumns: {},
      filters: {},
      columns: columns,
      totalWidth: null,
      scrollLeft: 0
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

  handleFilter(field, type, value, dataType) {
    const filterObj = this.state.filters;
    if (typeof type === 'string') {
      // apply filter on the field
      filterObj[field] = {
        [type]: value,
        dataType: dataType
      };
    } else {
      // clear filter on the field
      delete filterObj[field];
    }
    this.setState({
      filters: filterObj
    });
  }

  resizeColumn(column, width, totalWidth) {
    const newColumn = {...column, width};
    this.state.columns.forEach((c) => {
      if (c.field === column.field) {
        column.width = width;
      }
    });
    this.setState({
      columns: this.state.columns,
      totalWidth: totalWidth
    });
  }

  onBodyHScroll(scrollLeft) {
    if (scrollLeft !== this.state.scrollLeft) {
      this.setState({scrollLeft});
    }
  }

  render() {
    let { id, parentId } = this.props;
    const { data, options } = this.props;
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
    // Filtering is disabled until all the components are ready
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

    // construct update keys
    const updateHash = hash({
      data: renderData,
      sort: JSON.stringify(this.state.sortedColumns)
    });

    console.log('Update hash: ', typeof updateHash);

    return (
      <div className='tgrid'>
        <Header
          columns={columns}
          onSort={this.handleSort}
          onFilter={this.handleFilter}
          sortedColumns={this.state.sortedColumns}
          filters={this.state.filters}
          onResize={this.resizeColumn}
          width={this.state.totalWidth}
          scrollLeft={this.state.scrollLeft}
          minimumColWidth={options.minimumColWidth}>
        </Header>
        <Body
          columns={columns}
          data={renderData}
          metadata={metadata}
          idField={id}
          width={this.state.totalWidth}
          height={options.height}
          parentIdField={parentId}
          onHScroll={this.onBodyHScroll}
          updateHash={updateHash}
          expandAll={options.expandAll}>
        </Body>
      </div>
    );
  }
}

TreeList.propTypes = {
  data: PropTypes.array.isRequired,
  columns: PropTypes.array.isRequired,
  options: PropTypes.object,
  id: PropTypes.string,
  parentId: PropTypes.string
};

TreeList.defaultProps = {
  options: {}
};

export default TreeList;