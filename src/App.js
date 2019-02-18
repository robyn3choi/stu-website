import React, { Component } from 'react';
import './App.css';
import Prismic from 'prismic-javascript';	
import TotalYoutubeViews from './ScrollingNumbers/TotalYoutubeViews';
import TotalSpotifyFollowers from './ScrollingNumbers/TotalSpotifyFollowers';
import RamenBowlsConsumed from './ScrollingNumbers/RamenBowlsConsumed';
import MusicList from './Music/MusicList';
import About from './About/About.js'
import Contact from './Contact/Contact.js'

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      allMusicItems: [],
      aboutParagraphs: [],
      contactEmail: ''
    }
  }

  componentDidMount() {
    const apiEndpoint = 'https://stu-website.prismic.io/api/v2';
    Prismic.api(apiEndpoint)
      .then(api => {
        this.setMusicItems(api);
        this.setAboutParagraphs(api);
        this.setContactEmail(api);
      });
  }

  setMusicItems(api) {
    api.query(Prismic.Predicates.at('document.type', 'music_item'), {orderings : '[my.music_item.release_date desc]'})
      .then(response => {
        if (response) {
          this.setState({allMusicItems: response.results});
        }
      });
  }

  setAboutParagraphs(api) {
    api.query(Prismic.Predicates.at('document.type', 'about'))
    .then(response => {
      if (response) {
        const paragraphObjects = response.results[0].data.text;
        const strings = paragraphObjects.map(object => object.text);
        this.setState({aboutParagraphs: strings});
      }
    });
  }

  setContactEmail(api) {
    api.query(Prismic.Predicates.at('document.type', 'contact'))
      .then(response => {
        if (response) {
          this.setState({contactEmail: response.results[0].data.email});
        }
      });
  }

  render() {
    const {aboutParagraphs, allMusicItems, contactEmail} = this.state;
    return (
      <div>
        <About paragraphs={aboutParagraphs} />
        <TotalYoutubeViews />
        <TotalSpotifyFollowers />
        <RamenBowlsConsumed />
        <MusicList allMusicItems={allMusicItems}/>
        <Contact email={contactEmail} />
      </div>
    );
  }
}

export default App;
