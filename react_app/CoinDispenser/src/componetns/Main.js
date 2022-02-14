import React, { Component } from 'react'
import MainPage from './MainPage'
import LoginPage from './LoginPage'

export class Main extends Component {

	state = {
		step: 1,
		username: '',
		password: '',
		change: '',
		coins: '',
		min: 0
	}

	//Proceed to the next next;
	nextStep = () => {
		const { step } = this.state;
		this.setState({
			step: step + 1
		});
	}

	//Go back to previous step;
	prevStep = () => {
		const { step } = this.state;
		this.setState({
			step: step - 1
		});
	}

	//Handle fields change
	handleChange = input => e => {
		this.setState({
			[input]: e.target.value
		});
	}



	render() {
		const { step } = this.state
		const { username, password, change, coins, min } = this.state
		const values = { username, password, change, coins, min }

		switch (step) {
			case 1:
				return (
					<LoginPage
						nextStep={this.nextStep}
						handleChange={this.handleChange}
						values={values}
					/>
				);

			case 2:
				return (
					< MainPage
						nextStep={this.nextStep}
						prevStep={this.prevStep}
						handleChange = { this.handleChange }
						values = { values }
					/>
				)
		}	
	}
}

export default Main;
