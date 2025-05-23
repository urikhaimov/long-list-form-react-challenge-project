
import React, { useMemo, useState, useCallback } from 'react';
import { Typography, Button, Box, TextField } from '@mui/material';
import { useUsersContext } from '../../context/usersContext';
import AddButton from '../../components/AddButton';
import SortableVirtualList from '../../components/SortableVirtualList';
import { validateUser } from '../../utils/validators';

const countryOptions = ["Israel", "China", "Ukraine", "Canada", "Brazil", "Morocco", "France", "Japan"];

const UsersPage = () => {
  const { users = [], dispatch } = useUsersContext();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredUsers = useMemo(() => {
    const term = searchTerm.toLowerCase();
    return users.filter((user) =>
      ['name', 'email', 'phone', 'country'].some((field) =>
        user[field]?.toLowerCase().includes(term)
      )
    );
  }, [users, searchTerm]);

  const errors = useMemo(() => {
    const map = {};
    filteredUsers.forEach((user) => {
      const userErrors = validateUser(user, countryOptions) || {};
      if (Object.keys(userErrors).length > 0) {
        map[user.id] = userErrors;
      }
    });
    return map;
  }, [filteredUsers]);

  const errorSummary = useMemo(() => {
    let empty = 0;
    let invalid = 0;
    Object.values(errors).forEach((userErrors) => {
      Object.values(userErrors).forEach((error) => {
        if (error === 'empty' || error === 'Required') empty++;
        else invalid++;
      });
    });
    return { empty, invalid };
  }, [errors]);

  const hasErrors = errorSummary.empty > 0 || errorSummary.invalid > 0;

  const handleAdd = () => {
    dispatch({ type: 'ADD_USER' });
  };

  const handleSave = () => {
    if (hasErrors) {
      const firstErrorId = Object.keys(errors)[0];
      const rowEl = document.querySelector(`[data-row="${firstErrorId}"]`);
      if (rowEl) {
        rowEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }

    localStorage.setItem('users', JSON.stringify(users));
  };

  const handleFieldChange = useCallback((index, field, value) => {
    const updatedUser = { ...users[index], [field]: value };
    dispatch({ type: 'UPDATE_USER', index, payload: updatedUser });
  }, [users, dispatch]);

  const handleDelete = useCallback((index) => {
    dispatch({ type: 'DELETE_USER', index });
  }, [dispatch]);

  const handleReorder = useCallback((newUsers) => {
    dispatch({ type: 'SET_USERS', payload: newUsers });
  }, [dispatch]);

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
          errorsMap={errors}
          countryOptions={countryOptions}
        />
      </Box>

      {(errorSummary.empty > 0 || errorSummary.invalid > 0) && (
        <Typography color="error" mt={2}>
          Errors: Empty Fields - {errorSummary.empty}, Invalid Fields - {errorSummary.invalid}
        </Typography>
      )}

      <Box mt={2}>
        <Button
          variant="contained"
          onClick={handleSave}
          disabled={hasErrors}
        >
          Save
        </Button>
      </Box>
    </Box>
  );
};

export default UsersPage;
