import React, { Component } from 'react';
import './App.scss';
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
      isMounted: false,
      fadeInBackground: false,
      musicItems: [],
      aboutParagraphs: [],
      contactDescription: '',
      contactEmail: '',
      hoveredElementPos: null,
      hasVisitedHome: false
    }

    this.musicSection = React.createRef();
  }

  componentDidMount() {
    this.setState({isMounted: true});
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
          this.setState({ contactDescription: response.results[0].data.description[0].text })
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

  visitHome() {
    this.setState({hasVisitedHome: true});
  }

  render() {
    const { aboutParagraphs, musicItems, contactDescription, contactEmail, hasVisitedHome, isMounted } = this.state;

    if (aboutParagraphs.length > 0 && musicItems.length > 0 && contactEmail.length > 0) {

      return (
        <Route render={({ location }) => (
          // <CSSTransition key={location.key} appear={true} in={isMounted && location.pathname === '/' && !hasVisitedHome} classNames='app' timeout={2000}>
          <div className='app-container'>

            <TriangleCanvas position='back' hoveredElementPos={this.state.hoveredElementPos} onlyRedTriangles={false} />
            <TriangleCanvas position='front' hoveredElementPos={this.state.hoveredElementPos} onlyRedTriangles={false} />

              <CSSTransition appear={true} in key={location.key} classNames="nav" timeout={3000}>
                <Nav route={this.props.location.pathname} />
              </CSSTransition>

            <TransitionGroup className='transition-container'>
              <CSSTransition
                key={location.key}
                classNames="page"
                timeout={500}>
                <Switch location={location}>
                  <Route exact path="/" render={(props) => <Home {...props} 
                    setHoveredElementPos={pos => this.setHoveredElementPos(pos)} visitHome={() => this.visitHome()} />} />
                  <Route path="/about" render={(props) => <About {...props} paragraphs={aboutParagraphs} />} />
                  <Route path="/music" render={(props) => <Music {...props} musicItems={musicItems} />} />
                  <Route path="/contact" render={(props) => <Contact {...props} description={contactDescription} email={contactEmail} />} />
                </Switch>
              </CSSTransition>
            </TransitionGroup>
          </div>
          // </CSSTransition>
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
