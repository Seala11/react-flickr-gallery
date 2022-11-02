import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '.';
import Routing from 'pages';
import Header from 'widgets/header';
import Footer from 'widgets/footer';

import { setupStore } from './store';
import { Provider } from 'react-redux';

describe('when App component renders', () => {
  const renderWithProvider = (
    <Provider store={setupStore()}>
      <MemoryRouter initialEntries={['/']}>
        <Header />
        <Routing />
        <Footer />
      </MemoryRouter>
    </Provider>
  );

  it('should initially display home page', () => {
    render(<App />);
    expect(screen.getByTestId('search-bar')).toBeInTheDocument();
  });

  it('should display about page by clicking on "about us" link', () => {
    render(renderWithProvider);
    userEvent.click(screen.getByText(/about/i));
    expect(screen.getByText(/Our team/i)).toBeInTheDocument();
  });

  it('should display home page by clicking on "home" link', () => {
    render(renderWithProvider);
    userEvent.click(screen.getByText(/about/i));
    expect(screen.getByText(/Our team/i)).toBeInTheDocument();

    userEvent.click(screen.getByText(/home/i));
    expect(screen.getByTestId('search-bar')).toBeInTheDocument();
  });

  it('should display form page by clicking on "form" link', () => {
    render(renderWithProvider);
    userEvent.click(screen.getByText(/form/i));
    expect(screen.getByTestId('react-form')).toBeInTheDocument();
  });

  it('should redirect unknown route to 404 page', () => {
    render(
      <MemoryRouter initialEntries={['/such/route/doesnt-exist']}>
        <Provider store={setupStore()}>
          <Header />
          <Routing />
          <Footer />
        </Provider>
      </MemoryRouter>
    );

    expect(screen.getByRole('heading', { name: '404' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Back Home' })).toBeInTheDocument();
  });

  it('should redirect to home page from 404 page by clicking button "back home"', () => {
    render(
      <MemoryRouter initialEntries={['/404']}>
        <Provider store={setupStore()}>
          <Header />
          <Routing />
          <Footer />
        </Provider>
      </MemoryRouter>
    );

    const backHomeButton = screen.getByRole('button', { name: 'Back Home' });

    expect(backHomeButton).toBeInTheDocument();
    userEvent.click(backHomeButton);
    expect(screen.getByTestId('search-bar')).toBeInTheDocument();
  });
});
