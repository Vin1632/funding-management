import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Home from './Home';

jest.mock('../context/UserAuthContext', () => ({
  __esModule: true,
  useUserAuth: () => ({
    logIn: jest.fn(),
    googleSignIn: jest.fn(),
  }),
}));

describe('Home component', () => {
  test('handleEducationChange function updates state correctly', () => {
    const { getByLabelText } = render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );
    
    const educationCheckbox = getByLabelText('Education', { selector: '#UserDetails input[type="checkbox"]' });

    expect(educationCheckbox.checked).toBe(false);

    fireEvent.click(educationCheckbox);

    expect(educationCheckbox.checked).toBe(true);
  });

  test('handleBusinessChange function does not throw errors', () => {
    const { getByLabelText } = render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    const businessCheckbox = getByLabelText('Business', { selector: '#UserDetails input[type="checkbox"]' });

    expect(() => fireEvent.click(businessCheckbox)).not.toThrow();
  });

  test('handleEventsChange function does not throw errors', () => {
    const { getByLabelText } = render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    const eventsCheckbox = getByLabelText('Events', { selector: '#UserDetails input[type="checkbox"]' });

    expect(() => fireEvent.click(eventsCheckbox)).not.toThrow();
  });
});
