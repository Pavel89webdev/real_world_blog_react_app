import { getUsernameFromLocaleSorage } from '../../helpers/localStorageForUser/localStorageForUser';

import { apiBase, getResourse } from './apiConstants';

export default class ArticleService {
  static apiBase = apiBase;

  static getResourse(...args) {
    return getResourse(...args);
  }

  static async getArticles(offset = 0, author = false) {
    let url = `${this.apiBase}/articles?offset=${offset}`;
    if (author) {
      url += `&author=${author}`;
    }
    const articles = await this.getResourse(url);
    return articles;
  }

  static async getOneArticle(id) {
    const url = `${this.apiBase}/articles/${id}`;
    const article = await this.getResourse(url);
    return article;
  }

  static async createArticle(articleObj = {}, url = null, method = null) {
    if (url === null) url = `${this.apiBase}/articles`;
    if (method === null) method = 'POST';
    const body = JSON.stringify({ article: { ...articleObj } });
    const newArticle = await this.getResourse(url, method, body);
    return newArticle;
  }

  static async updateArticle(articleObj = {}, id) {
    const url = `${this.apiBase}/articles/${id}`;

    const newArticle = await this.createArticle(articleObj, url, 'PUT');
    return newArticle;
  }

  static async deleteArticle(id) {
    const url = `${this.apiBase}/articles/${id}`;

    const response = await this.getResourse(url, 'DELETE');
    return response;
  }

  static async likeArticle(id, unLike = false) {
    const url = `${this.apiBase}/articles/${id}/favorite`;
    const method = unLike ? 'DELETE' : 'POST';
    const article = await this.getResourse(url, method);
    return article;
  }

  static unLikeArticle(id) {
    return this.likeArticle(id, true);
  }

  static async getMyArticles(offset) {
    const usernameFromLocaleStorage = getUsernameFromLocaleSorage();
    let result = { articles: [] };
    if (usernameFromLocaleStorage) {
      result = await this.getArticles(offset, usernameFromLocaleStorage);
    }
    return result;
  }
}
