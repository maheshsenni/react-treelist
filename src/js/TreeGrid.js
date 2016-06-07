import React from 'react';
import '../css/treegrid.css';

import Header from './Header';
import Body from './Body';

class TreeGrid extends React.Component {
  render() {

    const { columns } = this.props.options;
    const { data } = this.props;

    return (
      <div className='tgrid'>
        <Header columns={columns}></Header>
        <Body columns={columns} data={data}></Body>
      </div>
    );
  }
}

TreeGrid.propTypes = {
  data: React.PropTypes.array.isRequired,
  options: React.PropTypes.object.isRequired
}

export default TreeGrid;