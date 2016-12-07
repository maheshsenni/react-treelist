import React, { Component, PropTypes } from 'react';

class VirtualScrollContainer extends Component {
	constructor(props) {
    super(props);
		this.onBodyScroll = this.onBodyScroll.bind(this);
	}

	onBodyScroll(event) {
		console.log('mouse wheel event');
		event.stopPropagation();
	}

	render() {
		const { items, itemHeight, containerHeight, containerTagName } = this.props;
		const ContainerTag = containerTagName;
		console.log('Items to show:', items.length);
		return (
			<ContainerTag onWheel={this.onBodyScroll}>
				{items}
			</ContainerTag>
		);
	}
}

VirtualScrollContainer.propTypes = {
	items: PropTypes.array.isRequired,
	itemHeight: PropTypes.number.isRequired,
	containerHeight: PropTypes.number.isRequired,
	containerTagName: PropTypes.string,
};

VirtualScrollContainer.defaultProps = {
	containerTagName: 'ul'
};

export default VirtualScrollContainer;
