import React, { useState, useEffect } from 'react';
import { Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';

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

      const data = response.data.map(meetup => ({
        ...meetup,
        dateFormatted: format(
          parseISO(meetup.date),
          "dd 'de' MMMM', às' hh'h'",
          { locale: pt }
        ),
      }));

      setMeetups(data);
    }
    loadMeetups();
  }, [date]);

  async function handleSubscription(id) {
    try {
      await api.post('/subscriptions', {
        meetup_id: id,
      });

      setMeetups(meetups.filter(meetup => meetup.id !== id));
    } catch (error) {
      Alert.alert(
        'Erro ao se inscrever',
        'Não foi possível realizar a sua inscrição no Meetup.'
      );
    }
  }

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
                  <DateText>{meetup.dateFormatted}</DateText>
                </DateInfo>
                <LocationInfo>
                  <Icon name="place" size={15} color="#999" />
                  <LocationText>{meetup.location}</LocationText>
                </LocationInfo>
                <OrganizerInfo>
                  <Icon name="person" size={15} color="#999" />
                  <OrganizerText>Organizador: {meetup.user.name}</OrganizerText>
                </OrganizerInfo>

                <SubscribeButton onPress={() => handleSubscription(meetup.id)}>
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
