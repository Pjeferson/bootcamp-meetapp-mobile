import React, { useState, useEffect } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';

import api from '~/services/api';

import Background from '~/components/Background';
import Header from '~/components/Header';

import {
  Container,
  MeetupDateSelector,
  MeetupsList,
  Meetup,
  Banner,
  Infos,
  TitleText,
  DateInfo,
  DateText,
  LocationInfo,
  LocationText,
  OrganizerText,
  OrganizerInfo,
  SubscribeButton,
  SubscribeButtonText,
} from './styles';

export default function Dashboard() {
  const [date, setDate] = useState(new Date());
  const [meetups, setMeetups] = useState([]);

  useEffect(() => {
    async function loadMeetups() {
      const response = await api.get('/meetups', {
        params: { date },
      });

      setMeetups(response.data);
    }
    loadMeetups();
  }, [date]);

  return (
    <Background>
      <Container>
        <Header />
        <MeetupDateSelector date={date} onChange={setDate} />
        <MeetupsList
          data={meetups}
          keyExtractor={meetup => String(meetup.id)}
          renderItem={({ item: meetup }) => (
            <Meetup>
              <Banner source={{ uri: meetup.banner.url }} />
              <Infos>
                <TitleText>{meetup.title}</TitleText>
                <DateInfo>
                  <Icon name="event" size={15} color="#999" />
                  <DateText>{meetup.date}</DateText>
                </DateInfo>
                <LocationInfo>
                  <Icon name="place" size={15} color="#999" />
                  <LocationText>{meetup.location}</LocationText>
                </LocationInfo>
                <OrganizerInfo>
                  <Icon name="person" size={15} color="#999" />
                  <OrganizerText>Organizador: {meetup.user.name}</OrganizerText>
                </OrganizerInfo>

                <SubscribeButton onPress={() => {}}>
                  <SubscribeButtonText>Realizar inscrição</SubscribeButtonText>
                </SubscribeButton>
              </Infos>
            </Meetup>
          )}
        />
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
