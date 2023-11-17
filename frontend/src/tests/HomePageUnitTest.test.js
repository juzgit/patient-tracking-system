// File: HomePage.test.js
import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import HomePage from '../pages/HomePage';

test('renders Home Page component', () => {
  render(
  <MemoryRouter>
      <HomePage />
  </MemoryRouter>
);

  // Check if the component renders the main heading
  expect(screen.getByText('Home Page')).toBeInTheDocument();

  // Check if links to different pages are present
  expect(screen.getByText('Admin Register Page')).toBeInTheDocument();
  expect(screen.getByText('Admin Login Page')).toBeInTheDocument();
  expect(screen.getByText('Doctor Sign Up')).toBeInTheDocument();
  expect(screen.getByText('Doctor Login')).toBeInTheDocument();

});

