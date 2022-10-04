import React from 'react';
import { render, screen } from '@testing-library/react';
import Form from '.';

describe('when Form component renders', () => {
  it('should have a form', () => {
    render(<Form />);
    expect(screen.getByTestId('react-form')).toBeInTheDocument();
  });

  it('submit button should be disabled', () => {
    render(<Form />);
    expect(screen.getByTestId('submit-button')).toBeDisabled();
  });
});

// describe('when typing in Form inputs', () => {
//   it.todo('submit button should not be disabled', () => {
//     render(<Form />);
//     expect(screen.getByTestId('react-form')).toBeInTheDocument();
//   });
// });
