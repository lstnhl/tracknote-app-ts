import React from 'react';
import authStore from 'stores';
import { observer } from 'mobx-react-lite';
import Button from 'components/UI/Button';

const LoginPage = observer(() => {
  return (
    <>
      <h1>Login page</h1>
      <Button onClick={() => authStore.toggleAuth()}>Hello</Button>
    </>
  );
});

export default LoginPage;
