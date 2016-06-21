import React from 'react';
import RowCell from './RowCell';

class Row extends React.Component {
  constructor(props) {
    super(props);
    this.displayName = 'Row';
    this.handleExpandToggle = this.handleExpandToggle.bind(this);
  }

  handleExpandToggle() {
    this.props.onExpandToggle(this.props.data);
  }

  makeCells(columns, data, canExpand) {
    return columns.map((col, index) => {
      return (
        <RowCell
          key={this.props.reactKey + '-col-' + index}
          reactKey={this.props.reactKey + '-col-' + index}
          index={index}
          indent={this.props.level}
          data={data[col.field]}
          showExpandCollapse={canExpand}
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
  reactKey: React.PropTypes.string.isRequired,
  columns: React.PropTypes.array.isRequired,
  data: React.PropTypes.object.isRequired,
  level: React.PropTypes.number.isRequired,
  canExpand: React.PropTypes.bool.isRequired,
  expanded: React.PropTypes.bool,
  onExpandToggle: React.PropTypes.func
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
