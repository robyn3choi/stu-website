import React from 'react';

const AliasFilterButton = (props) => {
  return (
    <button className={props.isSelected ? 'selected' : null} 
      onClick={() => props.filterByAlias(props.alias)}>{props.alias}</button>
  );
}

export default AliasFilterButton;
