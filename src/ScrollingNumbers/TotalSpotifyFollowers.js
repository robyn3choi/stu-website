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
    fetch('http://localhost:3000/spotify', {
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
