import React, { Component } from 'react';
import './App.css';

class Profile extends Component {
	constructor(props) {
		super(props);

		this.state = {
			artist: props.artist
		};
	}

	render() {
		return (
			<div className="profile">
				<img
					alt="Profile"
					className="profile-img"
					src={this.props.artist.images[0].url}
				/>
				<div className="profile-info">
					<div className="profile-name">{this.props.artist.name}</div>
					<div className="profile-followers">{this.props.artist.followers.total.toLocaleString()} followers</div>
					<div className="profile-genres">{this.props.artist.genres.map((g, k) => {
						return (<span key={k} className="item">{g}</span>);
					})}</div>
				</div>
			</div>
		)
	}
}

export default Profile;
