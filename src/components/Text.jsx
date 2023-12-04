import React from 'react';
import TextField from '@mui/material/TextField';

const TextArea = ({ text, onChange, className, placeholder, rows, value }) => {
  return (
    <TextField
      label={text}
      variant="outlined"
      fullWidth
      multiline
      rows={rows}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={className}
    />
  );
};

export default TextArea;
