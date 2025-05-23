import React from 'react';
import { TextField, IconButton, MenuItem } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import countryOptions from '../../../data/countries.json';

const UserRow = ({ user, index, onFieldChange, onDelete, errors }) => {
  const handleChange = (field) => (e) => {
    onFieldChange(index, field, e.target.value);
  };

  const getError = (field) => {
    return errors?.invalidFields?.includes(field) || errors?.emptyFields?.includes(field);
  };

  return (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '1rem' }}>
      <TextField
        label="Name"
        value={user.name}
        onChange={handleChange('name')}
        error={getError('name')}
      />
      <TextField
        select
        label="Country"
        value={user.country}
        onChange={handleChange('country')}
        error={getError('country')}
        style={{ minWidth: 120 }}
      >
        {countryOptions.map((country) => (
          <MenuItem key={country} value={country}>
            {country}
          </MenuItem>
        ))}
      </TextField>
      <TextField
        label="Email"
        value={user.email}
        onChange={handleChange('email')}
        error={getError('email')}
      />
      <TextField
        label="Phone"
        value={user.phone}
        onChange={handleChange('phone')}
        error={getError('phone')}
      />
      <IconButton onClick={() => onDelete(index)} color="error">
        <DeleteIcon />
      </IconButton>
    </div>
  );
};

export default UserRow;
