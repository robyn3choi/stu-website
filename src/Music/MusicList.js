import React, { Component } from 'react';
import Prismic from 'prismic-javascript';	
import MusicItem from './MusicItem';

class MusicList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      musicItems: null
    }
  }
  
  componentWillMount() {
    // TODO: hide link and change to stu's actual prismic
    const apiEndpoint = 'https://robyn-test.prismic.io/api/v2';
    Prismic.api(apiEndpoint)
    .then(api => {
      api.query(Prismic.Predicates.at('document.type', 'music_item'),
        {orderings : '[my.music_item.release_date desc]'})
      .then(response => {
        if (response) {
          console.log(response.results);
          this.setState({ musicItems: response.results });
        }
      });
    });
  }

  render() {
    if (this.state.musicItems) {
      const musicItemArray = this.state.musicItems.map((musicItem, i) => {
        const item = musicItem.data;
        return <MusicItem 
          key = {i}
          title={item.title[0].text}
          artist={item.artist[0].text}
          coverArt={item.cover_art.url}
          spotify={item.spotify_link ? item.spotify_link.url : undefined}
          youtube={item.youtube_link ? item.youtube_link.url : undefined}
          soundcloud={item.soundcloud_link ? item.soundcloud_link.url : undefined}
          apple={item.apple_link ? item.apple_link.url : undefined}
        />
      });
      return(
        <div id='music-list'>{musicItemArray}</div>
      );
    }
    return <h1>Loading...</h1>;
  }
}

export default MusicList;
