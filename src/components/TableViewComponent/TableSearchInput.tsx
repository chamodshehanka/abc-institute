import { Input } from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import { useDebounce } from '../../hooks/useDebounce';

interface Props {
  onUpdate(value: string): void;
}

export function TableSearchInput({ onUpdate }: Props) {
  const [searchInput, setSearchInput] = useState('');
  const searchText = useDebounce(searchInput, 200);
  useEffect(() => {
    onUpdate(searchText.toLowerCase());
  }, [onUpdate, searchText]);
  return (
    <Input
      margin='none'
      className='search-input'
      disableUnderline
      placeholder='Enter search keyword'
      value={searchInput}
      onChange={(e) => setSearchInput(e.target.value)}
    />
  );
}
