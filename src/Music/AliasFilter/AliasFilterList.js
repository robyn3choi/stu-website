import React from 'react';
import AliasFilter from './AliasFilter';

const AliasFilterList = (props) => {

  const aliases = props.musicItems.map(musicItem => musicItem.data.alias);
  const uniqueAliases = aliases.filter((alias, i, array) => array.indexOf(alias) === i);
  uniqueAliases.unshift(null);
  const buttons = uniqueAliases.map((alias, i) => 
    <AliasFilter 
      key={i}
      isSelected={props.selectedAlias === alias ? true : false} 
      alias={alias} 
      filterByAlias={props.filterByAlias} 
    />
  );

  return (
    <div className='alias-filter-list'>{buttons}</div>
  );
}

export default AliasFilterList;
