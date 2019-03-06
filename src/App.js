import React, { Component } from 'react';
import './App.css';
import Prismic from 'prismic-javascript';
import { Route, Link, Switch, BrowserRouter as Router } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import Home from './Home/Home';
import About from './About/About';
import Contact from './Contact/Contact';
import Music from './Music/Music';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      musicItems: [],
      aboutParagraphs: [],
      contactEmail: '',
      route: 'home'
    }

    this.musicSection = React.createRef();
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
    api.query(Prismic.Predicates.at('document.type', 'music_item'), { orderings: '[my.music_item.release_date desc]' })
      .then(response => {
        if (response) {
          this.setState({ musicItems: response.results });
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

  setRoute(route) {
    this.setState({ route: route });
  }

  render() {
    const { aboutParagraphs, musicItems, contactEmail } = this.state;
    if (aboutParagraphs.length > 0 && musicItems.length > 0 && contactEmail.length > 0) {

      // switch (route) {
      //   case 'about':
      //     return <About paragraphs={aboutParagraphs} />
      //   case 'music':
      //     return <Music musicItems={musicItems} />
      //   case 'contact':
      //     return <Contact email={contactEmail} />
      //   default:
      //     return <Home setRoute={newRoute => this.setRoute(newRoute)}/>
      // }
              /* <div className='app-container'>
          <Route exact path="/" render={(props) => <Home {...props} />} />
          <Route path="/about" render={(props) => <About {...props} paragraphs={aboutParagraphs} />} />
          <Route path="/music" render={(props) => <Music {...props} musicItems={musicItems} />} />
          <Route path="/contact" render={(props) => <Contact {...props} email={contactEmail} />} />
        </div> */
      return (

        <Route render={({ location }) => (
          <TransitionGroup className="app-container">
            <CSSTransition
              key={location.key}
              classNames="fade"
              timeout={1000}>
              <Switch location={location}>
                <Route exact path="/" render={(props) => <Home {...props} />} />
                <Route path="/about" render={(props) => <About {...props} paragraphs={aboutParagraphs} />} />
                <Route path="/music" render={(props) => <Music {...props} musicItems={musicItems} />} />
                <Route path="/contact" render={(props) => <Contact {...props} email={contactEmail} />} />
              </Switch>
            </CSSTransition>
          </TransitionGroup>
        )} />
      )


    }
    else {
      return (
        <div>loading...</div>
      )
    }
  }
}

export default App;
