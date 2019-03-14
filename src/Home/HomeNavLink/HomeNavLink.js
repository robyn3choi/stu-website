import React, {Component} from 'react';
import './HomeNavLink.scss';
import { Link } from 'react-router-dom';

class HomeNavLink extends Component {
  
  constructor(props) {
    super(props);
    this.navLinkRef = React.createRef();
  }

  onNavMouseEnter() {
    const rect = this.navLinkRef.current.getBoundingClientRect();
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
      <div className={`home-nav__link-container home-nav__link-container_${this.props.isContactEmail ? 'contact-email' : this.props.text}`} 
        ref={this.navLinkRef}
        onMouseEnter={() => this.onNavMouseEnter()} 
        onMouseLeave={() => this.onNavMouseLeave()} >
  
        <Link to={this.props.path} className='home-nav__link'>
          {this.props.text}
        </Link>
  
      </div>
    );
  }
}


export default HomeNavLink;
