import '../css/row-cell.css';
import React from 'react';
import RowIndent from './RowIndent';
import dateFormat from 'dateFormat';

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
      type,
      format,
      formatter,
      className,
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

    let displayText = data;
    if (type === 'date') {
      displayText = dateFormat(data, format);
    }

    if (typeof formatter === 'function') {
      displayText = formatter(data);
    }

    return (
      <td className='tgrid-data-cell'>
        {rowIndent}
        {expandToggleIcon}
        <span className={className}>{displayText}</span>
      </td>
    );
  }
}

RowCell.propTypes = {
  reactKey: React.PropTypes.string.isRequired,
  index: React.PropTypes.number.isRequired,
  indent: React.PropTypes.number.isRequired,
  data: React.PropTypes.any.isRequired,
  type: React.PropTypes.string,
  format: React.PropTypes.string,
  formatter: React.PropTypes.func,
  className: React.PropTypes.string,
  showExpandCollapse: React.PropTypes.bool,
  isExpanded: React.PropTypes.bool,
  onExpandToggle: React.PropTypes.func
};

RowCell.defaultProps = {
  format: 'mm/dd/yyyy'
};

export default RowCell;
