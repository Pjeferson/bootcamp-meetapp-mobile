import styled from 'styled-components/native';
import { StatusBar } from 'react-native';

import DateSelector from '~/components/DateSelector';

export const Container = styled.SafeAreaView.attrs({
  marginTop: StatusBar.currentHeight,
})`
  flex: 1;
`;

export const MeetupDateSelector = styled(DateSelector)`
  margin-top: 30px;
  align-self: center;
`;
