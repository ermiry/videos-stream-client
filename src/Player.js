import React, { Component } from 'react';

import Header from './Header';
import Footer from './Footer';

export default class Player extends Component {

	constructor (props) {
		super(props);
		this.state = {
			videoId: this.props.match.params.id,
			videoData: {}
		};
	}

	async componentDidMount () {
		try {
			const res = await fetch(
				`http://stream.localhost.com/api/stream/videos/${this.state.videoId}/info`
			);
			const data = await res.json();
			this.setState({ videoData: data });
		} catch (error) {
			console.log(error);
		}
	}

	render () {
		return (
			<div className="App-header">
				<Header />
				<video controls muted autoPlay crossOrigin="anonymous">
					<source src={`http://stream.localhost.com/api/stream/videos/${this.state.videoId}/data`} type="video/mp4"></source>
				</video>
				<h1>{ this.state.videoData.name }</h1>
				<Footer />
			</div>
		)
	}
}
