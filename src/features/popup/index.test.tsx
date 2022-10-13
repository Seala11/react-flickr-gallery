import React from 'react';
import { render, screen } from '@testing-library/react';
import PopUp from '.';

const CARD_VALID = {
  id: '37967185714',
  owner: '97171476@N00',
  secret: 'd6ed880c92',
  server: '4534',
  farm: 5,
  title: 'Robin',
  ispublic: 1,
  isfriend: 0,
  isfamily: 0,
  license: '0',
  description: {
    _content: 'Contrary to popular belief',
  },
  datetaken: '2017-04-30 11:24:39',
  datetakengranularity: 0,
  datetakenunknown: '0',
  ownername: 'coulportste',
  iconserver: '8638',
  iconfarm: 9,
  views: '2877',
  tags: 'bird robin feathers brockholes nature',
};

const CARD_LONG_DESCR = {
  id: '37967185714',
  owner: '97171476@N00',
  secret: 'd6ed880c92',
  server: '4534',
  farm: 5,
  title: 'Robin',
  ispublic: 1,
  isfriend: 0,
  isfamily: 0,
  license: '0',
  description: {
    _content:
      'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.',
  },
  datetaken: '2017-04-30 11:24:39',
  datetakengranularity: 0,
  datetakenunknown: '0',
  ownername: 'coulportste',
  iconserver: '8638',
  iconfarm: 9,
  views: '2877',
  tags: 'bird robin feathers brockholes nature',
};

const CARD_NO_DESCR = {
  id: '37967185714',
  owner: '97171476@N00',
  secret: 'd6ed880c92',
  server: '4534',
  farm: 5,
  title: 'Robin',
  ispublic: 1,
  isfriend: 0,
  isfamily: 0,
  license: '0',
  description: {
    _content: '',
  },
  datetaken: '2017-04-30 11:24:39',
  datetakengranularity: 0,
  datetakenunknown: '0',
  ownername: 'coulportste',
  iconserver: '8638',
  iconfarm: 9,
  views: '2877',
  tags: '',
};

describe('Wnen PopUp component renders', () => {
  it('should display card information', () => {
    render(<PopUp card={CARD_VALID} popUpClose={jest.fn()} />);

    expect(screen.getByText(new RegExp(CARD_VALID.title))).toBeInTheDocument();
    expect(screen.getByText(new RegExp(CARD_VALID.ownername))).toBeInTheDocument();
    expect(screen.getByText(new RegExp(CARD_VALID.description._content))).toBeInTheDocument();
  });

  it('should display card date', () => {
    render(<PopUp card={CARD_VALID} popUpClose={jest.fn()} />);

    const date = new Date(CARD_VALID.datetaken).toLocaleString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });

    expect(screen.getByText(new RegExp(date))).toBeInTheDocument();
  });

  it('should display card image and avatar', () => {
    render(<PopUp card={CARD_VALID} popUpClose={jest.fn()} />);

    expect(screen.getByAltText(CARD_VALID.ownername)).toBeInTheDocument();
    expect(screen.getByAltText(CARD_VALID.title)).toBeInTheDocument();
  });

  it('should cut card description if its too long', () => {
    const descrValue = CARD_LONG_DESCR.description._content.slice(0, 150) + '...';
    render(<PopUp card={CARD_LONG_DESCR} popUpClose={jest.fn()} />);

    expect(screen.getByTestId('popup-descr')).toBeInTheDocument();
    const desc = screen.getByTestId('popup-descr');
    expect(desc).toHaveTextContent(descrValue);
  });

  it('should display description not provided if card has no description', () => {
    render(<PopUp card={CARD_NO_DESCR} popUpClose={jest.fn()} />);

    expect(screen.getByTestId('popup-descr')).toBeInTheDocument();
    const desc = screen.getByTestId('popup-descr');
    expect(desc).toHaveTextContent('not provided');
  });

  it('should display tags not provided if card has no tags', () => {
    render(<PopUp card={CARD_NO_DESCR} popUpClose={jest.fn()} />);

    expect(screen.getByTestId('popup-tags')).toBeInTheDocument();
    const tags = screen.getByTestId('popup-tags');
    expect(tags).toHaveTextContent('not provided');
  });
});
