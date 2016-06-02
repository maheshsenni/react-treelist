import React from 'react';

class TreeGrid extends React.Component {
  render() {
    console.log(this.props.data.length);
    return <div>This is a tree grid</div>;
  }
}

TreeGrid.propTypes = {
  data: React.PropTypes.array.isRequired
}

export default TreeGrid;