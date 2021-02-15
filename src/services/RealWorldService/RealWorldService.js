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
}

export default new RealWorldService();
