import React, { useMemo } from 'react';
import { TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { addDays, subDays, format } from 'date-fns';
import pt from 'date-fns/locale/pt';

import { Container, DateText } from './styles';

export default function DateSelector({ date, onChange, ...rest }) {
  const dateFormatted = useMemo(
    () => format(date, "dd 'de' MMMM", { locale: pt }),
    [date]
  );

  function handleDateDecrement() {
    onChange(subDays(date, 1));
  }

  function handleDateIncrement() {
    onChange(addDays(date, 1));
  }

  return (
    <Container {...rest}>
      <TouchableOpacity onPress={handleDateDecrement}>
        <Icon name="chevron-left" size={30} color="#fff" />
      </TouchableOpacity>
      <DateText>{dateFormatted}</DateText>
      <TouchableOpacity onPress={handleDateIncrement}>
        <Icon name="chevron-right" size={30} color="#fff" />
      </TouchableOpacity>
    </Container>
  );
}

DateSelector.propTypes = {
  date: PropTypes.shape({}).isRequired,
  onChange: PropTypes.func.isRequired,
};
