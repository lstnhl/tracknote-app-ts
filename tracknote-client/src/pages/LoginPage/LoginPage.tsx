import React, { useState } from 'react';
import Button from 'components/UI/Button';
import useAuthStore from 'stores/AuthStore';
import { useNavigate } from 'react-router-dom';
import Text from 'components/UI/Text';

const LoginPage = () => {
    const login = useAuthStore.use.login();
    const [form, setForm] = useState({
        username: {
          value: '',
          errorMessage: '',
        },
        password: {
          value: '',
          errorMessage: '',
        },
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({
            ...form,
            [e.target.name]: {
              value: e.target.value
            },
        });
    };

    const handleSubmit = () => {
      if (form.password.value.length < 6) {
        setForm({
          ...form,
          password: {
            ...form.password,
            errorMessage: 'Пароль не должен быть короче 6 символов'
          }
        });
        return;
      }


      login(form.username.value)
    };

    return (
        <>
            <h1>Вход</h1>
            <form>
                <Text
                    label="Имя"
                    errorMessage={form.username.errorMessage}
                    name="username"
                    onChange={handleChange}
                />
                <Text
                    label="Пароль"
                    errorMessage={form.password.errorMessage}
                    name="password"
                    type="password"
                    onChange={handleChange}
                />
            </form>
            <Button onClick={handleSubmit}>Войти</Button>
        </>
    );
};

export default LoginPage;
