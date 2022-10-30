import React from 'react';
import { render, screen } from '@testing-library/react';
import Pagination from '.';
import AppProvider from 'app/store/provider';

describe('Wnen Pagination component renders', () => {
  it('should display list of pages', () => {
    render(
      <AppProvider>
        <Pagination searchHandler={jest.fn()} />
      </AppProvider>
    );

    expect(screen.getByTestId('list')).toBeInTheDocument();
  });
});
