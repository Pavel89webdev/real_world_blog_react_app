class RealWorldService {
  apiBase = 'https://conduit.productionready.io/api';

  async getResourse(url, options = null) {
    let result = null;
    try {
      const response = await fetch(url, options);
      if (response.status === 404) {
        throw new Error('Error code 404: There is no article on this URL :(');
      }
      result = await response.json();
      return result;
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log(e);
      throw new Error(e.message);
    }
  }

  async getArticles(offset = 0) {
    const url = `${this.apiBase}/articles?offset=${offset}`;
    const articles = await this.getResourse(url);
    return articles;
    // ?offset=0 - пропуск постов - нужно для пагинации
  }

  async getOneArticle(id) {
    const url = `${this.apiBase}/articles/${id}`;
    const article = await this.getResourse(url);
    return article;
  }

  async registerNewUser(userObj = { username: '', email: '', password: '' }, url = null) {
    if (!url) url = `${this.apiBase}/users`;

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ user: { ...userObj } }),
    };
    const newUser = await this.getResourse(url, options);
    return newUser;
  }

  async singIn(userObj = { email: '', password: '' }) {
    const url = `${this.apiBase}/users/login`;
    const user = await this.registerNewUser(userObj, url);
    console.log(user);

    return user;
  }
}

export default new RealWorldService();
