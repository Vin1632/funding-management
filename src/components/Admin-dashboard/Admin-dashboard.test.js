import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import AdminDashboard from './Admin-dashboard';

jest.mock('../../context/UserAuthContext', () => ({
  useUserAuth: () => ({
    logOut: jest.fn(),
    user: { email: '123@gmail.com' }
  })
}));

describe('AdminDashboard Component', () => {
  it('renders home tab by default', () => {
    const { getByText } = render(
      <MemoryRouter initialEntries={['/admin-dashboard']}>
        <Routes>
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
        </Routes>
      </MemoryRouter>
    );
    expect(getByText('Home')).toBeInTheDocument();
  });

  it('logs out when the logout button is clicked', async () => {
    const { getByText } = render(
      <MemoryRouter initialEntries={['/admin-dashboard']}>
        <Routes>
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
        </Routes>
      </MemoryRouter>
    );

    fireEvent.click(getByText('Logout'));
    await waitFor(() => {
    });
  });

});
