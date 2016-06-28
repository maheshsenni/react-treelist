import React, { Component } from 'react';
import '../css/filter-container.css';

class FilterContainer extends Component {
  constructor(props) {
    super(props);
    this.displayName = 'FilterContainer';
  }
  render() {
    return (
      <div className='filter-container'>
        <select>
          <option value='eq'>Equal to</option>
          <option value='gt'>Greater than</option>
          <option value='gte'>Greater than or equal to</option>
          <option value='lt'>Less than</option>
          <option value='lte'>Less than or equal to</option>
        </select>
        <input type='text'></input>
        <button>Clear</button><button>Apply</button>
      </div>
    );
  }
}

export default FilterContainer;
