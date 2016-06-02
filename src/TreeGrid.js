import React from 'react';
import './css/treegrid.css';

import Header from './js/Header';

class TreeGrid extends React.Component {
  render() {
    return (
      <div className='tgrid'>
        <Header columns={this.props.options.columns}></Header>
      </div>
    );
  }
}

TreeGrid.propTypes = {
  data: React.PropTypes.array.isRequired,
  options: React.PropTypes.object.isRequired
}

export default TreeGrid;