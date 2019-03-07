import React, { Component } from 'react';
import './App.css';
import Prismic from 'prismic-javascript';
import { Route, withRouter, Switch } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import Home from './Home/Home';
import About from './About/About';
import Contact from './Contact/Contact';
import Music from './Music/Music';
import TriangleCanvas from './TriangleCanvas/TriangleCanvas';
import Nav from './common/Nav/Nav';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      musicItems: [],
      aboutParagraphs: [],
      contactEmail: '',
      hoveredElementPos: null
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

  setHoveredElementPos(pos) {
    this.setState({ hoveredElementPos: pos });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.location.pathname !== this.props.location.pathname) {
      this.setHoveredElementPos(null);
    }
  }


  render() {
    const { aboutParagraphs, musicItems, contactEmail } = this.state;
    if (aboutParagraphs.length > 0 && musicItems.length > 0 && contactEmail.length > 0) {

      return (
        <Route render={({ location }) => (
          <div className='app-container'>

            <TriangleCanvas position='back' hoveredElementPos={this.state.hoveredElementPos} />
            <TriangleCanvas position='front' hoveredElementPos={this.state.hoveredElementPos} />

            <TransitionGroup>
              <CSSTransition
              key={location.key}
                classNames="nav"
                timeout={1100}>
                <Nav route={this.props.location.pathname} />
              </CSSTransition>
            </TransitionGroup>

            <TransitionGroup className='transition-container'>
              <CSSTransition
                key={location.key}
                classNames="fade"
                timeout={100}>
                <Switch location={location}>
                  <Route exact path="/" render={(props) => <Home {...props} setHoveredElementPos={pos => this.setHoveredElementPos(pos)} />} />
                  <Route path="/about" render={(props) => <About {...props} paragraphs={aboutParagraphs} />} />
                  <Route path="/music" render={(props) => <Music {...props} musicItems={musicItems} />} />
                  <Route path="/contact" render={(props) => <Contact {...props} email={contactEmail} />} />
                </Switch>
              </CSSTransition>
            </TransitionGroup>
          </div>
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

export default withRouter(App);
