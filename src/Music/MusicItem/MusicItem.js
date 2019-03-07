import React, { Component } from 'react';
import MusicItemIcon from '../MusicItemIcon/MusicItemIcon'
import './MusicItem.scss';
import { CSSTransition } from 'react-transition-group';

const ICON_FADEIN_INTERVAL = 120;

class MusicItem extends Component {

  constructor(props) {
    super(props);
    this.state = {
      icons: [],
      intervalId: null,
      iconIndex: 0,
      isMounted: false
    }
  }

  componentDidMount() {
    this.setState({ isMounted: true });
    const icons = [];
    if (this.props.spotify) {
      icons.push(<MusicItemIcon className={null} url={this.props.spotify} platform='spotify' key='1' />);
    }
    if (this.props.soundcloud) {
      icons.push(<MusicItemIcon className={null} url={this.props.soundcloud} platform='soundcloud' key='3' />);
    }
    if (this.props.youtube) {
      icons.push(<MusicItemIcon className={null} url={this.props.youtube} platform='youtube' key='2' />);
    }
    this.setState({ icons: icons });
  }

  onMouseEnter = () => {
    const id = setInterval(() => this.fadeInNextIcon(), ICON_FADEIN_INTERVAL);
    this.setState({ intervalId: id });
  }

  fadeInNextIcon() {
    const icons = this.state.icons;
    const iconWithShowClass = React.cloneElement(icons[this.state.iconIndex], { className: 'music-item__icon_show' });
    icons[this.state.iconIndex] = iconWithShowClass;
    this.setState({ icons: icons });

    const nextIconIndex = this.state.iconIndex + 1;

    if (nextIconIndex === icons.length) {
      clearInterval(this.state.intervalId);
      this.setState({ intervalId: null, iconIndex: 0 });
    }
    else {
      this.setState({ iconIndex: nextIconIndex });
    }
  }

  onMouseLeave = () => {
    clearInterval(this.state.intervalId);
    this.setState({ intervalId: null, iconIndex: 0 });
    const icons = this.state.icons.map((icon, i) => {
      return React.cloneElement(icon, { className: null });
    })
    this.setState({ icons: icons });
  }

  render() {
    return (
      <div className='music-item' data-groups={`["${this.props.alias}"]`}>
        <CSSTransition in={this.state.isMounted} classNames="music-item" timeout={500+(this.props.index*120)}>
          <img alt={this.props.title} src={this.props.coverArt} />
        </CSSTransition>
        <div className='music-item__overlay' onMouseEnter={this.onMouseEnter} onMouseLeave={this.onMouseLeave}>

          <div className='music-item__content'>
            <h2 className='music-item__title'>{this.props.title}</h2>
            <h3 className='music-item__alias'>{this.props.alias}</h3>
            <div className='music-item__icon-container'>
              {this.state.icons}
            </div>
          </div>

        </div>
      </div>
    );
  }
}

export default MusicItem;