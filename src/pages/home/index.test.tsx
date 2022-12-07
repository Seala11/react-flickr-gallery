import React from 'react';
import {
  fireEvent,
  render,
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import Home from '.';
import { setSearchValueToStorage } from 'shared/helpers/storage';
import userEvent from '@testing-library/user-event';
import { server } from '../../mocks/server';
import { rest } from 'msw';

describe('Wnen Home component renders', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  it('should contain empty search input and default amount of cards if there are no stored value in storage', async () => {
    render(<Home />);
    const loader = await screen.getByTestId('loader');

    waitForElementToBeRemoved(loader);

    expect(await screen.queryByText(/Oops! Something went wrong/i)).not.toBeInTheDocument();
    expect(await screen.findByTestId('cardlist')).toBeInTheDocument();
    expect(screen.getByTestId('search-input')).toBeEmptyDOMElement();
  });

  it('stored value should be displayed in the search input on component`s mount', () => {
    const TEST_VAL = 'test';
    setSearchValueToStorage(TEST_VAL);

    render(<Home />);
    expect(screen.getByTestId('search-input')).toHaveDisplayValue(TEST_VAL);
  });

  it('input value should be saved to LocalStorage during component`s unmount', () => {
    const TEST_VAL = 'test1';

    const { unmount } = render(<Home />);
    const input = screen.getByRole('searchbox');
    expect(screen.getByTestId('search-input')).toHaveDisplayValue('');

    userEvent.type(input, TEST_VAL);
    expect(screen.getByTestId('search-input')).toHaveDisplayValue(TEST_VAL);

    unmount();

    render(<Home />);
    expect(screen.getByTestId('search-input')).toHaveDisplayValue(TEST_VAL);
  });
});

describe('When search input is updated', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  it('should make an api call if enter pressed', async () => {
    const requestSpy = jest.fn();
    server.events.on('request:start', requestSpy);
    const TEST_VAL = 'test';
    render(<Home />);
    const loader = await screen.getByTestId('loader');
    waitForElementToBeRemoved(loader);

    const input = screen.getByRole('searchbox');
    userEvent.type(input, TEST_VAL);
    expect(screen.getByTestId('search-input')).toHaveDisplayValue(TEST_VAL);

    fireEvent.keyDown(input, { key: 'enter', keyCode: 13 });
    expect(await screen.getByTestId('loader')).toBeInTheDocument();
    expect(requestSpy).toHaveBeenCalledTimes(1);
    expect(requestSpy).toHaveBeenCalledWith(
      expect.objectContaining({
        method: 'GET',
        url: new URL('https://api.flickr.com/services/rest/'),
      })
    );
  });

  it('should make an api call if search button is pressed', async () => {
    const requestSpy = jest.fn();
    server.events.on('request:start', requestSpy);
    const TEST_VAL = 'test';
    render(<Home />);
    const loader = await screen.getByTestId('loader');
    waitForElementToBeRemoved(loader);

    const input = screen.getByRole('searchbox');
    userEvent.type(input, TEST_VAL);
    expect(screen.getByTestId('search-input')).toHaveDisplayValue(TEST_VAL);

    userEvent.click(screen.getByTestId('search-btn'));
    expect(await screen.getByTestId('loader')).toBeInTheDocument();
    expect(requestSpy).toHaveBeenCalledWith(
      expect.objectContaining({
        method: 'GET',
        url: new URL('https://api.flickr.com/services/rest/'),
      })
    );
  });

  it('should display error if api call failed', async () => {
    server.use(
      rest.get('https://api.flickr.com/services/rest/', (req, res, ctx) => {
        return res.once(
          ctx.status(500),
          ctx.json({
            error: 'error',
          })
        );
      })
    );

    render(<Home />);
    const loader = await screen.getByTestId('loader');
    waitForElementToBeRemoved(loader);

    await screen.findByTestId('error');
    expect(await screen.queryByText(/Oops! Something went wrong/i)).toBeInTheDocument();
  });

  it('after clearing search input should be empty', async () => {
    const TEST_VAL = 'test1';

    render(<Home />);
    const input = screen.getByRole('searchbox');
    expect(screen.getByTestId('search-input')).toHaveDisplayValue('');

    userEvent.type(input, TEST_VAL);
    expect(screen.getByTestId('search-input')).toHaveDisplayValue(TEST_VAL);

    const clearButton = await waitFor(() => screen.getByTestId('clear-btn'));
    userEvent.click(clearButton);

    expect(input).toHaveDisplayValue('');
    expect(clearButton).not.toBeInTheDocument();
  });
});

describe('When clicking on the card', () => {
  beforeEach(() => {
    window.scrollTo = jest.fn();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  afterAll(() => {
    jest.clearAllMocks();
  });

  it('popup should be displayed', async () => {
    render(<Home />);
    const loader = await screen.getByTestId('loader');
    waitForElementToBeRemoved(loader);

    const cards = await screen.findAllByRole('listitem');
    userEvent.click(cards[0]);

    expect(screen.getByTestId('popup')).toBeInTheDocument();
    expect(screen.getByTestId('overlay')).toBeInTheDocument();
  });
});

describe('When popup is displayed', () => {
  beforeEach(() => {
    window.scrollTo = jest.fn();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  afterAll(() => {
    jest.clearAllMocks();
  });

  it('clicking on overlay should close popup', async () => {
    render(<Home />);
    const loader = await screen.getByTestId('loader');
    waitForElementToBeRemoved(loader);

    const cards = await screen.findAllByRole('listitem');
    userEvent.click(cards[0]);

    expect(screen.getByTestId('popup')).toBeInTheDocument();
    expect(screen.getByTestId('overlay')).toBeInTheDocument();

    userEvent.click(screen.getByTestId('overlay'));

    expect(screen.queryByTestId('popup')).not.toBeInTheDocument();
    expect(screen.queryByTestId('overlay')).not.toBeInTheDocument();
  });

  it('clicking on close button close popup', async () => {
    render(<Home />);
    const loader = await screen.getByTestId('loader');
    waitForElementToBeRemoved(loader);

    const cards = await screen.findAllByRole('listitem');
    userEvent.click(cards[0]);

    expect(screen.getByTestId('popup')).toBeInTheDocument();
    expect(screen.getByTestId('overlay')).toBeInTheDocument();

    userEvent.click(screen.getByTestId('popup-close-btn'));

    expect(screen.queryByTestId('popup')).not.toBeInTheDocument();
    expect(screen.queryByTestId('overlay')).not.toBeInTheDocument();
  });
});
