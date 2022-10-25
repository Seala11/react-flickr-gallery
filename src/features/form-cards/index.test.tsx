import React from 'react';
import { render, screen } from '@testing-library/react';
import FormCardList from '.';
import { act } from 'react-dom/test-utils';
import AppProvider from 'app/store/provider';
import AppContext from 'app/store/context';
import { FormCardType } from 'app/store/formPageReducer';

const TEST_CARDS: FormCardType[] = [
  {
    agreement: true,
    avatar: null,
    birthday: '2022-09-25',
    country: 'Latvia',
    firstName: 'Hanna',
    lastName: 'Papova',
    notifications: false,
  },
  {
    agreement: true,
    avatar: null,
    birthday: '2000-09-25',
    country: 'Latvia',
    firstName: 'Anna',
    lastName: 'Pova',
    notifications: false,
  },
];

const initialFormState = {
  cards: TEST_CARDS,
  firstName: '',
  lastName: '',
  birthday: '',
  country: '',
  avatar: null,
  agreement: false,
  notifications: false,
};

describe('Wnen Form Cards component renders', () => {
  it('should display cards', async () => {
    const providerProps = {
      formCards: initialFormState,
      setFormCards: jest.fn(),
    };

    render(
      <AppContext.Provider value={providerProps}>
        <FormCardList />
      </AppContext.Provider>
    );

    expect(screen.getAllByRole('listitem')).toHaveLength(2);
    expect(screen.findByText(/You have not submitted any form yet/i)).not.toBeInTheDocument;
  });

  it('should display message if no cards have been submitted', () => {
    act(() => {
      render(
        <AppProvider>
          <FormCardList />
        </AppProvider>
      );
    });

    expect(screen.findByText(/You have not submitted any form yet/i)).toBeInTheDocument;
    expect(screen.findAllByRole('listitem')).not.toBeInTheDocument;
  });
});
