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
    const { data, changeValue, validate } = useForm(formData);
    const navigate = useNavigate();

    const onError = (message: string) => {
        alert(message)
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
                        login(data[0].value, data[1].value, onError);
                        navigate('/');
                    })
                }
            >
                Войти
            </Button>
        </>
    );
};

export default LoginPage;
