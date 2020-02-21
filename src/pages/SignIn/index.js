import React, { useRef } from 'react';
import { View } from 'react-native';

import logo from '~/assets/logo.png';

import Background from '~/components/Background';

import { Container, Avatar, Form, FormInput, SubmitButton } from './styles';

export default function SignIn() {
  const passwordRef = useRef();

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
            /* value={email}
            onChangeText={setEmail} */
          />
          <FormInput
            icon="lock-outline"
            secureTextEntry
            placeholder="Sua senha secreta"
            ref={passwordRef}
            returnKeyType="send"
            /* onSubmitEditing={handleSubmit}
            value={password}
            onChangeText={setPassword} */
          />
          <SubmitButton /* loading={loading} onPress={handleSubmit} */>
            Entrar
          </SubmitButton>
        </Form>
      </Container>
    </Background>
  );
}
