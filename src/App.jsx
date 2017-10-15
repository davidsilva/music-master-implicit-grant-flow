import React, { Component } from 'react';
import './App.css';
import { FormGroup, FormControl, InputGroup, Glyphicon } from 'react-bootstrap';
import Login from './Login';
import Profile from './Profile';
import Gallery from './Gallery';

class App extends Component {
	constructor(props) {
		super(props);
		
		let hash = new URLSearchParams(window.location.hash.substr(1));
		let token = null;
		if (hash.get('state') === 'my-tutorial') {
			token = hash.get('access_token');
		}

		this.state = {
			token: token,
			query: '',
			message: '',
			artist: null,
			tracks: [],
			searched: false
		}
	}

	search() {
		this.setState({searching: true});
		this.setState({message: `Searching for ${this.state.query}...`});
		const BASE_URL = 'https://api.spotify.com/v1/search';
		let FETCH_URL = `${BASE_URL}?type=artist&limit=1&q=${this.state.query}`;
		const ALBUM_URL = 'https://api.spotify.com/v1/artists/'

		var myOptions = {
			method: 'GET',
			mode: 'cors',
			headers: new Headers({
				'Authorization': `Bearer ${this.state.token}`,
				'Accept': 'application/json'
			})
		};

		fetch(FETCH_URL, myOptions)
			.then((response) => {
				return response.json();
			})
			.then((data) => {
				if (data.error) {
					if (data.error.status === 401) {
						this.setState({token: null});
						throw new Error('Session expired. Please log in again to keep playing');
					}
					else {
						throw new Error('Unknown error.');
					}
				}
				let artist = data.artists.items[0];
				this.setState({artist: artist, searched: true});
				return data;
			})
			.then((json) => {
				const artist = json.artists.items[0];
				this.setState({artist})

				FETCH_URL = `${ALBUM_URL}${artist.id}/top-tracks?country=US&`;
				fetch(FETCH_URL, myOptions)
					.then(response => response.json())
					.then(json => {
						const { tracks } = json;
						this.setState({tracks});
					})
			})
			.catch((err) => {
				this.setState({message: err.message});
			})
			.then(() => {
				this.setState({searching: false});
			})
			.then(() => {
				this.setState({message: FETCH_URL});
			});
	}

	renderProfile(state) {
		if (state.searching) {
			return (
				<div>Searching...</div>
			);
		}
		if (state.artist) {
			return (
				<div>
					<Profile artist={state.artist} />
					<Gallery tracks={state.tracks} />
				</div>
			);
		}
		if (state.searched && this.state.query) {
			return (
				<div>Sorry, no artist found by "{this.state.query}"</div>
			);
		}
	}

	render() {
		return (
			<div className="App">
				<div className="App-title">Music Master</div>
				{this.state.token === null ? (
					<Login />
				) : (
					<div>
						<FormGroup>
							<InputGroup>
								<FormControl
									type="text"
									placeholder="Search for an artist..."
									value={this.state.query}
									onChange={(event) => {this.setState({query: event.target.value})}}
									onKeyPress={(event) => {
										if (event.key === 'Enter') {
											this.search();
										}
									}}
								/>
								<InputGroup.Addon onClick={() => this.search()}>
									<Glyphicon glyph="search"></Glyphicon>
								</InputGroup.Addon>
							</InputGroup>
						</FormGroup>
						{this.renderProfile(this.state)}
					</div>
				)}
			</div>
		)
	}
}

export default App;