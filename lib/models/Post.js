const pool = require('../utils/pool');

module.exports = class Post {
  id;
  user_id;
  description;

  constructor(row) {
    this.id = row.id;
    this.user_id = row.user_id;
    this.description = row.description;
  }

  static async getAll() {
    const { rows } = pool.query('SELECT * FROM posts');
    return new Post(rows[0]);
  }

};
