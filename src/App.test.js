// App.test.js

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import App from './App'; // Adjust path as per your project structure

test('renders file upload form', () => {
  render(<App />);
  expect(screen.getByText(/file comparison app/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/file 1/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/file 2/i)).toBeInTheDocument();
  expect(screen.getByText(/compare files/i)).toBeInTheDocument();
});

test('displays error when files are not provided', () => {
  render(<App />);
  fireEvent.click(screen.getByText(/compare files/i));
  expect(screen.getByText(/both file fields must be filled/i)).toBeInTheDocument();
});

test('displays error when files are not of allowed extension', () => {
  render(<App />);
  const file1 = new File(['file1'], 'file1.png', { type: 'image/png' });
  const file2 = new File(['file2'], 'file2.png', { type: 'image/png' });
  fireEvent.change(screen.getByLabelText(/file 1/i), { target: { files: [file1] } });
  fireEvent.change(screen.getByLabelText(/file 2/i), { target: { files: [file2] } });
  fireEvent.click(screen.getByText(/compare files/i));
  expect(screen.getByText(/only \.txt files are allowed/i)).toBeInTheDocument();
});
