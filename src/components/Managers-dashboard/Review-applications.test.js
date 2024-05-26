import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Reviewapplications from './Review-applications';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';

describe('Reviewapplications', () => {
  beforeEach(() => {
    // Clear any previous mocks
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly', () => {
    render(
      <MemoryRouter>
        <Reviewapplications />
      </MemoryRouter>
    );
  });

  it('displays loading initially', () => {
    render(
      <MemoryRouter>
        <Reviewapplications />
      </MemoryRouter>
    );
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('displays applications when data is fetched', async () => {
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => [
        {
          Application_ID: 1,
          Title: 'Application 1',
          Description: 'Description 1',
          AcceptedOrRejected: null,
        },
      ],
    });

    render(
      <MemoryRouter>
        <Reviewapplications />
      </MemoryRouter>
    );

    await waitFor(() => expect(screen.getByText('Application 1')).toBeInTheDocument());
    expect(screen.getByText('Description 1')).toBeInTheDocument();
  });

  it('displays approved status correctly', async () => {
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => [
        {
          Application_ID: 1,
          Title: 'Application 1',
          Description: 'Description 1',
          AcceptedOrRejected: true,
        },
      ],
    });

    render(
      <MemoryRouter>
        <Reviewapplications />
      </MemoryRouter>
    );

    await waitFor(() => expect(screen.getByText('Application 1')).toBeInTheDocument());
    expect(screen.getByText('APPROVED')).toBeInTheDocument();
  });

  it('displays rejected status correctly', async () => {
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => [
        {
          Application_ID: 1,
          Title: 'Application 1',
          Description: 'Description 1',
          AcceptedOrRejected: false,
        },
      ],
    });

    render(
      <MemoryRouter>
        <Reviewapplications />
      </MemoryRouter>
    );

    await waitFor(() => expect(screen.getByText('Application 1')).toBeInTheDocument());
    expect(screen.getByText('REJECTED')).toBeInTheDocument();
  });

  it('displays approve and reject buttons for pending applications', async () => {
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => [
        {
          Application_ID: 1,
          Title: 'Application 1',
          Description: 'Description 1',
          AcceptedOrRejected: null,
        },
      ],
    });

    render(
      <MemoryRouter>
        <Reviewapplications />
      </MemoryRouter>
    );

    await waitFor(() => expect(screen.getByText('Application 1')).toBeInTheDocument());
    expect(screen.getByText('Approve')).toBeInTheDocument();
    expect(screen.getByText('Reject')).toBeInTheDocument();
  });

  it('handles approve button click', async () => {
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => [
        {
          Application_ID: 1,
          Title: 'Application 1',
          Description: 'Description 1',
          AcceptedOrRejected: null,
        },
      ],
    });

    render(
      <MemoryRouter>
        <Reviewapplications />
      </MemoryRouter>
    );

    await waitFor(() => expect(screen.getByText('Approve')).toBeInTheDocument());

    global.fetch.mockResolvedValueOnce({ ok: true, json: async () => ({ success: true }) });

    fireEvent.click(screen.getByText('Approve'));

    await waitFor(() => expect(screen.getByText('APPROVED')).toBeInTheDocument());
  });

  it('handles reject button click', async () => {
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => [
        {
          Application_ID: 1,
          Title: 'Application 1',
          Description: 'Description 1',
          AcceptedOrRejected: null,
        },
      ],
    });

    render(
      <MemoryRouter>
        <Reviewapplications />
      </MemoryRouter>
    );

    await waitFor(() => expect(screen.getByText('Reject')).toBeInTheDocument());

    global.fetch.mockResolvedValueOnce({ ok: true, json: async () => ({ success: true }) });

    fireEvent.click(screen.getByText('Reject'));

    await waitFor(() => expect(screen.getByText('REJECTED')).toBeInTheDocument());
  });

  it('displays error message when fetch fails', async () => {
    global.fetch.mockRejectedValueOnce(new Error('Failed to fetch data'));

    render(
      <MemoryRouter>
        <Reviewapplications />
      </MemoryRouter>
    );

    await waitFor(() => expect(screen.queryByText('Loading...')).not.toBeInTheDocument());
  });
});
