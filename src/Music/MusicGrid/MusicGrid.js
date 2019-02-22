import React, { Component } from 'react';
import './MusicGrid.scss';
import Shuffle from 'shufflejs';

class MusicGrid extends Component {
  
  constructor(props) {
    super(props);
    this.grid = React.createRef();
  }

  componentDidMount() {
    // The elements are in the DOM, initialize a shuffle instance.
    this.shuffle = new Shuffle(this.grid.current, {itemSelector: '.music-item'});
  }

  shouldComponentUpdate(nextProps) {
    // we shouldn't rerender after we have all the music items, because it prevent the shuffle filter from animating
    if (nextProps.musicItemComponents.length === this.props.musicItemComponents.length) {
      return false;
    }
    return true;
  }

  componentDidUpdate() {
    // Notify shuffle to dump the elements it's currently holding and consider
    // all elements matching the `itemSelector` as new.
    this.shuffle.resetItems();
  }

  filterByAlias = (alias) => {
    this.shuffle.filter(alias);
  }

  componentWillUnmount() {
    // Dispose of shuffle when it will be removed from the DOM.
    this.shuffle.destroy();
    this.shuffle = null;
  }

  render() {
    return(
      <div ref={this.grid} className="music-grid row my-shuffle">
        {this.props.musicItemComponents}
      </div>
    );
  }
}

export default MusicGrid;
