import '../css/row-cell.css';
import React from 'react';
import RowIndent from './RowIndent';

class RowCell extends React.Component {
  constructor(props) {
    super(props);
    this.displayName = 'RowCell';
  }
  render() {
    const {
      index,
      reactKey,
      indent,
      data,
      showExpandCollapse,
      isExpanded,
      onExpandToggle
    } = this.props;

    // indentation dummies
    let rowIndent = null;
    if (index === 0) {
      rowIndent = <RowIndent indent={indent} reactKey={reactKey}></RowIndent>;
    }

    // expand or collapse icon
    let expandToggleIcon = null;
    if (index === 0 && showExpandCollapse && !isExpanded) {
      expandToggleIcon = <span className='i-expand' onClick={onExpandToggle}>+</span>;
    } else if (index === 0 && showExpandCollapse && isExpanded) {
      expandToggleIcon = <span className='i-collapse' onClick={onExpandToggle}>-</span>;
    }

    return (
      <td className='tgrid-data-cell'>
        {rowIndent}
        {expandToggleIcon}
        {data}
      </td>
    );
  }
}

RowCell.propTypes = {
  reactKey: React.PropTypes.string.isRequired,
  index: React.PropTypes.number.isRequired,
  indent: React.PropTypes.number.isRequired,
  data: React.PropTypes.any.isRequired,
  showExpandCollapse: React.PropTypes.bool,
  isExpanded: React.PropTypes.bool,
  onExpandToggle: React.PropTypes.func
};

export default RowCell;
