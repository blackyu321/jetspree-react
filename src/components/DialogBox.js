import React from "react";
import Dialog from "material-ui/Dialog";
import FlatButton from "material-ui/FlatButton";

class DialogBox extends React.Component {
	render() {
		const actions = [
			<FlatButton
				label="OK"
				primary={true}
				onTouchTap={this.props.onRequestClose}
			/>
		]
		
		let displayMsg;
		if(this.props.errorMessage) {
			displayMsg = this.props.errorMessage.map((options, i) => {
				return options.message;
			});
		} else if(this.props.message) {
			displayMsg = this.props.message
		}
		
		return (
			<Dialog
				title={this.props.title}
				modal={true}
				actions={this.props.actions || actions}
				open={this.props.open}
				onRequestClose={this.props.onRequestClose}
			>
				{displayMsg}
			</Dialog>
		)
	}
}

DialogBox.defaultProps = {
	title: "Default Title",
	open: false
}

export default DialogBox;