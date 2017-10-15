import React, { Component } from 'react';
import { Button } from 'react-bootstrap';

class Login extends Component {

	login() {
		const AUTH_URL_BASE = 'https://accounts.spotify.com/authorize';
		const QUERY = new URLSearchParams({
			client_id: '<YOUR CLIENT ID>',
			response_type: 'token',
			redirect_uri: 'http://localhost:3000/callback/',
			state: 'my-tutorial',
			scope: '',
			show_dialog: true
		});
		const AUTH_URL = `${AUTH_URL_BASE}?${QUERY.toString()}`;
		window.location.assign(AUTH_URL);
	}

	render() {
		return (
			<div>
				Sorry, you need to log in first.
				<Button
					onClick = {() => {this.login()}}
					type='button'>
					Sign in to Music Master
				</Button>
			</div>
		)
	}
}

export default Login;
