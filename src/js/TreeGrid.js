import React from 'react';
import '../css/treegrid.css';

import Header from './Header';

class TreeGrid extends React.Component {
  render() {

    const { columns } = this.props.options;

    return (
      <div className='tgrid'>
        <Header columns={columns}></Header>
      </div>
    );
  }
}

TreeGrid.propTypes = {
  data: React.PropTypes.array.isRequired,
  options: React.PropTypes.object.isRequired
}

export default TreeGrid;