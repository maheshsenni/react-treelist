import React from 'react';

class FilterWrapper extends React.Component {
  constructor(props) {
    super(props);
    this.displayName = 'FilterWrapper';

    this.state = {
      selectedField: '',
      filterText: ''
    };

    this.onTextChange = this.onTextChange.bind(this);
    this.onFieldChange = this.onFieldChange.bind(this);
    this.applyFilter = this.applyFilter.bind(this);
  }

  onTextChange(event) {
    this.setState({
      filterText: event.target.value
    });
  }

  onFieldChange(event) {
    this.setState({
      selectedField: event.target.value
    });
  }

  applyFilter() {
    this.props.onFilter(this.state.selectedField, this.state.filterText);
  }

  render() {
    return (
      <div>
        <select value={this.state.selectedField} onChange={this.onFieldChange}>
          {
            this.props.columns.map(function(c) {
              return <option key={c.field} value={c.field}>{c.title}</option>
            })
          }
        </select>
        <input type='text' onChange={this.onTextChange} value={this.state.filterText}/>
        <button onClick={this.applyFilter}>Apply</button>
      </div>
    );
  }
}

export default FilterWrapper;
