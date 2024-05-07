import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import ManageManagers from "./ManageFundManagers";


// Mock the fetch function
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve([
      {
        ID: 1,
        Name: 'John Doe',
        Email: 'john@example.com',
        role: 'Manager',
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

describe('ManageManagers Component', () => {
  beforeEach(() => {
    fetch.mockClear();
  });

  it('renders loading indicator while fetching data', async () => {
    const { getByText } = render(<ManageManagers />);
    expect(getByText('Loading...')).toBeInTheDocument();
  });

  it('renders managers table with data after fetching', async () => {
    const { getByText, getAllByRole } = render(<ManageManagers />);
    await waitFor(() => {
      expect(getAllByRole('table')).toHaveLength(2); // Managers table and Admins table
      expect(getByText('John Doe')).toBeInTheDocument();
      expect(getByText('jane@example.com')).toBeInTheDocument();
    });
  });

  it('toggles manager role on button click', async () => {
    const { queryAllByText } = render(<ManageManagers />);
    await waitFor(() => {
      const toggleButtons = queryAllByText('Promote to Admin'); // Get all toggle buttons
      toggleButtons.forEach(button => fireEvent.click(button)); // Click each toggle button
      expect(fetch).toHaveBeenCalledTimes(3); // Ensure fetch is called for each toggle action
    });
  });
  

  it('toggles account status on button click', async () => {
    const { queryAllByText } = render(<ManageManagers />);
    await waitFor(() => {
      const toggleButtons = queryAllByText('Block Account'); // Get all toggle buttons
      toggleButtons.forEach(button => fireEvent.click(button)); // Click each toggle button
      expect(fetch).toHaveBeenCalledTimes(2); // Ensure fetch is called for each toggle action
    });
  });
  

  it('deletes manager on button click', async () => {
    const { queryAllByText } = render(<ManageManagers />);
    await waitFor(() => {
      const deleteButtons = queryAllByText('Delete'); // Get all delete buttons
      deleteButtons.forEach(button => fireEvent.click(button)); // Click each delete button
      expect(fetch).toHaveBeenCalledTimes(3); // Ensure fetch is called for each delete action
    });
  });  
});
