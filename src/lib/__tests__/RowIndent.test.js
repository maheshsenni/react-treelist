import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import RowIndent from '../RowIndent';

Enzyme.configure({adapter: new Adapter()});

describe('<RowIndent />', () => {
	it('renders one row indent dummy with react key', () => {
		const wrapper = shallow(<RowIndent reactKey={'test-key'} indent={1} />);
		expect(wrapper.find('.row-indent-wrapper')).toHaveLength(1);
		expect(wrapper.find('.row-indent-wrapper')).toHaveLength(1);
		expect(wrapper.find('.row-indent-wrapper .row-indent').key()).toBe('test-key-indent-1');
	});
	it('renders "n" row indent dummies with react keys', () => {
		const wrapper = shallow(<RowIndent reactKey={'test-key'} indent={3} />);
		expect(wrapper.find('.row-indent-wrapper')).toHaveLength(1);
		expect(wrapper.find('.row-indent-wrapper .row-indent')).toHaveLength(3);
		expect(wrapper.find('.row-indent-wrapper .row-indent').at(2).key()).toBe('test-key-indent-1');
		expect(wrapper.find('.row-indent-wrapper .row-indent').at(1).key()).toBe('test-key-indent-2');
		expect(wrapper.find('.row-indent-wrapper .row-indent').at(0).key()).toBe('test-key-indent-3');
	});
	it('renders nothing when indent is 0', () => {
		const wrapper = shallow(<RowIndent reactKey={'test-key'} indent={0} />);
		expect(wrapper.get(0)).toBeNull();
	});
	it('renders nothing when indent is less than 0', () => {
		const wrapper = shallow(<RowIndent reactKey={'test-key'} indent={0} />);
		expect(wrapper.get(0)).toBeNull();
	});
});
