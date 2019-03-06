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
    this.props.setHoveredElementPos({ x: rect.x + (rect.width / 4), y: rect.y - (rect.width / 8) });
  }

  onNavMouseLeave(link) {
    this.props.setHoveredElementPos(null);
  }

  render() {
    return (
      <div className={`home-nav__link-container home-nav__link-container_${this.props.name}`} 
        ref={this.navLinkRef}
        onMouseEnter={() => this.onNavMouseEnter(this.props.name)} 
        onMouseLeave={() => this.onNavMouseLeave(this.props.name)} >
  
        <Link to={`/${this.props.name}`} className='home-nav__link'>
          {this.props.name}
        </Link>
  
      </div>
    );
  }
}


export default HomeNavLink;
