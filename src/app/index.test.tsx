import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '.';
import Routing from 'pages';
import Header from 'widgets/header';
import Footer from 'widgets/footer';

describe('when App component renders', () => {
  it('should initially display home page', () => {
    render(<App />);
    expect(screen.getByTestId('search-bar')).toBeInTheDocument();
  });

  it('should display about page by clicking on "about us" link', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <Header />
        <Routing />
        <Footer />
      </MemoryRouter>
    );
    userEvent.click(screen.getByText(/about/i));
    expect(screen.getByText(/Our team/i)).toBeInTheDocument();
  });

  it('should display home page by clicking on "home" link', () => {
    render(
      <MemoryRouter initialEntries={['/about']}>
        <Header />
        <Routing />
        <Footer />
      </MemoryRouter>
    );
    userEvent.click(screen.getByText(/home/i));
    expect(screen.getByTestId('search-bar')).toBeInTheDocument();
  });

  it('should display form page by clicking on "form" link', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <Header />
        <Routing />
        <Footer />
      </MemoryRouter>
    );
    userEvent.click(screen.getByText(/form/i));
    expect(screen.getByTestId('react-form')).toBeInTheDocument();
  });

  it('should redirect unknown route to 404 page', () => {
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

  it('should redirect to home page from 404 page by clicking button "back home"', () => {
    render(
      <MemoryRouter initialEntries={['/404']}>
        <Header />
        <Routing />
        <Footer />
      </MemoryRouter>
    );

    const backHomeButton = screen.getByRole('button', { name: 'Back Home' });

    expect(backHomeButton).toBeInTheDocument();
    userEvent.click(backHomeButton);
    expect(screen.getByTestId('search-bar')).toBeInTheDocument();
  });
});
