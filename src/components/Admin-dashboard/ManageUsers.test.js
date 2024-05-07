import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import ManageUsers from './ManageUsers';

// Mock the fetch function
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve([
      {
        ID: 1,
        Name: 'John Doe',
        Email: 'john@example.com',
        role: 'User',
        Blocked: false
      },
      {
        ID: 2,
        Name: 'Jane Smith',
        Email: 'jane@example.com',
        role: 'Manager',
        Blocked: true
      }
    ]),
  })
);

describe('ManageUsers Component', () => {
  beforeEach(() => {
    fetch.mockClear();
  });

  it('renders loading indicator while fetching data', async () => {
    const { getByText } = render(<ManageUsers />);
    expect(getByText('Loading...')).toBeInTheDocument();
  });

  it('renders users table with data after fetching', async () => {
    const { getByText, getAllByRole } = render(<ManageUsers />);
    await waitFor(() => {
      expect(getAllByRole('table')).toHaveLength(1); // Users table
      expect(getByText('John Doe')).toBeInTheDocument();
      expect(getByText('jane@example.com')).toBeInTheDocument();
    });
  });

  it('toggles user role on button click', async () => {
    const { queryAllByText } = render(<ManageUsers />);
    await waitFor(() => {
      const toggleButtons = queryAllByText(/Promote to Manager|Demote to User/); // Get all toggle buttons
      toggleButtons.forEach(button => fireEvent.click(button)); // Click each toggle button
      expect(fetch).toHaveBeenCalledTimes(3); // Ensure fetch is called for each toggle action
    });
  });

  it('toggles account status on button click', async () => {
    const { queryAllByText } = render(<ManageUsers />);
    await waitFor(() => {
      const toggleButtons = queryAllByText(/Block Account|Unblock Account/); // Get all toggle buttons
      toggleButtons.forEach(button => fireEvent.click(button)); // Click each toggle button
      expect(fetch).toHaveBeenCalledTimes(3); // Ensure fetch is called for each toggle action
    });
  });

  it('deletes user on button click', async () => {
    const { queryAllByText } = render(<ManageUsers />);
    await waitFor(() => {
      const deleteButtons = queryAllByText('Delete'); // Get all delete buttons
      deleteButtons.forEach(button => fireEvent.click(button)); // Click each delete button
      expect(fetch).toHaveBeenCalledTimes(3); // Ensure fetch is called for each delete action
    });
  });
});
