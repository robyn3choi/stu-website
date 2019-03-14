import React from 'react';
import './MusicItemIcon.scss';

const MusicItemIcon = (props) => {
  return (
    <div className={`music-item__icon ${props.className}`}>
    <a href={props.url} target="_blank" rel="noopener noreferrer">
      <img className={`music-item__icon-image ${props.className}`} alt={props.platform} src={require(`./${props.platform}-icon.png`)} />
      <img className={`music-item__icon-image music-item__icon-image_highlighted ${props.className}`} alt={`${props.platform}-highlighted`} src={require(`./${props.platform}-icon-red.png`)} />
    </a>
    </div>
  )
}

export default MusicItemIcon;