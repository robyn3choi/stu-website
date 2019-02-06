import React, { Component } from 'react';
import Prismic from 'prismic-javascript';	
import {RichText} from 'prismic-reactjs';

class SongList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      songs: null
    }
  }
  
  componentWillMount() {
    // TODO: hide link
    const apiEndpoint = 'https://robyn-test.prismic.io/api/v2';
    Prismic.api(apiEndpoint).then(api => {
      api.query(Prismic.Predicates.at('document.type', 'song')).then(response => {
        if (response) {
          this.setState({ songs: response.results });
          console.log(this.state.songs);
        }
      });
    });
  }

  render() {
    if (this.state.songs) {
      const firstSong = this.state.songs[0];
      return (
        <div>
          <h1>{RichText.asText(firstSong.data.title)}</h1>
          <img alt="cover" src={firstSong.data.cover_art.url} />
        </div>
      );
    }
    return <h1>Loading...</h1>;
  }
}

export default SongList;
