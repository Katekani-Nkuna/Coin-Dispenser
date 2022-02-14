import React, { Component } from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';


export class FormUserDetails extends Component {
	
	register = e => {
		e.preventDefault();
		this.sendRegisterRequest()
	}

	login = e => {
		e.preventDefault();
		this.sendLoginRequest();
	}

	async sendLoginRequest() {

		const { values: { username, password } } = this.props;
		console.log('username: ' + username);
		console.log('username: ' + password);

		let url = 'http://localhost:8081/api/coindispenser/login'
		let response;
		let body;

		try {
			response = await fetch(url, {
				method: 'GET',
				headers: {
					'Authorization': 'Basic ' + btoa(`${username}:${password}`)
				},
				mode: 'cors',
			});


			body = await response.json();
		} catch (error) {
			console.log(error);
		}

		console.log(response)
		console.log(response.ok)
		console.log(body);

		if (response.ok) {
			//go to the main page
			this.props.nextStep();
		}
	}

	async sendRegisterRequest() {

		const { values: { username, password } } = this.props;
		console.log('username: ' + username);
		console.log('username: ' + password);

		console.log(`${username}:${password}`);



		let url = 'http://localhost:8081/api/coindispenser/getcoin?param1=5&param2=4'
		url = 'http://localhost:8081/api/coindispenser/createuser'
		let response;
		let body;

		try {
			response = await fetch(url, {
				method: 'POST',
				headers: {
					'Authorization': 'Basic ' + btoa('kk:pass'),
					'Accept': 'application/json',
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ username: `${username}`, password: `${password}`}),
				mode: 'cors',
			});


			body = await response.json();
		} catch (error) {
			console.log(error);
		}

		console.log(response)
		console.log(response.ok)
		console.log(body);

		if (response.ok) {
			//go to the main page
			//this.props.nextStep();
		}
	}

	render() {

		const { values, handleChange } = this.props;

		return(
			<MuiThemeProvider>
				<React.Fragment>
					<AppBar title="Login/Register" />
					<TextField
						hintText="Enter a username"
						floatingLabelText="Username"
						onChange={handleChange('username')}
						defaultValue={values.username}
					/>

					<br />
					<TextField
						hintText="Enter Password"
						floatingLabelText="Password"
						onChange={handleChange('password')}
						defaultValue={values.password}
					/>

					<br />
					<RaisedButton
						label="register"
						primary={true}
						style={styles.button}
						onClick={this.register}
					/>

					<RaisedButton
						label="login"
						primary={false}
						style={styles.button}
						onClick={this.login}
					/>

				</React.Fragment>
			</MuiThemeProvider>
		)
	}
}

const styles = {
	margin:100
}
export default FormUserDetails;