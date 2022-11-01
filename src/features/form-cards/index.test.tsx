import React from 'react';
import { render, screen } from '@testing-library/react';
import FormCardList from '.';
import { act } from 'react-dom/test-utils';

import { Provider } from 'react-redux';
import { setupStore } from 'app/store';
import { addForm } from 'app/store/formPageSlice';

describe('Wnen Form Cards component renders', () => {
  const FormWitchProvider = (
    <Provider store={setupStore()}>
      <FormCardList />
    </Provider>
  );

  it('should display cards', async () => {
    const mock = setupStore();
    mock.dispatch(
      addForm({
        agreement: true,
        avatar: null,
        birthday: '2000-09-25',
        country: 'Latvia',
        firstName: 'Anna',
        lastName: 'Pova',
        notifications: false,
      })
    );

    mock.dispatch(
      addForm({
        agreement: true,
        avatar: null,
        birthday: '2000-09-25',
        country: 'Latvia',
        firstName: 'Anna',
        lastName: 'Pova',
        notifications: false,
      })
    );

    render(
      <Provider store={mock}>
        <FormCardList />
      </Provider>
    );

    expect(screen.getAllByRole('listitem')).toHaveLength(2);
    expect(screen.findByText(/You have not submitted any form yet/i)).not.toBeInTheDocument;
  });

  it('should display message if no cards have been submitted', () => {
    act(() => {
      render(FormWitchProvider);
    });

    expect(screen.findByText(/You have not submitted any form yet/i)).toBeInTheDocument;
    expect(screen.findAllByRole('listitem')).not.toBeInTheDocument;
  });
});
