import React, { Component, PropTypes } from 'react';
import RowCell from './RowCell';

class Row extends Component {
  constructor(props) {
    super(props);
    this.displayName = 'Row';
    this.handleExpandToggle = this.handleExpandToggle.bind(this);
  }

  handleExpandToggle() {
    this.props.onExpandToggle(this.props.data);
  }

  makeCells(columns, data, canExpand) {
    // check if a column is specified to show
    // expand collapse icon
    let expandColumn = columns.filter((col) => {
      return col.expand;
    })[0];
    // use first columns as default to show
    // expand collapse icon
    if (typeof expandColumn === 'undefined') {
      expandColumn = columns[0];
    }

    return columns.map((col, index) => {
      return (
        <RowCell
          key={this.props.reactKey + '-col-' + index}
          reactKey={this.props.reactKey + '-col-' + index}
          indent={this.props.level}
          useIndent={expandColumn.field === col.field}
          data={data[col.field]}
          type={col.type}
          format={col.format}
          formatter={col.formatter}
          className={col.class}
          showExpandCollapse={canExpand && (expandColumn.field === col.field)}
          isExpanded={this.props.expanded}
          onExpandToggle={this.handleExpandToggle}></RowCell>
      );
    });
  }

  render() {
    const { columns, data, canExpand } = this.props;
    const cells = this.makeCells(columns, data, canExpand);

    return (
      <tr>{cells}</tr>
    );
  }
}

Row.propTypes = {
  reactKey: PropTypes.string.isRequired,
  columns: PropTypes.array.isRequired,
  data: PropTypes.object.isRequired,
  level: PropTypes.number.isRequired,
  canExpand: PropTypes.bool.isRequired,
  expanded: PropTypes.bool,
  onExpandToggle: PropTypes.func
};

const createRow = function(data, level, columns, idField, canExpand, expanded, onExpandToggleHandler) {
  return (<Row
            key={'row-' + data[idField]}
            reactKey={'row-' + data[idField]}
            columns={columns}
            data={data}
            level={level}
            canExpand={canExpand}
            expanded={expanded}
            onExpandToggle={onExpandToggleHandler}></Row>);
}

export { Row, createRow };
