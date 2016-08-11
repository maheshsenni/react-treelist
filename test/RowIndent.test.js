import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';

import RowIndent from '../src/js/RowIndent.js';

describe('<RowIndent />', () => {
	it('renders one row indent dummy with react key', () => {
		const wrapper = shallow(<RowIndent reactKey={'test-key'} indent={1} />);
		expect(wrapper.find('.row-indent-wrapper').length).to.equal(1);
		expect(wrapper.find('.row-indent-wrapper').length).to.equal(1);
		expect(wrapper.find('.row-indent-wrapper .row-indent').key()).to.equal('test-key-indent-1');
	});
	it('renders "n" row indent dummies with react keys', () => {
		const wrapper = shallow(<RowIndent reactKey={'test-key'} indent={3} />);
		expect(wrapper.find('.row-indent-wrapper').length).to.equal(1);
		expect(wrapper.find('.row-indent-wrapper .row-indent').length).to.equal(3);
		expect(wrapper.find('.row-indent-wrapper .row-indent').at(2).key()).to.equal('test-key-indent-1');
		expect(wrapper.find('.row-indent-wrapper .row-indent').at(1).key()).to.equal('test-key-indent-2');
		expect(wrapper.find('.row-indent-wrapper .row-indent').at(0).key()).to.equal('test-key-indent-3');
	});
	it('renders nothing when indent is 0', () => {
		const wrapper = shallow(<RowIndent reactKey={'test-key'} indent={0} />);
		expect(wrapper.get(0)).to.be.null;
	});
	it('renders nothing when indent is less than 0', () => {
		const wrapper = shallow(<RowIndent reactKey={'test-key'} indent={0} />);
		expect(wrapper.get(0)).to.be.null;
	});
});
