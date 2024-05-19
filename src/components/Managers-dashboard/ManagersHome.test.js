import React from 'react';
import { render, screen } from '@testing-library/react';
import ManagersHome from './ManagersHome';

// Mock fetch function
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve([
      { EducationAmount: 100, EventsAmount: 200, BusinessAmount: 300 }
    ]),
  })
);

// Mock Chart class
jest.mock('chart.js/auto', () => {
  const mockChartInstance = {
    destroy: jest.fn(),
    update: jest.fn(),
    // Add other methods as needed
  };
  const mockChart = jest.fn(() => mockChartInstance);
  return {
    __esModule: true,
    default: mockChart,
  };
});


describe('ManagersHome Component', () => {
  test('renders component without crashing', async () => {
    render(<ManagersHome email="test@example.com" />);
    
    // Assert that certain elements are present in the rendered component
    expect(screen.getByText('Education Budget')).toBeInTheDocument();
    expect(screen.getByText('Events Budget')).toBeInTheDocument();
    expect(screen.getByText('Business Budget')).toBeInTheDocument();
    expect(screen.getByText('Edit')).toBeInTheDocument();
    expect(screen.getByText('Education Budget')).toBeInTheDocument();
    expect(screen.getByText('Events Budget')).toBeInTheDocument();
    expect(screen.getByText('Business Budget')).toBeInTheDocument();
    expect(screen.getByText('Save')).toBeInTheDocument();
    expect(screen.getByTestId('doughnutChart')).toBeInTheDocument();
    expect(screen.getByTestId('barChart')).toBeInTheDocument();

    // Add more assertions as needed
  });

  // Add other test cases...
});
