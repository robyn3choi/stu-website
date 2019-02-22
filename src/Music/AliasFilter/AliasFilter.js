import React from 'react';
import './AliasFilter.scss';

const AliasFilterButton = (props) => {
  return (
    <button 
      className={`alias-filter ${props.isSelected ? 'alias-filter__selected' : null}`} 
      onClick={() => props.filterByAlias(props.alias)}>
      {props.alias ? props.alias : 'All'}
    </button>
  );
}

export default AliasFilterButton;
