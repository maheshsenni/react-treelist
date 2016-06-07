import '../css/treegrid.css';
import React from 'react';
import Header from './Header';
import Body from './Body';
import LTT from 'list-to-tree';

class TreeGrid extends React.Component {

  _makeTreeData(flatData) {
    const ltt = new LTT(flatData, {
      key_id: 'id',
      key_parent: 'parentId'
    });
    return ltt.GetTree();
  }

  render() {
    const { columns } = this.props.options;
    const { data } = this.props;
    const treeData = this._makeTreeData(data);

    console.log(treeData);

    return (
      <div className='tgrid'>
        <Header columns={columns}></Header>
        <Body columns={columns} treeData={treeData}></Body>
      </div>
    );
  }
}

TreeGrid.propTypes = {
  data: React.PropTypes.array.isRequired,
  options: React.PropTypes.object.isRequired
}

export default TreeGrid;