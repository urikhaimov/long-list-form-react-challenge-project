import React from 'react';
import { TextField, IconButton, MenuItem, useState } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import countryOptions from '../../../data/countries.json';
import { useDebouncedCallback } from '../../../hooks/useDebouncedCallback';


const UserRow = ({ user, onChange, onDelete, errors, countryOptions }) => {
 console.log('Rendering row:', user.id);
 
   const [local, setLocal] = useState({
     name: user.name,
     email: user.email,
     phone: user.phone,
     country: user.country
   });
 
   useEffect(() => {
     setLocal({
       name: user.name,
       email: user.email,
       phone: user.phone,
       country: user.country
     });
   }, [user]);
 
   const debouncedChange = useDebouncedCallback(onChange, 300);
 
   const handleChange = (field) => (e) => {
     let value = e.target.value;
     if (field === 'phone' && value && !value.startsWith('+')) {
       value = '+' + value.replace(/^\+*/, '');
     }
 
     setLocal(prev => ({ ...prev, [field]: value }));
     debouncedChange(user.id, field, value);
   };
 
   const rowHasError = errors && Object.keys(errors).length > 0;
 
 

  return (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '1rem' }}>
      <TextField
        label="Name"
        value={user.name}
        onChange={(e) => onChange(user.id, 'name', e.target.value)}
       error={Boolean(errors?.name)}
        helperText={errors?.name} 
        fullWidth
      />
      <TextField
        select
        label="Country"
        value={user.country}
         onChange={(e) => onChange(user.id, 'country', e.target.value)}
         error={Boolean(errors?.country)}
        helperText={errors?.country} 
        fullWidth
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
         onChange={(e) => onChange(user.id, 'email', e.target.value)}
         error={Boolean(errors?.email)}
        helperText={errors?.email} 
        fullWidth
      />
      <TextField
        label="Phone"
        value={user.phone}
         onChange={(e) => onChange(user.id, 'phone', e.target.value)}
         error={Boolean(errors?.phone)}
        helperText={errors?.phone} 
        fullWidth
      />
      <IconButton onClick={() => onDelete(index)} color="error">
        <DeleteIcon />
      </IconButton>
    </div>
  );
};

export default React.memo(UserRow, (prev, next) => {
  return (
    prev.user.id === next.user.id &&
    prev.user.name === next.user.name &&
    prev.user.email === next.user.email &&
    prev.user.phone === next.user.phone &&
    prev.user.country === next.user.country &&
    JSON.stringify(prev.errors) === JSON.stringify(next.errors)
  );
});
