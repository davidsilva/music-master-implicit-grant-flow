import React, { Component } from 'react';
import './App.css';

class Gallery extends Component {
	constructor(props) {
		super(props);
		this.state = {
			playingUrl: '',
			audio: null,
			playing: false
		}
	}

	playAudio(previewUrl) {
		if (previewUrl) {
			let audio = new Audio(previewUrl);

			if (!this.state.playing) {
				this.setState({
					playing: true,
					playingUrl: previewUrl,
					audio
				});
				audio.play();
			}
			else {
				if (this.state.playingUrl === previewUrl) {
					this.state.audio.pause();
					this.setState({
						playing: false
					});
				}
				else {
					this.state.audio.pause();
					audio.play();
					this.setState({
						playing: true,
						playingUrl: previewUrl,
						audio
					});
				}
			}
		}
	}

	render() {
		console.log('gallery props', this.props);
		const { tracks } = this.props;
		return (
			<div>
				{tracks.map((track, k) => {
					const trackImg = track.album.images[0].url;
					return (
						<div
							key={k}
							className="track"
							onClick={() => this.playAudio(track.preview_url)}
						>
							<img
								src={trackImg}
								className="track-img"
								alt="track"
							/>
							<div className={track.preview_url ? "track-play" : "hidden"}>
								<div className="track-play-inner">
									{
										this.state.playingUrl === track.preview_url
											? <span>| |</span>
											: <span>&#9654;</span>
									}
								</div>
							</div>
							<p className="track-text">
								{track.name}
							</p>
						</div>
					)
				})}
			</div>
		)
	}
}

export default Gallery;
