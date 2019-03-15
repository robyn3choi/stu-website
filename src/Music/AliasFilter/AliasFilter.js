import React, {Component} from 'react';
import './AliasFilter.scss';
import {CSSTransition} from 'react-transition-group';

class AliasFilterButton extends Component {
  state = {isMounted: false};

  componentDidMount() {
    this.setState({isMounted: true});
  }

  render() {
    return (
      <CSSTransition in={this.state.isMounted} classNames="alias-filter" timeout={1500 + (this.props.index*100)}>
      <button className={`alias-filter ${this.props.isSelected ? 'alias-filter__selected' : null}`} 
        onClick={() => this.props.filterByAlias(this.props.alias)}>
        {this.props.alias ? this.props.alias : 'All'}
      </button>
      </CSSTransition>
    );
  }
}

export default AliasFilterButton;
