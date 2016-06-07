import '../css/body.css';
import React from 'react';
import Colgroup from './Colgroup';
import Row from './Row';

class Body extends React.Component {

  constructor(props) {
    super(props);
    this.displayName = 'Body';
    this.handleRowExpand = this.handleRowExpand.bind(this)
  }

  makeRows(treeData, columns) {
    return treeData.map((d) => {
      return (<Row
                key={'row-' + d.id}
                columns={columns}
                data={d}
                onExpand={this.handleRowExpand}></Row>);
    });
  }

  handleRowExpand(id) {
    console.log('handling row expand in body - ' + id);
  }
  
  render() {
    const { columns, treeData } = this.props;
    const rows = this.makeRows(treeData, columns);

    return (
      <div className='tgrid-body-wrapper'>
        <table className='tgrid-body-table'>
          <Colgroup columns={columns}></Colgroup>
          <tbody>
            {rows}
          </tbody>
        </table>
      </div>
    );
  }
}

Body.propTypes = {
  columns: React.PropTypes.array.isRequired,
  treeData: React.PropTypes.array.isRequired
};

export default Body;
