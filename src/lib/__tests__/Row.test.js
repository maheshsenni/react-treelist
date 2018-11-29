import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import {Row} from '../Row';

Enzyme.configure({ adapter: new Adapter() });


const testData = {
    id: 0,
    name: 'Tim Robbins',
    position: 'CEO',
    parentId: null
};

const columns = [{
    title: 'ID',
    field: 'id',
    type: 'number',
    width: 100
}, {
    title: 'Name',
    field: 'name',
    type: 'string'
}, {
    title: 'Position',
    field: 'position',
    type: 'string'
}];

describe('<Row />', () => {
    it('renders row with selected status', () => {
        const wrapper = shallow(<Row reactKey={'test-key'} data={testData} columns={columns} level={0} canExpand={false} selected/>);
        expect(wrapper.find('.row-selected')).toHaveLength(1);
    });

    it('renders row without selected status', () => {
        const wrapper = shallow(<Row reactKey={'test-key'} data={testData} columns={columns} level={0} canExpand={false} selected={false} />);
        expect(wrapper.find('.row-selected')).toHaveLength(0);
    });

    it('renders row with given className', () => {
        const className = 'myclass';
        const wrapper = shallow(<Row reactKey={'test-key'} data={testData} columns={columns} level={0} canExpand={false} className={className}/>);
        expect(wrapper.find('.myclass')).toHaveLength(1);
    });

    it('renders row with given dynamic className', () => {
        const className = function (data) {
            return data.position;
        };
        const wrapper = shallow(<Row reactKey={'test-key'} data={testData} columns={columns} level={0} canExpand={false} className={className} />);
        expect(wrapper.find('.CEO')).toHaveLength(1);
    });

    it('onSelect is called on row click', () => {
        const handler = jest.fn();
        const wrapper = shallow(<Row reactKey={'test-key'} data={testData} columns={columns} level={0} canExpand={false} onSelect={handler} />);
        wrapper.find('tr').simulate('click');
        expect(handler.mock.calls).toHaveLength(1);
    });
});