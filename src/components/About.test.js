import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import About from './About';

describe('About Component', () => {
  test('renders component without crashing', () => {
    render(<About />);
  });

  test('renders welcome message', () => {
    const { getByText } = render(<About />);
    expect(getByText('Welcome to FundDocker')).toBeInTheDocument();
  });

  test('renders introduction paragraph', () => {
    const { getByText } = render(<About />);
    expect(getByText(/At/i)).toBeInTheDocument();
  });

  test('renders mission statement', () => {
    const { getByText } = render(<About />);
    expect(getByText(/Our goal is to empower organizations/i)).toBeInTheDocument();
  });

  test('renders slogan', () => {
    const { getByText } = render(<About />);
    expect(getByText(/Sail Towards Success with FundDocker/i)).toBeInTheDocument();
  });
});
