import React, {Component} from 'react';
import PropTypes from 'prop-types';

import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import TreeList from '../TreeList';

Enzyme.configure({adapter: new Adapter()});

const data = [{
    id: 0,
    name: 'Tim Robbins',
    position: 'CEO',
    parentId: null
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


class RefreshWrapper extends Component {
    static propTypes = {
        children: PropTypes.any,
        refresh: PropTypes.bool
    }

    state = {
        counter: 1
    };

    render() {
        const childrenWithProps = React.Children.map(this.props.children, child =>
            React.cloneElement(child, { refresh: this.props.refresh ? this.state.counter : 1})
        );
        return <div id="refresh" onClick={() => this.setState({counter: this.state.counter + 1})}>{childrenWithProps}</div>;
    }
}



describe('<TreeList />', () => {
	it('tree is refreshed whenever refresh value changes', () => {
        let counter = 0;
        const options = {
            minimumColWidth: 100,
            expandAll: true,
            rowClass: () => {
                return "counter" + counter++;
            }
        };
		const wrapper = mount(<RefreshWrapper refresh><TreeList data={data}
            columns={columns}
            options={options}
            id={'id'}
            parentId={'parentId'}
        /></RefreshWrapper>);
        expect(wrapper.find('tr.counter0')).toHaveLength(1);
        expect(wrapper.find('tr.counter1')).toHaveLength(0);
        wrapper.find('#refresh').simulate('click');
        expect(wrapper.find('tr.counter1')).toHaveLength(1);
        expect(wrapper.find('tr.counter0')).toHaveLength(0);
    });
    
    it('tree is not refreshed if refresh value does not change', () => {
        let counter = 0;
        const options = {
            minimumColWidth: 100,
            expandAll: true,
            rowClass: () => {
                return "counter" + counter++;
            }
        };
		const wrapper = mount(<RefreshWrapper refresh={false}><TreeList data={data}
            columns={columns}
            options={options}
            id={'id'}
            parentId={'parentId'}
        /></RefreshWrapper>);
        expect(wrapper.find('tr.counter0')).toHaveLength(1);
        expect(wrapper.find('tr.counter1')).toHaveLength(0);
        wrapper.find('#refresh').simulate('click');
        expect(wrapper.find('tr.counter0')).toHaveLength(1);
        expect(wrapper.find('tr.counter1')).toHaveLength(0);
	});
});
