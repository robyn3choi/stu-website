import React from 'react';
import AliasFilterButton from './AliasFilterButton';

const AliasFilterButtonList = (props) => {

  const aliases = props.musicItems.map(musicItem => musicItem.data.alias);
  const uniqueAliases = aliases.filter((alias, i, array) => array.indexOf(alias) === i);
  uniqueAliases.push('All');
  const buttons = uniqueAliases.map((alias, i) => 
    <AliasFilterButton 
      key={i}
      isSelected={props.selectedAlias === alias ? true : false} 
      alias={alias} 
      filterByAlias={props.filterByAlias} 
    />
  );

  return (
    <div>{buttons}</div>
  );
}

export default AliasFilterButtonList;
