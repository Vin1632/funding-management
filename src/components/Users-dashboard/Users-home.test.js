import React from 'react';
import { render, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import UsersHome from './Users-home';

// Mocking the useLocation hook
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: () => ({
    search: '?email=test@example.com',
  }),
}));

// Mocking the fetch function
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve([
      {
        Application_ID: 1,
        ApplicantName: 'John Doe',
        AdTitle: 'Test Ad',
        AcceptedOrRejected: true,
      },
      {
        Application_ID: 2,
        ApplicantName: 'Jane Smith',
        AdTitle: 'Another Test Ad',
        AcceptedOrRejected: false,
      },
    ]),
  })
);

describe('UsersHome Component', () => {
  it('renders correctly', async () => {
    const { getByText } = render(<UsersHome />);

    await waitFor(() => {
      expect(getByText('Track application status')).toBeInTheDocument();
      expect(getByText('John Doe')).toBeInTheDocument();
      expect(getByText('Jane Smith')).toBeInTheDocument();
    });
  });

  it('fetches applications based on user email', async () => {
    render(<UsersHome />);

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith('/api/trackstatus', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ Email: 'test@example.com' }),
      });
    });
  });

  it('displays status labels correctly', async () => {
    const { getByText } = render(<UsersHome />);

    await waitFor(() => {
      expect(getByText('Accepted')).toBeInTheDocument();
      expect(getByText('Rejected')).toBeInTheDocument();
    });
  });
});
