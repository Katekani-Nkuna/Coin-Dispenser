import React, { Component } from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';


export class MainPage extends Component {


	constructor(props) {
		super(props);
		this.state = { min: 0 };
	}

	enter = e => {
		e.preventDefault();
		this.getMin()
	}

	async getMin() {

		let { values: { change, coins, min } } = this.props;
		console.log('change: ' + change);
		console.log('coins: ' + coins);


		let url = `http://localhost:8081/api/coindispenser/getcoin?change=${change}&coins=${coins}`
		let response;
		let body;

		try {
			response = await fetch(url, {
				method: 'GET',
				headers: {
					'Authorization': 'Basic ' + btoa('kk:pass')
				},
				mode: 'cors',
			});


			body = await response.json();
		} catch (error) {
			console.log(error);
		}

		if (response.ok) {
			this.setState({ min: `${body}` })
		}
		else {
			this.setState({ min: `${body}` })
		}
	}

	render() {

		const { values, handleChange } = this.props;
		const { values: { change, min } } = this.props;
		console.log(`min: ${this.state.min}`)


		return (
			<MuiThemeProvider>
				<React.Fragment>
					<AppBar title="Coin Dispenser" />
					<TextField
						hintText="Enter amount of change you want"
						floatingLabelText="Change Required i.e 10"
						onChange={handleChange('change')}
						defaultValue={values.change}
					/>

					<br />
					<TextField
						hintText="Enter the different coins available"
						floatingLabelText="Coins List ie. 1,2,5,10 "
						onChange={handleChange('coins')}
						defaultValue={values.coins}
					/>

					<br />
					<RaisedButton
						label="enter"
						primary={true}
						style={styles.button}
						onClick={this.enter}
					/>

					<h1>Min coins required: { this.state.min}</h1>

				</React.Fragment>
			</MuiThemeProvider>
		)
	}
}

const styles = {
	margin: 200
}
export default MainPage;