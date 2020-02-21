import React, { useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import logo from '~/assets/logo.png';

import { signInRequest } from '~/store/modules/auth/actions';

import Background from '~/components/Background';

import { Container, Avatar, Form, FormInput, SubmitButton } from './styles';

export default function SignIn() {
  const passwordRef = useRef();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const loading = useSelector(state => state.auth.loading);

  const dispatch = useDispatch();

  function handleSubmit() {
    dispatch(signInRequest(email, password));
  }

  return (
    <Background>
      <Container>
        <Avatar source={logo} />
        <Form>
          <FormInput
            icon="mail-outline"
            keyboardType="email-address"
            autoCorrect={false}
            autoCapitalize="none"
            placeholder="Digite seu e-mail"
            returnKeyType="next"
            onSubmitEditing={() => {
              passwordRef.current.focus();
            }}
            value={email}
            onChangeText={setEmail}
          />
          <FormInput
            icon="lock-outline"
            secureTextEntry
            placeholder="Sua senha secreta"
            ref={passwordRef}
            returnKeyType="send"
            onSubmitEditing={handleSubmit}
            value={password}
            onChangeText={setPassword}
          />
          <SubmitButton loading={loading} onPress={handleSubmit}>
            Entrar
          </SubmitButton>
        </Form>
      </Container>
    </Background>
  );
}
