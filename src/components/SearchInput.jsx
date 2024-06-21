import React, { useState } from 'react';
import { TextField, InputAdornment, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import useGetUsers from '../hooks/useGetUsers';
import useConversation from '../zustand/useConversation';

const SearchInput = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { users } = useGetUsers();
  const { setSelectedConversation } = useConversation();

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!searchTerm) return;

    const user = users.find((c) =>
      `${c.firstName} ${c.lastName}`.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (user) {
      setSelectedConversation(user);
      setSearchTerm('');
    }
  };

  return (
    <form className="flex items-center gap-2" onSubmit={handleSubmit}>
      <TextField
        type="text"
        placeholder="Search…"
        variant="outlined"
        fullWidth
        value={searchTerm}
        onChange={handleSearchChange}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton size="large" edge="end" aria-label="search" onClick={handleSubmit}>
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          ),
          sx: { borderRadius: '10px', marginBottom: '0.5rem' }
        }}
      />
    </form>
  );
};

export default SearchInput;
