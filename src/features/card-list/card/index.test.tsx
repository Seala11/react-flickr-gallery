import React from 'react';
import { render, screen } from '@testing-library/react';
import Card from '.';

describe('when the card is rendered', () => {
  const testCard = {
    farm: 66,
    iconfarm: 99,
    iconserver: '7285',
    id: '36493087974',
    isfamily: 0,
    isfriend: 0,
    ispublic: 1,
    license: '4',
    owner: '96925387@N00',
    ownername: 'Jeanne Menjoulet ddfjsdhfgjshfgjsdhfgsjdhgfdj',
    secret: '4df1b792a8',
    server: '65535',
    title: 'Cannelle au soleil hdjkhkjhdkjdhkjhdkdjfhkjdfhsdkfhdkj',
    views: '6211',
    tags: 'bird nest spring fieldfare ngc',
    description: { _content: '' },
    datetaken: '2017-04-30 11:24:39',
  };

  it('should contain an expected image', () => {
    render(<Card card={testCard} showPopUp={() => {}} />);
    expect(screen.getByTestId('card-image')).toBeInTheDocument();
  });

  it('should contain an expected title', () => {
    render(<Card card={testCard} showPopUp={() => {}} />);
    expect(screen.getByTestId('card-title')).toBeInTheDocument();
  });

  it('should contain an expected subtitle', () => {
    render(<Card card={testCard} showPopUp={() => {}} />);
    expect(screen.getByTestId('card-subtitle')).toBeInTheDocument();
  });

  it('if title is larger than 35 characters display should replace the rest with ...', () => {
    render(<Card card={testCard} showPopUp={() => {}} />);
    expect(screen.getByTestId('card-title')).toBeInTheDocument();
    expect(screen.getByTestId('card-title')).toHaveTextContent(testCard.title.slice(0, 35));
  });

  it('if name is larger than 35 characters display should replace the rest with ...', () => {
    render(<Card card={testCard} showPopUp={() => {}} />);
    expect(screen.getByTestId('card-subtitle')).toBeInTheDocument();
    expect(screen.getByTestId('card-subtitle')).toHaveTextContent(testCard.ownername.slice(0, 35));
  });
});
