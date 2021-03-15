import {
  setTokenToLocaleStorage,
  setUsernameToLocaleStorage,
  getUsernameFromLocaleSorage,
  getTokenFromLocaleStorage,
} from '../../helpers/localStorageForUser/localStorageForUser';

class RealWorldService {
  apiBase = 'https://conduit.productionready.io/api';

  async getResourse(url, options = null) {
    let result = null;

    const token = getTokenFromLocaleStorage();
    if (!options && token) {
      options = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${token}`,
        },
      };
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
  }

  async getArticles(offset = 0, author = false) {
    let url = `${this.apiBase}/articles?offset=${offset}`;
    const token = getTokenFromLocaleStorage();
    if (author) {
      url += `&author=${author}`;
    }
    let options = null;
    if (token) {
      options = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${token}`,
        },
      };
    }
    try {
      const articles = await this.getResourse(url, options);
      return articles;
    } catch (e) {
      const articles = await this.getResourse(url);
      return articles;
    }
  }

  async getOneArticle(id) {
    const url = `${this.apiBase}/articles/${id}`;
    const article = await this.getResourse(url);
    return article;
  }

  async registerNewUser(
    userObj = { username: '', email: '', password: '' },
    url = null
  ) {
    if (!url) url = `${this.apiBase}/users`;

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ user: { ...userObj } }),
    };
    const newUser = await this.getResourse(url, options);

    if (newUser.errors === undefined) {
      const { token, username } = newUser.user;
      setTokenToLocaleStorage(token);
      setUsernameToLocaleStorage(username);
    }

    return newUser;
  }

  async getUser() {
    const url = `${this.apiBase}/user`;
    const token = getTokenFromLocaleStorage();
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${token}`,
      },
    };
    const user = await this.getResourse(url, options);
    return user;
  }

  async singIn(userObj = { email: '', password: '' }) {
    const tokenFromLocaleStorage = getTokenFromLocaleStorage();

    if (tokenFromLocaleStorage) {
      const user = await this.getUser();
      const { username } = user.user;
      setUsernameToLocaleStorage(username);
      return user;
    }

    const url = `${this.apiBase}/users/login`;
    const user = await this.registerNewUser(userObj, url);

    if (user.errors === undefined) {
      const { token, username } = user.user;
      setTokenToLocaleStorage(token);
      setUsernameToLocaleStorage(username);
    }
    return user;
  }

  async updateUser(userObj = {}) {
    const url = `${this.apiBase}/user`;
    const body = JSON.stringify({ user: { ...userObj } });
    const token = getTokenFromLocaleStorage();
    const options = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${token}`,
      },
      body,
    };
    const newUser = await this.getResourse(url, options);
    return newUser;
  }

  async createArticle(articleObj = {}, url = null, method = null) {
    if (url === null) url = `${this.apiBase}/articles`;
    const body = JSON.stringify({ article: { ...articleObj } });
    const token = getTokenFromLocaleStorage();
    const options = {
      method: method || 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${token}`,
      },
      body,
    };
    const newArticle = await this.getResourse(url, options);
    return newArticle;
  }

  async updateArticle(articleObj = {}, id) {
    const url = `${this.apiBase}/articles/${id}`;

    const newArticle = await this.createArticle(articleObj, url, 'PUT');
    return newArticle;
  }

  async deleteArticle(id) {
    const url = `${this.apiBase}/articles/${id}`;
    const token = getTokenFromLocaleStorage();
    const options = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${token}`,
      },
    };

    const response = await this.getResourse(url, options);
    return response;
  }

  async likeArticle(id, unLike = false) {
    const url = `${this.apiBase}/articles/${id}/favorite`;
    const token = getTokenFromLocaleStorage();
    const options = {
      method: unLike ? 'DELETE' : 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${token}`,
      },
    };
    const article = await this.getResourse(url, options);
    return article;
  }

  unLikeArticle(id) {
    return this.likeArticle(id, true);
  }

  async getMyArticles(offset) {
    const usernameFromLocaleStorage = getUsernameFromLocaleSorage();
    let result = { articles: [] };
    if (usernameFromLocaleStorage) {
      result = await this.getArticles(offset, usernameFromLocaleStorage);
    }
    return result;
  }
}

export default new RealWorldService();
