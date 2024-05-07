import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import FindFunder from './FindFunder';

global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve([
      {
        Title: 'Test Title',
        Description: 'Test Description',
        Email: 'test@example.com',
        AdID: '123',
        Education: true,
        Events: false,
        Business: false,
      },
    ]),
  })
);

describe('FindFunder Component', () => {
  it('submits the form with valid data', async () => {
    const { getByText, getByLabelText } = render(<FindFunder />);
    
    // Wait for the data to load and the element to appear
    await waitFor(() => {
      expect(getByText('Test Title')).toBeInTheDocument();
    });

    // Click on the advert
    fireEvent.click(getByText('Test Title'));
    
    // Wait for the form to appear
    await waitFor(() => {
      expect(getByLabelText('First Name')).toBeInTheDocument();
    });

    // Fill out the form fields
    fireEvent.change(getByLabelText('First Name'), { target: { value: 'John' } });
    fireEvent.change(getByLabelText('Last Name'), { target: { value: 'Doe' } });
    fireEvent.change(getByLabelText('Email'), { target: { value: 'john.doe@example.com' } });

    // Spy on window.alert
    const alertSpy = jest.spyOn(window, 'alert').mockImplementation(() => {});

    // Submit the form
    fireEvent.submit(getByText('Apply Now'));

    // Wait for the form submission to complete
    await waitFor(() => {
      expect(alertSpy).not.toHaveBeenCalled();
    });

    // Optionally, add more assertions to verify the form submission

    // Restore the original window.alert implementation
    alertSpy.mockRestore();
  });
});
