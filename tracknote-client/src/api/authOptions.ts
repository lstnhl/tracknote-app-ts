import useAuthStore from 'stores/AuthStore';

export const options = () => {
  const token = useAuthStore.getState().token;
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};
