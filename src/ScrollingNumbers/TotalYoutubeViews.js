import React, { Component } from 'react';
import ScrollingNumber from './ScrollingNumber';

// total youtube views
// get a playlist with all the releases, then iterate through, summing up all the playcounts
// TODO: add defqwop and intercom playlists
// TODO: hide key in .env
const apiKey = "AIzaSyDvj4ODuKJtuqbBbEe0z8aYuKt5fTzGEhs";
const playlistId = "PLECJv5bXFj7eiNSoJpR3FdqA5DbaHVGBg";

class TotalYoutubeViews extends Component {

  constructor() {
    super();
    this.state = {  
      totalViewCount: 0
    }
  }

  componentDidMount() {
    const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&playlistId=${playlistId}&key=${apiKey}`
    fetch(url)
      .then(response => response.json())
      .then(playListData => {
        this.sumPlayCounts(playListData.items);
      })
      .catch(error => console.error(error));
  }

  sumPlayCounts = (playListItems) => {
    const viewCountPromises = playListItems.map((playListItem) => this.getViewCountForOneVideo(playListItem));

    Promise.all(viewCountPromises)
      .then((viewCounts) => {
        const totalViewCount = viewCounts.reduce((totalViewCount, currentVidViewCount) => totalViewCount + currentVidViewCount);
        this.setState({totalViewCount: totalViewCount});
      });
  }

  getViewCountForOneVideo = (playListItem) => {
    const videoId = playListItem.snippet.resourceId.videoId;
    const url = `https://www.googleapis.com/youtube/v3/videos?part=statistics&id=${videoId}&key=${apiKey}`

    return fetch(url)
      .then(response => response.json())
      .then(videoData => {
        return Number(videoData.items[0].statistics.viewCount);
      })
      .catch(error => console.error(error));
  }

  render() {
    return (
      <ScrollingNumber targetNumber={this.state.totalViewCount} infinite={false} />
    );
  }
}

export default TotalYoutubeViews;
