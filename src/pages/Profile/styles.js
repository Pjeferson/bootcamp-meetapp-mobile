import styled from 'styled-components/native';
import { StatusBar } from 'react-native';
import Input from '~/components/Input';
import Button from '~/components/Button';

export const Container = styled.SafeAreaView.attrs({
  marginTop: StatusBar.currentHeight,
})`
  flex: 1;
`;

export const Form = styled.ScrollView.attrs({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: { padding: 20 },
})`
  align-self: stretch;
`;

export const FormInput = styled(Input)`
  margin-bottom: 10px;
`;

export const SubmitButton = styled(Button)`
  margin-top: 5px;
  background: #e5556e;
`;

export const LogoutButton = styled(Button)`
  margin-top: 15px;
  background: #d44059;
  height: 42px;
`;

export const Separator = styled.View`
  height: 1px;
  background: rgba(255, 255, 255, 0.1);
  margin: 20px 0 20px;
`;
