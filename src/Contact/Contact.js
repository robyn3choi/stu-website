import React, { Component } from 'react';
import Lottie from 'react-lottie';
import * as animData from './data.json';
import { CSSTransition } from 'react-transition-group';
import TriangleCanvas from './../common/TriangleCanvas/TriangleCanvas';
import TriangleLink from './../common/TriangleLink/TriangleLink';
import './Contact.scss';

class Contact extends Component {
  state = {
    isMounted: false,
    isTransitionDone: false,
    hoveredElementPos: null
  };

  componentDidMount() {
    this.setState({ isMounted: true });
    setTimeout(() => this.setState({ isTransitionDone: true }), 1000);
  }

  render() {
    const defaultOptions = {
      loop: false,
      autoplay: true,
      animationData: animData.default,
      rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice'
      }
    };
    return (
      <div className='contact non-home-section'>
        {this.props.isMobile ? null :
          <TriangleCanvas position='front' hoveredElementPos={this.state.hoveredElementPos} onlyHighlightTriangles={true} />
        }
        <CSSTransition in={this.state.isMounted} classNames="fade" timeout={500}>
          <div className='page-heading'>
            <Lottie options={defaultOptions} isStopped={!this.state.isTransitionDone} />
          </div>
        </CSSTransition>
        <CSSTransition in={this.state.isMounted} classNames="fade" timeout={580}>
          <p className='contact__description'>
            {this.props.description}
          </p>
        </CSSTransition>
        <CSSTransition in={this.state.isMounted} classNames="fade" timeout={660}>
          <TriangleLink text={this.props.email} path={`mailto:${this.props.email}`}
            setHoveredElementPos={pos => this.setState({ hoveredElementPos: pos })}
            isContactEmail={true} />
        </CSSTransition>
      </div>
    );
  }
}

export default Contact;
