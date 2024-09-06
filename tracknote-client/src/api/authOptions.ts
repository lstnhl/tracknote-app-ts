import useAuthStore from 'stores/AuthStore';

export const options = () => {
  const token = useAuthStore.use.token();
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};
