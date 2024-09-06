import { NavLink } from 'react-router-dom';
import s from './Header.module.scss';
import useAuthStore from 'stores/AuthStore';
import { getFile } from 'utils/getFile';

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
  }
];

const Header = () => {
  const isAuth = useAuthStore.use.isAuth();
  const username = useAuthStore.use.username();
  const avatar = useAuthStore.use.avatar();
  const logout = useAuthStore.use.logout();

  let avatarUrl;

  if (avatar) {
    avatarUrl = getFile(`/avatar/${avatar}`)
  } else {
    avatarUrl = 'https://cs13.pikabu.ru/avatars/3093/x3093804-265983935.png';
  }

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
          {isAuth && (
            <NavLink to="#" className={s.button} onClick={() => logout()}>
              <p>Выйти</p>
            </NavLink>
          )}
        </div>
        {!isAuth ? (
          <NavLink to="/login" className={s.right_side}>
            <p>Вход</p>
          </NavLink>
        ) : (
          <>
            <NavLink to="/profile" className={s.right_side}>
              <p>{username}</p>
              <img
                src={avatarUrl}
                alt=""
              />
            </NavLink>
          </>
        )}
      </nav>
    </div>
  );
};

export default Header;
