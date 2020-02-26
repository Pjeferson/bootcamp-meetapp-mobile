import styled from 'styled-components/native';
import { StatusBar } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';

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

export const MeetupsList = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: { padding: 20, paddingTop: 0 },
})`
  margin-top: 30px;
`;

export const Meetup = styled.View`
  margin-bottom: 20px;
`;

export const Banner = styled.Image`
  height: 150px;
  width: 100%;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  background: #eee;
`;

export const Infos = styled.View`
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
  background: #fff;
  padding: 20px;
`;

export const TitleText = styled.Text`
  color: #333;
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
`;

export const DateInfo = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 10px;
`;

export const DateText = styled.Text`
  color: #999;
  font-size: 14px;
  margin-left: 5px;
`;

export const LocationInfo = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 10px;
`;

export const LocationText = styled.Text`
  color: #999;
  font-size: 14px;
  margin-left: 5px;
`;

export const OrganizerInfo = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const OrganizerText = styled.Text`
  color: #999;
  font-size: 14px;
  margin-left: 5px;
`;

export const SubscribeButton = styled(RectButton)`
  margin-top: 15px;
  height: 40px;
  background: #f94d6a;

  border-radius: 4px;
  align-items: center;
  justify-content: center;
`;

export const SubscribeButtonText = styled.Text`
  color: #fff;
  font-size: 16px;
  font-weight: bold;
`;
