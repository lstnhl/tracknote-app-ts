import { BASE_URL } from 'api/axios';

export const getFile = (url: string) => {
  return `${BASE_URL}/static/${url}`;
};

export const getBackgroundImageUrl = (url = '') => {
  if (url) {
    return `url("${getFile(`cover/${url}`)}")`;
  } else {
    return 'url("https://rostov.muzprime.ru/upload/iblock/717/717481027b29647bc17ed3317cdcd923.jpg")';
  }
};
