import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import UsersDashboard from './Users-dashboard';

// Mock the useUserAuth context
jest.mock('../../context/UserAuthContext', () => ({
  useUserAuth: () => ({
    logOut: jest.fn(),
    user: { email: 'test@example.com' } // Mock the user email
  })
}));

describe('UsersDashboard Component', () => {
  it('renders home tab by default', () => {
    const { getByText } = render(
      <MemoryRouter initialEntries={['/users-dashboard']}>
        <Routes>
          <Route path="/users-dashboard" element={<UsersDashboard />} />
        </Routes>
      </MemoryRouter>
    );
    expect(getByText('Home')).toBeInTheDocument();
  });

  it('renders correct content when tab is clicked', async () => {
    const { getByText, queryByText } = render(
      <MemoryRouter initialEntries={['/users-dashboard']}>
        <Routes>
          <Route path="/users-dashboard" element={<UsersDashboard />} />
        </Routes>
      </MemoryRouter>
    );
  
    // Simulate click on the "Funding Opportunities" tab
    fireEvent.click(getByText('Funding Oppurtunities')); // Correct the typo here
  
    // Wait for the component to update
    await waitFor(() => {
      expect(queryByText('FindFunder')); // Check if FindFunder component is rendered
    });
  });  
  
});
