import React, {Component} from "react";
import {connect} from "react-redux";
import {addDojoItem} from "../../actions/dojo-actions";
import Modal from "react-modal";
import './dojo-modal.scss';

Modal.setAppElement("#root");

class ItemModal extends Component {
	state = {
		showModal: false,
		name: ""
	};

	handleOpenModal = () => {
		this.setState({showModal: true});
	};

	handleCloseModal = () => {
		this.setState({showModal: false});
	};

	onChange = e => {
		this.setState({
			[e.target.name]: e.target.value
		});
	};

	onSubmit = e => {
		e.preventDefault();

		const newItem = {
			name: this.state.name
		};

		this.props.addDojoItem(newItem);
		this.handleCloseModal();
	};

	render() {
		return (
			<div>
				<button className="button" onClick={this.handleOpenModal}>
					add member
				</button>
				<Modal
					className="dojo-modal"
					onRequestClose={this.handleCloseModal}
					shouldCloseOnOverlayClick={true}
					isOpen={this.state.showModal}
					toggle={this.toggle}
					addDojoItem={this.addDojoItem}
				>
					<form onSubmit={this.onSubmit}>
						<label htmlFor="item">name:</label> 
						<input
							autoComplete="off"
							type="text"
							name="name"
							id="item"
							onChange={this.onChange}
						/>
						<button>add member</button>
					</form>
				</Modal>
			</div>
		);
	}
}
const mapStateToProps = state => ({
	item: state.item
});
export default connect(
	mapStateToProps,
	{addDojoItem}
)(ItemModal);
