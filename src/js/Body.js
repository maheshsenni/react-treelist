import '../css/body.css';
import React from 'react';
import Colgroup from './Colgroup';
import { Row, createRow } from './Row';
import { getRootParents, getCanExpand } from './util/TreeUtils';

class Body extends React.Component {

  constructor(props) {
    super(props);
    this.displayName = 'Body';
    this.handleRowExpand = this.handleRowExpand.bind(this)
  }

  makeRows(data, metadata, columns, idField, parentIdField) {
    // start with first level records
    console.time('ROOT_PARENTS');
    const rootParents = getRootParents(data, parentIdField);
    console.timeEnd('ROOT_PARENTS');
    

    return rootParents.map((d) => {
      return createRow(d, columns, idField, d[idField] in metadata, this.handleRowExpand);
    });
  }

  handleRowExpand(id) {
    console.log('handling row expand in body - ' + id);
  }
  
  render() {
    const { columns, data, metadata, idField, parentIdField } = this.props;
    const rows = this.makeRows(data, metadata, columns, idField, parentIdField);

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
  data: React.PropTypes.array.isRequired,
  metadata: React.PropTypes.object.isRequired,
  idField: React.PropTypes.string.isRequired,
  parentIdField: React.PropTypes.string.isRequired
};

export default Body;
