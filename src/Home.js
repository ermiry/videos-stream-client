import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

export default class Home extends Component {

  constructor () {
    super ();
    this.state = {
      videos: []
    };
  }

  async componentDidMount () {
    try {
      const response = await fetch ('http://stream.localhost.com/api/stream/videos');
      const data = await response.json();
      this.setState({ videos: [...data.videos] });
    } catch (error) {
      console.log (error);
    }
  }

  render() {
    return (
      <div className="App-header">
        <Header />
        <div className="container">
          <div className="row">
            {this.state.videos.map(video =>
              <div className="col-md-4" key={video._id.$oid}>
                <Link to={`/player/${video._id.$oid}`}>
                  <div className="card border-0">
                    <img src={`http://stream.localhost.com/api/stream/videos/${video._id.$oid}/image`} alt={video.name} />
                    <div className="card-body">
                      <p>{video.name}</p>
                      <p>{video.duration}</p>
                    </div>
                  </div>
                </Link>
              </div>
              )}
          </div>
        </div>
        <Footer />
      </div>
    )
  }
}
