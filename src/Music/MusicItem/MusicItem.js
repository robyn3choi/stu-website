import React, { Component } from 'react';
import MusicItemIcon from '../MusicItemIcon/MusicItemIcon'
import styles from './MusicItem.module.css';

const ICON_FADEIN_INTERVAL = 120;

class MusicItem extends Component {

  constructor(props) {
    super(props);
    this.state = {
      icons: [],
      intervalId: null,
      iconIndex: 0
    }
  }

  componentDidMount() {
    const icons = [];
    if (this.props.spotify) {
      icons.push(<MusicItemIcon className={null} url={this.props.spotify} platform='spotify' key='1' />);
    }
    if (this.props.youtube) {
      icons.push(<MusicItemIcon className={null} url={this.props.youtube} platform='youtube' key='2' />);
    }
    if (this.props.soundcloud) {
      icons.push(<MusicItemIcon className={null} url={this.props.soundcloud} platform='soundcloud' key='3' />);
    }
    if (this.props.apple) {
      icons.push(<MusicItemIcon className={null} url={this.props.apple} platform='apple' key='4' />);
    }
    this.setState({icons: icons});
  }

  onMouseEnter = () => {
    const id = setInterval(() => this.fadeInNextIcon(), ICON_FADEIN_INTERVAL);
    this.setState({ intervalId: id });
  }

  fadeInNextIcon() {
    const icons = this.state.icons;
    const iconWithShowClass = React.cloneElement(icons[this.state.iconIndex], {className: 'show'});
    icons[this.state.iconIndex] = iconWithShowClass;
    this.setState({icons: icons});

    const nextIconIndex = this.state.iconIndex + 1;

    if (nextIconIndex === icons.length) {
      console.log("stop");
      clearInterval(this.state.intervalId);
      this.setState({intervalId: null, iconIndex: 0});
    }
    else {
      this.setState({iconIndex: nextIconIndex});
    }
  }

  onMouseLeave = () => {
    clearInterval(this.state.intervalId);
    this.setState({intervalId: null, iconIndex: 0});
    const icons = this.state.icons.map((icon, i) => {
      return React.cloneElement(icon, {className: null});
    })
    this.setState({icons: icons});
  }

  render() {
    return (
      <div className={styles.music_item}>
          <img alt={this.props.title} src={this.props.coverArt} />
          <div className={styles.overlay} onMouseEnter={this.onMouseEnter} onMouseLeave={this.onMouseLeave}>
            <div className={styles.headings}>
              <h4>{this.props.title}</h4>
              <h5>{this.props.artist}</h5>
            </div>
            <div className={styles.icons}>
            {this.state.icons}
              {/* {this.props.spotify ? <MusicItemIcon url={this.props.spotify} platform='spotify' /> : null}
              {this.props.youtube ? <MusicItemIcon url={this.props.youtube} platform='youtube' /> : null}
              {this.props.soundcloud ? <MusicItemIcon url={this.props.soundcloud} platform='soundcloud' /> : null}
              {this.props.apple ? <MusicItemIcon url={this.props.apple} platform='apple' /> : null} */}

              {/* {this.props.spotify ? <a href={this.props.spotify} target="_blank" rel="noopener noreferrer"><img alt='spotify' src={require('../images/spotify-icon.png')} /></a> : null}
              {this.props.youtube ? <a href={this.props.youtube} target="_blank" rel="noopener noreferrer"><img alt='youtube' src={require('../images/spotify-icon.png')} /></a> : null}
              {this.props.soundcloud ? <a href={this.props.soundcloud} target="_blank" rel="noopener noreferrer"><img alt='soundcloud' src={require('../images/spotify-icon.png')} /></a> : null}
              {this.props.apple ? <a href={this.props.apple} target="_blank" rel="noopener noreferrer"><img alt='apple' src={require('../images/spotify-icon.png')} /></a> : null} */}
            </div>
          </div>
      </div>
    );
  }
}

export default MusicItem;