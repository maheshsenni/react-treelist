import '../css/body.css';
import React from 'react';
import Colgroup from './Colgroup';
import Row from './Row';

class Body extends React.Component {

  constructor(props) {
    super(props);
    this.displayName = 'Body';
  }
  
  render() {
    const { columns, data } = this.props;

    return (
      <div className='tgrid-body-wrapper'>
        <table className='tgrid-body-table'>
          <Colgroup columns={columns}></Colgroup>
          <tbody>
            {data.map(function(d) {
              return <Row key={'row-' + d.id} columns={columns} data={d}></Row>
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

Body.propTypes = {
  columns: React.PropTypes.array.isRequired,
  data: React.PropTypes.array.isRequired
};

export default Body;
