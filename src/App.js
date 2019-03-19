import React, { Component } from 'react';
import './App.scss';
import Prismic from 'prismic-javascript';
import { Route, withRouter, Switch } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import Home from './Home/Home';
import About from './About/About';
import Contact from './Contact/Contact';
import Music from './Music/Music';
import TriangleCanvas from './common/TriangleCanvas/TriangleCanvas';
import Nav from './Nav/Nav';
import Loading from './Loading/Loading';
import { detect } from 'detect-browser';

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
      hasFirstPageLoaded: false,
      isMobile: false,
      browser: ''
    }
  }

  componentDidMount() {
    this.setState({ isMounted: true });
    const browser = detect();
    this.setState({ browser: browser.name });
    if (window.innerWidth < 768) {
      this.setState({ isMobile: true });
    }
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
      this.setState({ hasFirstPageLoaded: true });
    }
  }


  render() {
    const { aboutParagraphs, musicItems, contactDescription, contactEmail, hasFirstPageLoaded, isMobile, browser } = this.state;

    if (aboutParagraphs.length > 0 && musicItems.length > 0 && contactEmail.length > 0) {

      return (
        <Route render={({ location }) => (
          <div className={`app-container ${browser}`}>

            {isMobile ? null : (
              <div>
                <TriangleCanvas position='back' hoveredElementPos={this.state.hoveredElementPos}
                  onlyRedTriangles={false} shouldPlayIntro={!hasFirstPageLoaded && location.pathname === '/'}
                  route={location.pathname} browser={browser} />
                <TriangleCanvas position='front' hoveredElementPos={this.state.hoveredElementPos}
                  onlyRedTriangles={false} shouldPlayIntro={!hasFirstPageLoaded && location.pathname === '/'}
                  route={location.pathname} browser={browser} />
              </div>
            )}

            <TransitionGroup component={null}>

              <CSSTransition appear={true} in key={location.key + 'nav'} classNames="nav" timeout={1000}>
                <Nav route={this.props.location.pathname} />
              </CSSTransition>

              <CSSTransition
                key={location.key + 'page'}
                classNames="page"
                timeout={500}>
                <Switch location={location}>
                  <Route exact path="/" render={(props) => <Home {...props}
                    setHoveredElementPos={pos => this.setHoveredElementPos(pos)} hasFirstPageLoaded={hasFirstPageLoaded} browser={browser} />} />
                  <Route path="/about" render={(props) => <About {...props} paragraphs={aboutParagraphs} />} />
                  <Route path="/music" render={(props) => <Music {...props} musicItems={musicItems} />} />
                  <Route path="/contact" render={(props) => <Contact {...props} description={contactDescription} email={contactEmail} isMobile={isMobile} />} />
                  <Route path="*" render={(props) => <Home {...props}
                    setHoveredElementPos={pos => this.setHoveredElementPos(pos)} hasFirstPageLoaded={hasFirstPageLoaded} browser={browser} />} />
                </Switch>
              </CSSTransition>
            </TransitionGroup>
          </div>
        )} />
      )
    }
    else {
      return (
        <Loading />
      )
    }
  }
}

export default withRouter(App);
