import React, { Component } from 'react';
import { quadraticEase } from '../Easings'

const UPDATE_SPEED = 10;

class ScrollingNumber extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currentNumber: 0,
      currentTime: 0,
      intervalId: null
    }
  }

  componentDidMount() {
    if (this.props.infinite) {
      this.scrollDuration = 6000000;
      const id = setInterval(() => this.tick(), UPDATE_SPEED);
      this.setState({ intervalId: id });
    }
  }

  // TODO: change this to happen when this comes into view
  componentDidUpdate(prevProps) {
    if (this.props.targetNumber !== prevProps.targetNumber) {
      if (this.props.targetNumber < 30000) {
        this.scrollDuration = this.props.targetNumber;
      }
      else {
        this.scrollDuration = 30000;
      }
      const id = setInterval(() => this.tick(), UPDATE_SPEED);
      this.setState({ intervalId: id });
    }
  }

  tick() {
    const { currentNumber, intervalId, currentTime } = this.state;
    this.setState({ currentTime: currentTime + UPDATE_SPEED });
    if (currentNumber === this.props.targetNumber) {
      clearInterval(intervalId);
    }
    else {
      const easedNumber = quadraticEase(currentTime, 0, this.props.targetNumber, this.scrollDuration);
      this.setState({ currentNumber: Math.round(easedNumber) });
    }
  }

  componentWillUnmount() {
    clearInterval(this.state.intervalId);
  }

  render() {
    
    return (
      <div>
        { this.state.currentNumber }
      </div>
    );
  }
}

export default ScrollingNumber;
