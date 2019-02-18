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
              <h5>{this.props.alias}</h5>
            </div>
            <div className={styles.icons}>
            {this.state.icons}
            </div>
          </div>
      </div>
    );
  }
}

export default MusicItem;