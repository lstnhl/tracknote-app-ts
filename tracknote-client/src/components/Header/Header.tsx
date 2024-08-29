import { NavLink } from 'react-router-dom';
import s from './Header.module.scss';
import useAuthStore from 'stores/AuthStore';

const menu = [
  {
    id: 0,
    title: 'Мои альбомы',
    path: '/',
  },
  {
    id: 1,
    title: 'Треки',
    path: '/another',
  },
  {
    id: 2,
    title: 'Профиль',
    path: '/profile',
  },
];

const Header = () => {
  const isAuth = useAuthStore.use.isAuth();
  const username = useAuthStore.use.username();

  return (
    <div className={s.container}>
      <nav>
        <div className={s.left_side}>
          {isAuth &&
            menu.map((item) => (
              <NavLink
                key={item.id}
                className={({ isActive }) =>
                  isActive ? `${s.active} ${s.button}` : s.button
                }
                to={item.path}
              >
                <p>{item.title}</p>
              </NavLink>
            ))}
        </div>
        {!isAuth ? (
          <NavLink to="/login" className={s.right_side}>
            <p>Вход</p>
          </NavLink>
        ) : (
          <NavLink to="/profile" className={s.right_side}>
            <p>{username}</p>
            <img
              src="https://avavatar.ru/images/full/16/9SOEdMAK2IqC5zus.jpg"
              alt=""
            />
          </NavLink>
        )}
      </nav>
    </div>
  );
};

export default Header;
