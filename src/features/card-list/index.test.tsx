import React from 'react';
import { render, screen } from '@testing-library/react';
import CardList from '.';

const TEST_CARDS = [
  {
    farm: 66,
    id: '36493087974',
    isfamily: 0,
    isfriend: 0,
    ispublic: 1,
    license: '4',
    owner: '96925387@N00',
    ownername: 'Jeanne Menjoulet',
    secret: '4df1b792a8',
    server: '65535',
    title: 'Cannelle au soleil',
    iconfarm: 99,
    iconserver: '7285',
    views: '6211',
    tags: 'bird nest spring fieldfare ngc',
    description: { _content: '' },
    datetaken: '2017-04-30 11:24:39',
  },
  {
    farm: 66,
    id: '36493087977',
    isfamily: 0,
    isfriend: 0,
    ispublic: 1,
    license: '4',
    owner: 'hanna',
    ownername: 'hanna papova',
    secret: '4df1b792a8',
    server: '65535',
    title: 'picture',
    iconfarm: 99,
    iconserver: '7285',
    views: '6211',
    tags: 'bird nest spring fieldfare ngc',
    description: { _content: '' },
    datetaken: '2017-04-30 11:24:39',
  },
];

describe('when the card list is rendered', () => {
  it('initially should contain all cards', () => {
    render(<CardList cards={TEST_CARDS} showPopUp={() => {}} />);
    expect(screen.getAllByRole('listitem')).toHaveLength(2);
  });
});
