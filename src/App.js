import React, { Component } from 'react';
import './App.css';
import Prismic from 'prismic-javascript';	
// import TotalYoutubeViews from './ScrollingNumbers/TotalYoutubeViews';
// import TotalSpotifyFollowers from './ScrollingNumbers/TotalSpotifyFollowers';
// import RamenBowlsConsumed from './ScrollingNumbers/RamenBowlsConsumed';
import { Route, Link, Switch, BrowserRouter as Router } from 'react-router-dom'
import Home from './Home/Home';
import MusicList from './Music/MusicList';
import About from './About/About'
import Contact from './Contact/Contact'

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
    console.log("api call");
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
    if (aboutParagraphs.length > 0 && allMusicItems.length > 0 && contactEmail.length > 0) {
      return (
        <Router>
          <div>
          
            <div>
              <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/about">About</Link></li>
                <li><Link to="/music">Music</Link></li>
                <li><Link to="/contact">Contact</Link></li>
              </ul>
            </div>

            <Switch>
              <Route exact path='/' component={Home} />
              <Route path='/about' render={props => <About {...props} paragraphs={aboutParagraphs} />} />
              <Route path='/music' render={props => <MusicList {...props} allMusicItems={allMusicItems} />} />
              <Route path='/contact' render={props => <Contact {...props} email={contactEmail} />} />
            </Switch>

          </div>
        </Router>
      );
    }
    else {
      return (
        <div>loading</div>
      )
    }
  }
}

export default App;
