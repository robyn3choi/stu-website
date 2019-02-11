import React from 'react';
import styles from './MusicItemIcon.module.css';

const MusicItemIcon = (props) => {
  return (
    <a href={props.url} target="_blank" rel="noopener noreferrer">
      <img className={`${styles.icon} ${props.className}`} alt={props.platform} src={require(`./${props.platform}-icon.png`)} />
    </a>
  )
}

export default MusicItemIcon;