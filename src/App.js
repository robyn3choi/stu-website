import React, { Component } from 'react';
import './App.css';
import Prismic from 'prismic-javascript';
import { Route, Link, Switch, BrowserRouter as Router } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import Home from './Home/Home';
import About from './About/About';
import Contact from './Contact/Contact';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      allMusicItems: [],
      aboutParagraphs: [],
      contactEmail: ''
    }

    this.musicSection = React.createRef();
  }

  componentDidMount() {
    const apiEndpoint = 'https://stu-website.prismic.io/api/v2';
    // Prismic.api(apiEndpoint)
    //   .then(api => {
    //     this.setMusicItems(api);
    //     this.setAboutParagraphs(api);
    //     this.setContactEmail(api);
    //   });
  }

  setMusicItems(api) {
    api.query(Prismic.Predicates.at('document.type', 'music_item'), { orderings: '[my.music_item.release_date desc]' })
      .then(response => {
        if (response) {
          this.setState({ allMusicItems: response.results });
        }
      });
  }

  setAboutParagraphs(api) {
    api.query(Prismic.Predicates.at('document.type', 'about'))
      .then(response => {
        if (response) {
          const paragraphObjects = response.results[0].data.text;
          const strings = paragraphObjects.map(object => object.text);
          this.setState({ aboutParagraphs: strings });
        }
      });
  }

  setContactEmail(api) {
    api.query(Prismic.Predicates.at('document.type', 'contact'))
      .then(response => {
        if (response) {
          this.setState({ contactEmail: response.results[0].data.email });
        }
      });
  }

  render() {
    const { aboutParagraphs, allMusicItems, contactEmail } = this.state;
    if (aboutParagraphs.length > 0 && allMusicItems.length > 0 && contactEmail.length > 0) {
      return (
        <Router>
          <div className='app-container'>

            {/* <div className='nav'>
              <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/about">About</Link></li>
                <li><HashLink smooth to="/#music">Music</HashLink></li>
                <li><Link to="/contact">Contact</Link></li>
              </ul>
            </div>

            <TransitionGroup component={null}>
              <Route render={location => {
                return (
                  <Switch>
                    <Route exact path='/' render={props => <Home {...props} allMusicItems={allMusicItems} scrollRef={this.musicSection} />} />
                    <Route path='/about' render={props => <About {...props} paragraphs={aboutParagraphs} />} />
                    <Route path='/contact' render={props => <Contact {...props} email={contactEmail} />} />
                  </Switch>
                )
              }}
              />
            </TransitionGroup> */}

          </div>
        </Router>
      );
    }
    else {
      return (
        <Home />
      )
    }
  }
}

export default App;
