import React, { Component } from 'react';
import MusicItem from './MusicItem/MusicItem';
import AliasFilterList from './AliasFilter/AliasFilterList';
import MusicGrid from './MusicGrid/MusicGrid';
import SectionHeading from '../common/SectionHeading/SectionHeading';
import Nav from '../common/Nav/Nav';
import './Music.scss';
import { CSSTransition } from 'react-transition-group';

class Music extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      selectedAlias: null,
      isMounted: false
    };
    this.musicGrid = React.createRef();
  }

  componentDidMount() {
    this.setState({isMounted: true});
  }

  createMusicList = (musicItems) => {
    const musicItemArray = musicItems.map((musicItem, i) => {
      const item = musicItem.data;
      return <MusicItem 
        key = {"music-item-" + i}
        index = {i}
        title={item.title}
        alias={item.alias}
        coverArt={item.cover_art.url}
        spotify={item.spotify_link ? item.spotify_link.url : undefined}
        youtube={item.youtube_link ? item.youtube_link.url : undefined}
        soundcloud={item.soundcloud_link ? item.soundcloud_link.url : undefined}
      />
    });
    return musicItemArray;
  }

  filterByAlias = (alias) => {
    this.setState({selectedAlias: alias});
    this.musicGrid.current.filterByAlias(alias);
  }

  render() {
    if (this.props.musicItems.length > 0) {
      const musicItemComponents = this.createMusicList(this.props.musicItems);
      return(
        <div className='music non-home-section' ref={this.props.scrollRef}>
          {/* <Nav leftLink='About' rightLink='Contact'/> */}
          <CSSTransition in={this.state.isMounted} classNames="section-heading" timeout={500}>
            <SectionHeading text='Music' />
          </CSSTransition>
          <AliasFilterList 
            musicItems={this.props.musicItems} 
            filterByAlias={this.filterByAlias}
            selectedAlias={this.state.selectedAlias}
          />
          <MusicGrid musicItemComponents={musicItemComponents} ref={this.musicGrid}/>
        </div>
      );
    }
    
    return <h1>Loading...</h1>;
  }
}

export default Music;
