import React from 'react';
import styled, { keyframes } from 'styled-components';

// Keyframes for the spin animation
const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

// Styled-component for the spinner
const Spinner = styled.div`
  border: 4px solid #f3f3f3;
  border-radius: 50%;
  border-top: 4px solid #3498db;
  width:  20px;
  height: 20px;
  animation: ${spin} 2s linear infinite;
`;

// LoadingSpinner component
const LoadingSpinner = () => <Spinner />;

export default LoadingSpinner;
