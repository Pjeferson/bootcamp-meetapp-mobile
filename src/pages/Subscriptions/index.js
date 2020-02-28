import React, { useState, useEffect } from 'react';
import { Alert } from 'react-native';
import { withNavigationFocus } from 'react-navigation';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';

import api from '~/services/api';

import Background from '~/components/Background';
import Header from '~/components/Header';

import {
  Container,
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
  CancelButton,
  CancelButtonText,
} from './styles';

function Subscriptions({ isFocused }) {
  const [subscriptions, setSubscriptions] = useState([]);

  useEffect(() => {
    async function loadMeetups() {
      const response = await api.get('/subscriptions');

      const data = response.data.map(subscription => ({
        ...subscription,
        meetup: {
          ...subscription.meetup,
          dateFormatted: format(
            parseISO(subscription.meetup.date),
            "dd 'de' MMMM', às' hh'h'",
            { locale: pt }
          ),
        },
      }));

      setSubscriptions(data);
    }
    loadMeetups();
  }, [isFocused]);

  async function handleCancelation(id) {
    try {
      await api.delete(`/subscriptions/${id}`);

      setSubscriptions(
        subscriptions.filter(subscription => subscription.id !== id)
      );
    } catch (error) {
      Alert.alert(
        'Erro ao cancelar inscrição',
        'Não foi possível cancelar a sua inscrição do Meetup.'
      );
    }
  }

  return (
    <Background>
      <Container>
        <Header />
        <MeetupsList
          data={subscriptions}
          keyExtractor={subscription => String(subscription.id)}
          renderItem={({ item: subscription }) => (
            <Meetup>
              <Banner source={{ uri: subscription.meetup.banner.url }} />
              <Infos>
                <TitleText>{subscription.meetup.title}</TitleText>
                <DateInfo>
                  <Icon name="event" size={15} color="#999" />
                  <DateText>{subscription.meetup.dateFormatted}</DateText>
                </DateInfo>
                <LocationInfo>
                  <Icon name="place" size={15} color="#999" />
                  <LocationText>{subscription.meetup.location}</LocationText>
                </LocationInfo>
                <OrganizerInfo>
                  <Icon name="person" size={15} color="#999" />
                  <OrganizerText>
                    Organizador: {subscription.meetup.user.name}
                  </OrganizerText>
                </OrganizerInfo>

                <CancelButton
                  onPress={() => handleCancelation(subscription.id)}
                >
                  <CancelButtonText>Cancelar inscrição</CancelButtonText>
                </CancelButton>
              </Infos>
            </Meetup>
          )}
        />
      </Container>
    </Background>
  );
}

Subscriptions.navigationOptions = {
  tabBarLabel: 'Inscrições',
  tabBarIcon: ({ tintColor }) => (
    <Icon name="local-offer" size={20} color={tintColor} />
  ),
};

Subscriptions.propTypes = {
  isFocused: PropTypes.bool.isRequired,
};

export default withNavigationFocus(Subscriptions);
