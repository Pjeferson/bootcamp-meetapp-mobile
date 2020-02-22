import React, { useState } from 'react';

import Background from '~/components/Background';
import Header from '~/components/Header';

import { Container, MeetupDateSelector } from './styles';

export default function Dashboard() {
  const [date, setDate] = useState(new Date());

  return (
    <Background>
      <Container>
        <Header />
        <MeetupDateSelector date={date} onChange={setDate} />
      </Container>
    </Background>
  );
}

Dashboard.navigationOptions = {
  tabBarLabel: 'Meetups',
  tabBarIcon: ({ tintColor }) => (
    <Icon name="format-list-bulleted" size={20} color={tintColor} />
  ),
};
