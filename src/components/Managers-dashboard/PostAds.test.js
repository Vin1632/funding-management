import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom'; // Import extend-expect to extend the jest-dom matchers
import PostAds from './PostAds';
import { MemoryRouter } from 'react-router-dom'; // Import MemoryRouter to wrap the component

// Mock the fetch function
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
  })
);

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useLocation: jest.fn(() => ({
      search: '?email=', // Set the email query parameter as needed for your test
    })),
  }));

describe('PostAds Component', () => {
    let originalAlert; // Variable to store the original window.alert function

  beforeAll(() => {
    // Store the original window.alert function
    originalAlert = window.alert;
    // Mock the window.alert function
    window.alert = jest.fn();
  });

  afterAll(() => {
    // Restore the original window.alert function after all tests are done
    window.alert = originalAlert;
  });



  it('submits the form with valid data', async () => {
    const { getByLabelText, getByText } = render(
      <MemoryRouter>
        <PostAds />
      </MemoryRouter>
    );

    // Fill out the form fields
    fireEvent.change(getByLabelText('Fund Title:'), { target: { value: 'Test Title' } });
    fireEvent.change(getByLabelText('Description:'), { target: { value: 'Test Description' } });
    fireEvent.change(getByLabelText('Deadline:'), { target: { value: '2024-12-31' } });
    fireEvent.change(getByLabelText('Requirements:'), { target: { value: 'Test Requirements' } });

    // Check checkboxes
    fireEvent.click(getByLabelText('Education'));
    fireEvent.click(getByLabelText('Business'));
    fireEvent.click(getByLabelText('Events'));

    // Submit the form
    fireEvent.submit(getByText('Advertise'));

    // Wait for fetch request to resolve
    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith('/api/addAvert', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          Title: 'Test Title',
          Description: 'Test Description',
          Email: '', // Assuming this should be the email of the manager, but it's disabled in the form
          ManagerEmail: '', // Need to mock the location data to test this part
          Deadline: '2024-12-31',
          Requirements: 'Test Requirements',
          Events: true,
          Education: true,
          Business: true,
        }),
      });
    });

    // Ensure alert is shown
    expect(window.alert).toHaveBeenCalledWith('Advert Submitted ');

    // Ensure form fields are cleared after submission
    expect(getByLabelText('Fund Title:').value).toBe('');
    expect(getByLabelText('Description:').value).toBe('');
    expect(getByLabelText('Deadline:').value).toBe('');
    expect(getByLabelText('Requirements:').value).toBe('');
    expect(getByLabelText('Education').checked).toBe(false);
    expect(getByLabelText('Business').checked).toBe(false);
    expect(getByLabelText('Events').checked).toBe(false);
  });
});
