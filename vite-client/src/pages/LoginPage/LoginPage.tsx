import { useEffect } from 'react';
import Button from 'components/UI/Button';
import useAuthStore from 'stores/AuthStore';
import { useNavigate } from 'react-router-dom';
import Text from 'components/UI/Text';
import useForm from 'utils/useForm';

const formData = [
    {
        name: 'username',
        label: 'Имя',
        hidden: false,
        validators: {
            notNull: true,
            minLength: 4,
            maxLength: 12,
        },
    },
    {
        name: 'password',
        label: 'Пароль',
        hidden: true,
        validators: {
            notNull: true,
            minLength: 6,
            maxLength: 12,
        },
    },
];

const LoginPage = () => {
    const login = useAuthStore.use.login();
    const isAuth = useAuthStore.use.isAuth();
    const { data, changeValue, validate } = useForm(formData);
    const navigate = useNavigate();

    const onError = (message: string) => {
        alert(message);
    };

    const onSuccess = () => {
        navigate('/');
    };

    useEffect(() => {
        // Перенаправляем на главную страницу, если пользователь уже авторизован
        if (isAuth) {
            navigate('/', { replace: true });
        }
    }, [isAuth, navigate]);
    
    if (isAuth) {
        return null;
    }

    return (
        <>
            <h1>Вход</h1>
            <form>
                {data.map((el, index) => (
                    <Text
                        key={index}
                        label={el.label}
                        errorMessage={el.errorMessage}
                        name={el.name}
                        onChange={changeValue}
                        value={el.value}
                        type={el.hidden ? 'password' : 'text'}
                    />
                ))}
            </form>
            <Button
                onClick={() =>
                    validate(() => {
                        login(data[0].value, data[1].value, onError, onSuccess);
                    })
                }
            >
                Войти
            </Button>
        </>
    );
};

export default LoginPage;
