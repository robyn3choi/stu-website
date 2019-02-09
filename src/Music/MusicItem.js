import React from 'react';

const MusicItem = (props) => {
  console.log(props.spotify);
  console.log(props.youtube);
  console.log(props.soundcloud);
  console.log(props.apple);
  return (
    <div className='music-item'>
      <img alt={props.title} src={props.coverArt} />
      <h4>{props.title}</h4>
      <h5>{props.artist}</h5>
      {props.spotify ? <img alt='spotify' src={require('../images/spotify-icon.png')} href={props.spotify} /> : null}
      {props.youtube ? <img alt='youtube' src={require('../images/spotify-icon.png')} href={props.youtube} /> : null}
      {props.soundcloud ? <img alt='soundcloud' src={require('../images/spotify-icon.png')} href={props.soundcloud} /> : null}
      {props.apple ? <img alt='apple' src={require('../images/spotify-icon.png')} href={props.apple} /> : null}
    </div>
  );
}

export default MusicItem;