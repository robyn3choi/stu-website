import React, { Component } from 'react';
import './MusicGrid.scss';
import Shuffle from 'shufflejs';

class MusicGrid extends Component {

  constructor(props) {
    super(props);
    this.state = {
      leftOffset: "0px"
    }
    this.grid = React.createRef();
  }

  componentDidMount() {
    // The elements are in the DOM, initialize a shuffle instance.
    this.shuffle = new Shuffle(this.grid.current, { itemSelector: '.music-item' });
    this.centerGrid();
  }

  centerGrid() {
    console.log(this.shuffle.cols)
    const gridWidth = 256 * this.shuffle.cols;
    console.log(gridWidth)
    const spaceNeededOnEachSide = (window.innerWidth - gridWidth) / 2;
    console.log(spaceNeededOnEachSide)
    const currentMarginLeft = 0.1 * window.innerWidth;
    console.log(currentMarginLeft)
    const remainingSpaceNeededOnLeft = spaceNeededOnEachSide - currentMarginLeft;
    console.log(remainingSpaceNeededOnLeft)
    this.setState({ leftOffset: remainingSpaceNeededOnLeft.toString() + 'px' });
    console.log(remainingSpaceNeededOnLeft.toString())
    console.log(this.state.leftOffset)
  }

  shouldComponentUpdate(nextProps, nextState) {
    // we shouldn't rerender after we have all the music items, because it prevent the shuffle filter from animating
    if (nextProps.musicItemComponents.length === this.props.musicItemComponents.length
      && this.state.leftOffset === nextState.leftOffset) {
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
    return (
      <div style={{ marginLeft: `${this.state.leftOffset}` }}>
        <div ref={this.grid} className="music-grid row my-shuffle">
          {this.props.musicItemComponents}
        </div>
      </div>
    );
  }
}

export default MusicGrid;
