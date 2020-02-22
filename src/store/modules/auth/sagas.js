import { Alert } from 'react-native';
import { takeLatest, call, put, all } from 'redux-saga/effects';

import api from '~/services/api';

import { signInSuccess, signFailure } from './actions';

export function* signIn({ payload }) {
  const { email, password } = payload;

  try {
    const response = yield call(api.post, '/sessions', {
      email,
      password,
    });

    const { token, user } = response.data;

    if (user.provider) {
      Alert.alert(
        'Erro no login',
        'O usuário não pode ser prestador de serviços.'
      );
      yield put(signFailure());
      return;
    }
    yield put(signInSuccess(token, user));

    api.defaults.headers.Authorization = `Bearer ${token}`;

    // history.push('/dashboard');
  } catch (error) {
    Alert.alert(
      'Falha na autenticação',
      'Houve um erro no login. Verifique seus dados.'
    );
    yield put(signFailure());
  }
}

export function* signUp({ payload }) {
  const { name, email, password } = payload;

  try {
    yield call(api.post, '/users', {
      name,
      email,
      password,
    });

    // history.push('/');
  } catch (error) {
    Alert.alert(
      'Falha no cadastro',
      'Houve um erro no cadastro. Verifique seus dados.'
    );
    yield put(signFailure());
  }
}

export function setToken({ payload }) {
  if (!payload) return;

  const { token } = payload.auth;
  api.defaults.headers.Authorization = `Bearer ${token}`;
}

export default all([
  takeLatest('persist/REHYDRATE', setToken),
  takeLatest('@auth/SIGN_IN_REQUEST', signIn),
  takeLatest('@auth/SIGN_UP_REQUEST', signUp),
]);