
import React, { useMemo, useState, useCallback } from 'react';
import { Typography, Button, Box, TextField } from '@mui/material';
import { useUsersContext } from '../../context/usersContext';
import AddButton from '../../components/AddButton';
import SortableVirtualList from '../../components/SortableVirtualList';
import { validateUser } from '../../utils/validators';

const countryOptions = ["Israel", "China", "Ukraine", "Canada", "Brazil", "Morocco", "France", "Japan"];

const UsersPage = () => {
  const { state, dispatch } = useUsersContext();
  const users = state.users || [];

  const [searchTerm, setSearchTerm] = useState('');

  const filteredUsers = useMemo(() => {
    const term = searchTerm.toLowerCase();
    return users.filter((user) =>
      ['name', 'email', 'phone', 'country'].some((field) =>
        user[field]?.toLowerCase().includes(term)
      )
    );
  }, [users, searchTerm]);

  const errorsMap = useMemo(() => {
    const map = {};
    filteredUsers.forEach((user) => {
      const userErrors = validateUser(user, countryOptions);
      if (Object.keys(userErrors).length > 0) {
        map[user.id] = userErrors;
      }
    });
    return map;
  }, [filteredUsers]);

  const handleFieldChange = useCallback((userId, field, value) => {
  dispatch({
    type: 'UPDATE_USER_BY_ID',
    payload: { id: userId, field, value }
  });
}, [dispatch]);

  const handleDelete = useCallback((userId) => {
    dispatch({ type: 'DELETE_USER_BY_ID', payload: userId });
  }, [dispatch]);

  const handleAdd = () => {
    dispatch({ type: 'ADD_USER' });
  };

  const handleReorder = useCallback((newUsers) => {
    dispatch({ type: 'SET_USERS', payload: newUsers });
  }, [dispatch]);
   if (!users || users.length === 0) return <div>Loading users...</div>;
  return (
    <Box p={2}>
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Typography variant="h5">Users ({filteredUsers.length})</Typography>
        <AddButton handleClick={handleAdd} />
      </Box>

      <TextField
        label="Search"
        variant="outlined"
        fullWidth
        margin="normal"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <Box mt={2}>
        <SortableVirtualList
          users={filteredUsers}
          onReorder={handleReorder}
          onFieldChange={handleFieldChange}
          onDelete={handleDelete}
          errorsMap={errorsMap}
          countryOptions={countryOptions}
        />
      </Box>

      <Box mt={2}>
        <Button
          variant="contained"
          onClick={() => localStorage.setItem('usersData', JSON.stringify(users))}
        >
          Save
        </Button>
      </Box>
    </Box>
  );
};

export default UsersPage;
