import React, { Component } from 'react';
import PropTypes from 'prop-types';
import hash from 'object-hash';
import isNil from 'lodash/isNil';

import '../css/treegrid.css';
import Header from './Header';
import Body from './Body';
import { getRowsWithChildren } from './util/TreeUtils';
import getSortedData from './util/SortUtils';

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
    const sortedColumns = { ...this.state.sortedColumns };
    if (typeof sortDir === 'string') {
      sortedColumns[field] = sortDir;
    } else {
      // toggle sort dir if not specified explicitly
      if (field in sortedColumns) {
        // toggle sorting
        const sortDir = sortedColumns[field];
        if (sortDir === 'asc') {
          sortedColumns[field] = 'desc';
        } else if (sortDir === 'desc') {
          // remove sorting if it is already sorted by descending order
          delete sortedColumns[field];
        }
      } else {
        // sort column in ascending order first time
        sortedColumns[field] = 'asc';
      }
    }
    // apply changed sortedColumns to state
    this.setState({
      sortedColumns
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

  getUpdateHash(renderData) {
    if (!isNil(this.props.refresh)) {
      return hash(this.state.sortedColumns);
    } else {
      return hash({
        data: renderData,
        sort: JSON.stringify(this.state.sortedColumns)
      });
    }
  }

  render() {
    let { id, parentId } = this.props;
    const { data, options } = this.props;
    const { handlers } = this.props;
    const { refresh } = this.props;
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
    const updateHash = this.getUpdateHash(renderData);

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
          refresh={refresh}
          expandAll={options.expandAll}
          canSelect={options.canSelect}
          onSelectRow={handlers.onSelectRow}
          rowClass={options.rowClass}
          >
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
  parentId: PropTypes.string,
  handlers: PropTypes.object,
  refresh: PropTypes.any
};

TreeList.defaultProps = {
  options: {},
  handlers: {}
};

export default TreeList;