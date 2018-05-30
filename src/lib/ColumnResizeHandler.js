import React from 'react';
import '../css/column-resize-handler.css';

class ColumnResizeHandler extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
      return <div className='tgrid-col-resize-handler'></div>;
  }
}

export default ColumnResizeHandler;
