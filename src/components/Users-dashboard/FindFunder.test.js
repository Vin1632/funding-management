import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import FindFunder from './FindFunder';

describe('FindFunder component', () => {
  it('renders correctly', () => {
    const { getByText } = render(
      <MemoryRouter>
        <FindFunder />
      </MemoryRouter>
    );
    
    // Ensure all initial adverts are rendered
    // expect(getByText('Advert 1 - Fund a Science talk')).toBeInTheDocument();
    // expect(getByText('Advert 2 - Fund your studies')).toBeInTheDocument();
    // expect(getByText('Advert 3 - Start your business today')).toBeInTheDocument();
    // expect(getByText('Advert 4 - Bursaries for Com Sci')).toBeInTheDocument();
    // expect(getByText('Advert 5 - Fund a charity event')).toBeInTheDocument();
    // expect(getByText('Advert 6 - Funding for new tech equipment')).toBeInTheDocument();
  });
});

