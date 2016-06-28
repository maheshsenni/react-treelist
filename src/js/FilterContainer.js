import React, { Component, PropTypes } from 'react';
import '../css/filter-container.css';
import {
  OPTIONS_STRING,
  OPTIONS_NUMBER,
  OPTIONS_DATE } from './util/FilterUtils';

class FilterContainer extends Component {
  constructor(props) {
    super(props);
    this.displayName = 'FilterContainer';
    this.state = {
      filterText: '',
      filterType: '',
      options: []
    };
    this.onTextChange = this.onTextChange.bind(this);
    this.onTypeChange = this.onTypeChange.bind(this);
  }

  onTextChange(event) {
    this.setState({
      filterText: event.target.value
    });
  }

  onTypeChange(event) {
    this.setState({
      filterType: event.target.value
    });
  }

  componentWillReceiveProps(nextProps) {
    const { dataType, filterType, filterText } = nextProps;

    let options = null;
    if (dataType === 'number') {
      options = OPTIONS_NUMBER;
    } else if (dataType === 'date') {
      options = OPTIONS_DATE;
    } else {
      options = OPTIONS_STRING;
    }

    this.setState({
      filterText: filterText || 'nothing here',
      filterType: filterType || options[0].value,
      options: options
    });
  }

  render() {
    console.log(this.state);
    return (
      <div className='filter-container'>
        <select value={this.state.filterType} onChange={this.onTypeChange}>
          {this.state.options.map(function(d) {
            return <option key={d.value} value={d.value}>{d.text}</option>
          })}
        </select>
        <input
          type='text'
          value={this.state.filterText}
          onChange={this.onTextChange}>
        </input>
        <button>Clear</button><button>Apply</button>
      </div>
    );
  }
}

FilterContainer.propTypes = {
  dataType: PropTypes.string.isRequired,
  filterType: PropTypes.string,
  filterText: PropTypes.string,
  onApply: PropTypes.func.isRequired,
  onClear: PropTypes.func.isRequired
};

export default FilterContainer;
