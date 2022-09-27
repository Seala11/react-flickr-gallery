import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '.';
import Routing from 'pages';
import Header from 'widgets/header';
import Footer from 'widgets/footer';

describe('App', () => {
  it('renders component', () => {
    render(<App />);
  });

  it('header navigation test', async () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <Header />
        <Routing />
        <Footer />
      </MemoryRouter>
    );

    expect(screen.getByText(/Search/i)).toBeInTheDocument();
    await userEvent.click(screen.getByText(/about/i));

    expect(screen.getByText(/Our team/i)).toBeInTheDocument();
  });

  it('Unknown route should redirect to 404', () => {
    render(
      <MemoryRouter initialEntries={['/such/route/doesnt-exist']}>
        <Header />
        <Routing />
        <Footer />
      </MemoryRouter>
    );

    expect(screen.getByRole('heading', { name: '404' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Back Home' })).toBeInTheDocument();
  });

  it('Button "back home" from 404 should redirect to home page', async () => {
    render(
      <MemoryRouter initialEntries={['/404']}>
        <Header />
        <Routing />
        <Footer />
      </MemoryRouter>
    );

    const backHomeButton = screen.getByRole('button', { name: 'Back Home' });

    expect(backHomeButton).toBeInTheDocument();
    await userEvent.click(backHomeButton);
    expect(screen.getByText(/search/i)).toBeInTheDocument();
  });
});
