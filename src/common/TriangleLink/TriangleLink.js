import React, { Component } from 'react';
import './TriangleLink.scss';
import { Link } from 'react-router-dom';

class TriangleLink extends Component {

  constructor(props) {
    super(props);
    this.linkRef = React.createRef();
  }

  onNavMouseEnter() {
    const rect = this.linkRef.current.getBoundingClientRect();
    const offset = (this.props.isContactEmail ? 3 : 4);
    this.props.setHoveredElementPos({ x: rect.left + (rect.width / offset), y: rect.top - (rect.height / 2) });
  }

  onNavMouseLeave() {
    this.props.setHoveredElementPos(null);
  }

  componentWillUnmount() {
    this.props.setHoveredElementPos(null);
  }

  render() {
    return (
      <div className={`triangle-link-container triangle-link-container_${this.props.isContactEmail ? 'contact-email' : this.props.text}`}
        ref={this.linkRef}
        onMouseEnter={() => this.onNavMouseEnter()}
        onMouseLeave={() => this.onNavMouseLeave()} >

        {this.props.isContactEmail ?
          <a href={`mailto:${this.props.text}`} className='triangle-link' target="_blank" rel="noopener noreferrer">
            {this.props.text}
          </a>
          :
          <Link to={this.props.path} className='triangle-link'>
            {this.props.text}
          </Link>
        }


      </div>
    );
  }
}


export default TriangleLink;
