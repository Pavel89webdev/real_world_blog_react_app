import {
  setTokenToLocaleStorage,
  setUsernameToLocaleStorage,
  getTokenFromLocaleStorage,
} from '../../helpers/localStorageForUser/localStorageForUser';

const apiBase = 'https://conduit.productionready.io/api';

const getResourse = async (url, method = 'GET', body = null) => {
  let result = null;
  const options = {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const token = getTokenFromLocaleStorage();
  if (token) {
    options.headers.Authorization = `Token ${token}`;
  }

  if (body && method !== 'GET') {
    options.body = body;
  }

  try {
    const response = await fetch(url, options);
    if (response.status === 404) {
      throw new Error('Error code 404: There is no article on this URL :(');
    }
    if (response.status === 401) {
      setTokenToLocaleStorage('');
      setUsernameToLocaleStorage('');
      throw new Error('Error code 401: Problems with authorization');
    }
    result = await response.json();
    return result;
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log(e);
    throw new Error(e.message);
  }
};

export { apiBase, getResourse };
