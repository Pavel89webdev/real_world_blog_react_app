import {
  setTokenToLocaleStorage,
  setUsernameToLocaleStorage,
} from '../../helpers/localStorageForUser/localStorageForUser';

import { apiBase, getResourse } from './apiConstants';

// все еще вопрос если я пользуюсь только статическими методами и делаю экземпляров - может лучше сделать это объектом??

export default class UserService {
  static apiBase = apiBase;

  static getResourse(...args) {
    return getResourse(...args);
  }

  static async registerNewUser(
    userObj = { username: '', email: '', password: '' }
  ) {
    const url = `${this.apiBase}/users`;
    const body = JSON.stringify({ user: { ...userObj } });

    const newUser = await this.getResourse(url, 'POST', body);

    if (newUser.errors === undefined) {
      const { token, username } = newUser.user;
      setTokenToLocaleStorage(token);
      setUsernameToLocaleStorage(username);
    }

    return newUser;
  }

  static async getUser() {
    const url = `${this.apiBase}/user`;
    const user = await this.getResourse(url);
    return user;
  }

  static async singIn(userObj = { email: '', password: '' }) {
    const url = `${this.apiBase}/users/login`;
    const body = JSON.stringify({ user: { ...userObj } });
    const user = await this.getResourse(url, 'POST', body);

    if (user.errors === undefined) {
      const { token, username } = user.user;
      setTokenToLocaleStorage(token);
      setUsernameToLocaleStorage(username);
    }
    return user;
  }

  static async updateUser(userObj = {}) {
    const url = `${this.apiBase}/user`;
    const body = JSON.stringify({ user: { ...userObj } });
    const newUser = await this.getResourse(url, 'PUT', body);
    return newUser;
  }
}
