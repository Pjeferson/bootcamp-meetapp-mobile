import React from 'react';

import createRouter from './createRouter';

export default function Routes() {
  const signed = false;

  const Router = createRouter(signed);

  return <Router />;
}
