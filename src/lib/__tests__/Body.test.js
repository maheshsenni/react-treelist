import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Body from '../Body';

import { getRowsWithChildren } from '../util/TreeUtils';

Enzyme.configure({ adapter: new Adapter() });

const testData = [{
    id: 0,
    name: 'Tim Robbins',
    position: 'CEO',
    parentId: null
}, {
    id: 1,
    name: 'Bob Gunton',
    position: 'Manager',
    parentId: 0
}];

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

describe('<Body />', () => {   
    it('allow selection of row if canSelect is true', () => {
        const handler = jest.fn();
        const wrapper = mount(<Body reactKey={'test-key'} data={testData} columns={columns} canSelect 
            idField="id" parentIdField="parentId" onHScroll={jest.fn()}
            metadata={getRowsWithChildren(testData, "id", "parentId")} updateHash=""
            height={100}
            itemHeight={10}
            onSelectRow={handler}
            />);
        wrapper.find('tr').forEach((node) => node.simulate('click'));
        expect(handler.mock.calls).toHaveLength(1);
        expect(wrapper.find('.row-selected')).toHaveLength(1);
    });

    it('does not allow selection of row if canSelect is false', () => {
        const handler = jest.fn();
        const wrapper = mount(<Body reactKey={'test-key'} data={testData} columns={columns} canSelect={false}
            idField="id" parentIdField="parentId" onHScroll={jest.fn()}
            metadata={getRowsWithChildren(testData, "id", "parentId")} updateHash=""
            height={100}
            itemHeight={10}
            onSelectRow={handler}
        />);
        wrapper.find('tr').forEach((node) => node.simulate('click'));
        expect(handler.mock.calls).toHaveLength(0);
        expect(wrapper.find('.row-selected')).toHaveLength(0);
    });

    it('allow deselection of row clicking on the selected row', () => {
        const handler = jest.fn();
        const wrapper = mount(<Body reactKey={'test-key'} data={testData} columns={columns} canSelect
            idField="id" parentIdField="parentId" onHScroll={jest.fn()}
            metadata={getRowsWithChildren(testData, "id", "parentId")} updateHash=""
            height={100}
            itemHeight={10}
            onSelectRow={handler}
        />);
        wrapper.find('tr').at(1).simulate('click');
        expect(handler.mock.calls).toHaveLength(1);
        expect(wrapper.find('.row-selected')).toHaveLength(1);

        wrapper.find('tr').at(1).simulate('click');
        expect(handler.mock.calls).toHaveLength(2);
        expect(wrapper.find('.row-selected')).toHaveLength(0);
    });

    it('dynamic rows css', () => {
        const className = function(data) {
            return data.position;
        };

        const wrapper = mount(<Body reactKey={'test-key'} data={testData} columns={columns}
            idField="id" parentIdField="parentId" onHScroll={jest.fn()}
            expandAll
            metadata={getRowsWithChildren(testData, "id", "parentId")} updateHash=""
            height={100}
            itemHeight={10}
            rowClass={className}
        />);
        expect(wrapper.find('.CEO')).toHaveLength(1);
        expect(wrapper.find('.Manager')).toHaveLength(1);
    });
});