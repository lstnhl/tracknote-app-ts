import { NavLink } from 'react-router-dom';
import s from './Header.module.scss';
import useAuthStore from 'stores/AuthStore';
import { getFile } from 'utils/getFile';

const menu = [
  {
    id: 0,
    title: 'Альбомы',
    path: '/',
  },
  {
    id: 1,
    title: 'Заметки',
    path: '/notes',
  },
  {
    id: 2,
    title: 'Треки',
    path: '/tracks',
  },
];

const Header = () => {
  const isAuth = useAuthStore.use.isAuth();
  const username = useAuthStore.use.username();
  const avatar = useAuthStore.use.avatar();
  const logout = useAuthStore.use.logout();

  const avatarUrl = () => {
    if (avatar) {
      return getFile(`/avatar/${avatar}`);
    } else {
      return '';
    }
  };

  const leftSide = () => {
    return (
      <>
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
      </>
    );
  };

  const rightSide = () => {
    return (
      <>
        {!isAuth ? (
          <NavLink to="/login" className={s.right_side}>
            <p>Вход</p>
          </NavLink>
        ) : (
          <>
            <NavLink to="/profile" className={s.right_side}>
              <p>{username}</p>
              <img src={avatarUrl()} alt="" />
            </NavLink>
          </>
        )}
      </>
    );
  };

  return (
    <div className={s.container}>
      <nav>
        <div className={s.left_side}>{leftSide()}</div>
        {rightSide()}
      </nav>
    </div>
  );
};

export default Header;
