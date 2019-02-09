import React, { Component } from 'react';
import ScrollingNumber from './ScrollingNumber';

class TotalSpotifyFollowers extends Component {

  constructor() {
    super();
    this.state = {  
      totalFollowers: 0
    }
  }

  componentDidMount() {
    if (!process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'development') {
      return;
    }
    
    fetch('http://stu-website-api-env.4cca57prbj.us-west-2.elasticbeanstalk.com/spotify', {
      method: 'get',
      headers: {
        'Content-Type': 'application/json'
      },
    })
      .then(response => response.json())
      .then(json => this.setState({totalFollowers: json.totalFollowers}))
      .catch(error => console.error(error));
  }

  render() {
    return (
      <ScrollingNumber targetNumber={this.state.totalFollowers} infinite={false} />
    );
  }
}

export default TotalSpotifyFollowers;
