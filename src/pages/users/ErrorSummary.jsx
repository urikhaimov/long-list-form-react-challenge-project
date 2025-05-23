import React from 'react';
import { Box, Typography } from '@mui/material';

const ErrorSummary = ({ errorCount }) => {
  const { empty, invalid } = errorCount;

  if (empty === 0 && invalid === 0) return null;

  return (
    <Box mt={2} p={2} bgcolor="#ffe6e6" border="1px solid #f44336" borderRadius={4}>
      <Typography color="error">
        Errors: Empty Fields - {empty}, Invalid Fields - {invalid}
      </Typography>
    </Box>
  );
};

export default ErrorSummary;
