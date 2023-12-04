import React from 'react';
import { Button as ChakraButton } from '@chakra-ui/react';

export const Button = ({ text, onClick, className }) => {
  return (
    <ChakraButton onClick={onClick} className={className}>
      {text}
    </ChakraButton>
  );
};
