import React from 'react';
import './MusicItemIcon.css';

const MusicItemIcon = (props) => {
  return (
    <a href={props.url} target="_blank" rel="noopener noreferrer">
      <img className={`music-item__icon ${props.className}`} alt={props.platform} src={require(`./${props.platform}-icon.png`)} />
    </a>
  )
}

export default MusicItemIcon;