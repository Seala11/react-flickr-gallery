import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import FormPage from '.';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import AppProvider from 'app/store/provider';

const TEST_DATA = {
  agreement: true,
  avatar: new File(['file'], 'file.png', { type: 'image/png' }),
  birthday: '2022-09-25',
  country: 'Latvia',
  firstName: 'Hanna',
  lastName: 'Papova',
  notifications: false,
};

describe('on submitting complete Form', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  it('should reset all inputs, disable the submit button, add new card and remove submit message', async () => {
    jest.useFakeTimers();

    act(() => {
      render(
        <AppProvider>
          <FormPage />
        </AppProvider>
      );
    });

    expect(screen.getByText(/You have not submitted any form yet/i)).toBeInTheDocument();

    userEvent.type(screen.getByTestId('firstName'), TEST_DATA.firstName);
    userEvent.type(screen.getByTestId('lastName'), TEST_DATA.lastName);
    userEvent.type(screen.getByTestId('birthday'), TEST_DATA.birthday);
    userEvent.selectOptions(screen.getByTestId('country'), TEST_DATA.country);

    const avatarInput: HTMLInputElement = screen.getByTestId('avatar');

    await waitFor(() => userEvent.upload(avatarInput, TEST_DATA.avatar));

    if (!avatarInput.files) {
      throw new Error('No files have been uploaded');
    }
    expect(avatarInput.files[0]).toStrictEqual(TEST_DATA.avatar);

    userEvent.click(screen.getByTestId('agreement'));
    userEvent.click(screen.getByTestId('submit-button'));

    await waitFor(() => expect(screen.queryByRole('listitem')).toBeInTheDocument());
    const card = await screen.findByRole('listitem');
    await waitFor(() =>
      expect(screen.queryByText(/Your form has been successfully submitted/i)).toBeInTheDocument()
    );
    await waitFor(() => expect(screen.queryByTestId('submit-button')).toBeDisabled());

    expect(card).toHaveTextContent(
      /First Name: Hanna\s*Last Name: Papova\s*Birthday: 2022-09-25\s*Country: Latvia\s*Notifications: Off/i
    );

    act(() => {
      jest.advanceTimersByTime(8500);
    });

    await waitFor(() => {
      expect(
        screen.queryByText(/Your form has been successfully submitted/i)
      ).not.toBeInTheDocument();
    });
  });
});
