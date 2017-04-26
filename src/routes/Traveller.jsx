import React from 'react';
import {Form} from "formsy-react";
import { DateRangePicker, SingleDatePicker, DayPickerRangeController } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';
import './Traveller.css';
import moment from 'moment';
import Autosuggest from "react-autosuggest";

const fakedata = [
	{
		name: 'icetown'
	},
	{
		name: 'firetown'
	},
	{
		name: 'lightown'
	}
]

function renderSuggestion(suggestion) {
	return(
		<div>
			<p> {suggestion.name} </p>
		</div>
	)
}

class TravellerPage extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			tripReturnDate : '',
			date : null,
			startDate: null,
			endDate: null,
			focusedInput: '',
			value: '',
			suggestions: []
		}
	}
	
	handleChangeTravelDate = (event, date) => {
		this.setState({
			tripReturnDate: date
		});
	};
	
	displayDateFormat = () => {
		return moment.localeData().longDateFormat('L');
	};
	
	onChange = (event, {newValue}) => {
		this.setState({
			value: newValue
		});
	};
	
	onSuggestionsFetchRequested = () => {
		this.setState({
			suggestions : fakedata.map((data) => { return {name: data.name} })
		});
	};
	
	onSuggestionsClearRequested = () => {
		this.setState({
			suggestions: []
		});
	};
	
	getSuggestionValue = () => {
	
	};
	
	submit = (data) => {
		console.log(data);
	}
	
	render() {
		const inputProps = {
			value : this.state.value,
			onChange: this.onChange,
			placeholder: 'Enter your city'
		};
		
		return (
			<div>
				<Form
					onSubmit={this.submit} >
					<div style={{"display": "flex",
								 "padding": "40px",
								 "justify-content": "center",
								 "align-items": "stretch"}}>
						
						<div style={{"width": "50%", "border": "1px solid #dbdbdb"}}>
							
							{/*<input type="text" style={{"width": "100%", "height": "100%"}}/>*/}
							<Autosuggest
								suggestions={this.state.suggestions}
								onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
								onSuggestionsClearRequested={this.onSuggestionsClearRequested}
								getSuggestionValue={this.getSuggestionValue}
								renderSuggestion={renderSuggestion}
								inputProps={inputProps}
							/>
							
						</div>
						
						<div>
							
							{/*<SingleDatePicker*/}
								{/*date={this.state.date}*/}
								{/*onDateChange={date => this.setState({ date })}*/}
								{/*focused={this.state.focused} // PropTypes.bool*/}
								{/*onFocusChange={({ focused }) => this.setState({ focused })} // PropTypes.func.isRequired*/}
								{/*placeholder="Return Date"*/}
								{/*displayFormat={this.displayDateFormat}*/}
							{/*/>*/}
							
							<DateRangePicker
								startDate={this.state.startDate}
								startDatePlaceholderText="Travel Date"
								endDate={this.state.endDate}
								endDatePlaceholderText="Return Date"
								onDatesChange={({ startDate, endDate }) => this.setState({ startDate, endDate })}
								focusedInput={this.state.focusedInput}
								onFocusChange={focusedInput => this.setState({ focusedInput })}
							/>
							
						</div>
						<button type="Submit"> Earn </button>
					</div>
				</Form>
			</div>
		)
	}
}

export default TravellerPage
