import '../css/treegrid.css';
import React from 'react';
import Header from './Header';
import Body from './Body';
import { getRowsWithChildren } from './util/TreeUtils';

class TreeGrid extends React.Component {
  render() {
    let { columns, id, parentId } = this.props.options;
    const { data } = this.props;

    // assign defaults
    if (!id) {
      id = 'id';
    }
    if(!parentId) {
      parentId = 'parentId';
    }

    console.time('METADATA');
    const metadata = getRowsWithChildren(data, id, parentId);
    console.timeEnd('METADATA');

    console.log(metadata);

    return (
      <div className='tgrid'>
        <Header columns={columns}></Header>
        <Body
          columns={columns}
          data={data}
          metadata={metadata}
          idField={id}
          parentIdField={parentId}>
        </Body>
      </div>
    );
  }
}

TreeGrid.propTypes = {
  data: React.PropTypes.array.isRequired,
  options: React.PropTypes.object.isRequired
}

export default TreeGrid;