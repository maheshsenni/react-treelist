import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import RowCell from '../RowCell';

Enzyme.configure({adapter: new Adapter()});

describe('<RowCell />', () => {
  it('renders row cell with data', () => {
    const testData = 'Test data';
    const wrapper = shallow(<RowCell reactKey={'test-key'} data={testData} />);
    // <td class="tgrid-data-cell"><span class="i-dummy"></span><span>Test data</span></td>
    expect(wrapper.find('.tgrid-data-cell')).toHaveLength(1);
    expect(wrapper.childAt(0).hasClass('i-dummy')).toBe(true);
    expect(wrapper.childAt(1).name()).toBe('span');
    expect(wrapper.childAt(1).text()).toBe(testData);
  });

  it('renders row cell with indent', () => {
    const testData = 'Test data';
    const wrapper = shallow(<RowCell reactKey={'test-key'}
      useIndent={true} indent={2} data={testData} />);
    expect(wrapper.find('.tgrid-data-cell')).toHaveLength(1);
    expect(wrapper.childAt(0).name()).toBe('RowIndent');
    expect(wrapper.childAt(1).hasClass('i-dummy')).toBe(true);
    expect(wrapper.childAt(2).text()).toBe(testData);
  });

  it('renders row cell with expand icon', () => {
    const testData = 'Test data';
    const wrapper = shallow(<RowCell reactKey={'test-key'}
      showExpandCollapse={true} data={testData} />);
    expect(wrapper.find('.tgrid-data-cell').length).toBe(1);
    expect(wrapper.childAt(0).hasClass('i-expand')).toBe(true);
    expect(wrapper.childAt(1).text()).toBe(testData);
  });

  it('renders row cell with collapse icon', () => {
    const testData = 'Test data';
    const wrapper = shallow(<RowCell reactKey={'test-key'}
      showExpandCollapse={true} isExpanded={true} data={testData} />);
    expect(wrapper.find('.tgrid-data-cell').length).toBe(1);
    expect(wrapper.childAt(0).hasClass('i-collapse')).toBe(true);
    expect(wrapper.childAt(1).text()).toBe(testData);
  });

  it('uses custom formatter to render cell data', () => {
    const testData = 'Test data';
    function formatter(data) { return data + ' formatted'; }

    const wrapper = shallow(<RowCell reactKey={'test-key'}
      formatter={formatter} data={testData} />);
    expect(wrapper.find('.tgrid-data-cell').length).toBe(1);
    expect(wrapper.childAt(1).text()).toBe(formatter(testData));
  });

  it('should call custom formatter with two arguments - cell and row data', () => {
    const testData = 'Test data';
    const rowData = { prop: 'test' };
    const mockFormatter = jest.fn(data => data + ' formatted');

    const wrapper = shallow(<RowCell reactKey={'test-key'}
      formatter={mockFormatter} data={testData} rowData={rowData} />);
    expect(wrapper.find('.tgrid-data-cell').length).toBe(1);
    expect(mockFormatter.mock.calls.length).toBe(1);
    expect(mockFormatter.mock.calls[0].length).toBe(2);
    expect(mockFormatter).toBeCalledWith(testData, rowData);
    expect(wrapper.childAt(1).text()).toBe(mockFormatter(testData));
  });

  it('formats date values based on provided format', () => {
    const testData = new Date(1995, 11, 17).getTime();
    const format = 'dd/mm/yyyy';

    const wrapper = shallow(<RowCell reactKey={'test-key'}
      format={format} data={testData} type={'date'} />);
    expect(wrapper.find('.tgrid-data-cell').length).toBe(1);
    expect(wrapper.childAt(1).text()).toBe('17/12/1995');
  });

  it('formats date values based on default format if format is not provided', () => {
    const testData = new Date(1995, 11, 17).getTime();

    const wrapper = shallow(<RowCell reactKey={'test-key'}
      data={testData} type={'date'} />);
    expect(wrapper.find('.tgrid-data-cell').length).toBe(1);
    expect(wrapper.childAt(1).text()).toBe('12/17/1995');
  });

  it('renders empty cell when data is not provided or undefined', () => {
    const wrapper = shallow(<RowCell reactKey={'test-key'} />);
    expect(wrapper.find('.tgrid-data-cell').length).toBe(1);
    expect(wrapper.childAt(1).text()).toBe('');
  });

  it('renders empty cell when data is not provided or undefined and type is date', () => {
    const wrapper = shallow(<RowCell reactKey={'test-key'} type={'date'} />);
    expect(wrapper.find('.tgrid-data-cell').length).toBe(1);
    expect(wrapper.childAt(1).text()).toBe('');
  });

  it('renders row cell with custom class name', () => {
    const className = 'test-class';
    const wrapper = shallow(<RowCell reactKey={'test-key'} className={className} />);
    expect(wrapper.find('.tgrid-data-cell').length).toBe(1);
    expect(wrapper.childAt(1).hasClass(className)).toBe(true);
  });

  it('calls callback function when expand icon is clicked', () => {
    const onExpandToggle = jest.fn();
    const wrapper = shallow(<RowCell reactKey={'test-key'} showExpandCollapse={true} onExpandToggle={onExpandToggle} />);
    wrapper.find('.i-expand').simulate('click');
    expect(onExpandToggle.mock.calls).toHaveLength(1);
  });

  it('calls callback function when collapse icon is clicked', () => {
    const onExpandToggle = jest.fn();
    const wrapper = shallow(<RowCell reactKey={'test-key'} showExpandCollapse={true}
      isExpanded={true} onExpandToggle={onExpandToggle} />);
    wrapper.find('.i-collapse').simulate('click');
    expect(onExpandToggle.mock.calls).toHaveLength(1);
  });
});