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

  static async insert({ description, user_id }) {
    const { rows } = await pool.query(
      `
        INSERT INTO posts (description, user_id)
        VALUES ($1, $2)
        RETURNING *`, [description, user_id]
    );

    return new Post(rows[0]);
  }

};
