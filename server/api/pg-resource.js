const strs = require('stringstream');

function tagsQueryString(tags, itemid, result) {
  const length = tags.length;
  return length === 0
    ? `${result};`
    : tags.shift() &&
        tagsQueryString(
          tags,
          itemid,
          `${result}($${tags.length + 1}, ${itemid})${length === 1 ? '' : ','}`
        );
}

module.exports = postgres => {
  return {
    async createUser({ fullname, email, bio, password }) {
      const newUserInsert = {
        text:
          'INSERT INTO users (fullname, email, bio, password) VALUES ($1, $2, $3, $4) RETURNING *',
        values: [fullname, email, bio, password]
      };
      try {
        const user = await postgres.query(newUserInsert);
        return user.rows[0];
      } catch (e) {
        switch (true) {
          case /users_fullname_key/.test(e.message):
            throw 'An account with this username already exists.';
          case /users_email_key/.test(e.message):
            throw 'An account with this email already exists.';
          default:
            throw 'There is a problem on creating new User';
        }
      }
    },
    async getUserAndPasswordForVerification(email) {
      const findUserQuery = {
        text: `SELECT * FROM users WHERE users.email = $1`,
        values: [email]
      };
      try {
        const user = await postgres.query(findUserQuery);
        if (!user) throw 'User was not found.';
        return user.rows[0];
      } catch (e) {
        throw 'User was not found.';
      }
    },
    async getUserById(id) {
      const findUserQuery = {
        text: `SELECT id, email, fullname, bio FROM users WHERE users.id = $1`,
        values: [id]
      };

      try {
        const user = await postgres.query(findUserQuery);
        return user.rows[0];
      } catch (e) {
        throw 'User was not found';
      }
    },
    async getItems(filter) {
      let text = `SELECT items.id, items.title, items.description, items.ownerid, items.borrowerid, items.timedate, uploads.data AS imageurl FROM items
      INNER JOIN uploads ON uploads.itemid = items.id ORDER BY items.timedate DESC`;
      if (filter) {
        text = `SELECT items.id, items.title, items.description, items.ownerid, items.borrowerid, items.timedate, uploads.data AS imageurl FROM items
         INNER JOIN uploads ON uploads.itemid = items.id WHERE ownerid <> $1 AND borrowerid IS NULL ORDER BY items.timedate DESC`;
      }
      try {
        const items = await postgres.query({
          text: text,
          values: filter ? [filter] : []
        });
        return items.rows;
      } catch (error) {
        throw error;
      }
    },

    async getItemsForUser(id) {
      const items = await postgres.query({
        text: `SELECT items.id, items.title, items.description, items.ownerid, items.borrowerid, items.timedate, uploads.data AS imageurl FROM items
        INNER JOIN uploads ON uploads.itemid = items.id WHERE ownerid = $1 ORDER BY items.timedate DESC`,
        values: [id]
      });
      return items.rows;
    },
    async getBorrowedItemsForUser(id) {
      const items = await postgres.query({
        text: `SELECT items.id, items.title, items.description, items.ownerid, items.borrowerid, items.timedate, uploads.data AS imageurl FROM items
        INNER JOIN uploads ON uploads.itemid = items.id WHERE borrowerid = $1 ORDER BY items.timedate DESC`,
        values: [id]
      });
      return items.rows;
    },
    async getTags() {
      const tags = await postgres.query(`SELECT * FROM tags`);
      return tags.rows;
    },
    async getTagsForItem(id) {
      const tagsQuery = {
        text: `SELECT tags.title, tags.id FROM tags
        JOIN itemtags
        ON itemtags.tagid = tags.id
        JOIN items
        ON itemtags.itemid = items.id
        WHERE items.id = $1`,
        values: [id]
      };

      const tags = await postgres.query(tagsQuery);
      return tags.rows;
    },
    async saveNewItem({ item, image, user }) {
      return new Promise((resolve, reject) => {
        postgres.connect((err, client, done) => {
          try {
            client.query('BEGIN', async err => {
              const imageStream = image.stream.pipe(strs('base64'));

              let base64Str = 'data:image/*;base64,';
              imageStream.on('data', data => {
                base64Str += data;
              });

              imageStream.on('end', async () => {
                const { title, description, tags } = item;
                const itemQuery = {
                  text:
                    'INSERT INTO items (title, description, ownerid) VALUES ($1, $2, $3) RETURNING *',
                  values: [title, description, user.id]
                };

                const newItem = await client.query(itemQuery);
                const itemId = newItem.rows[0].id;

                const imageUploadQuery = {
                  text:
                    'INSERT INTO uploads (itemid, filename, mimetype, encoding, data) VALUES ($1, $2, $3, $4, $5) RETURNING *',
                  values: [
                    itemId,
                    image.filename,
                    image.mimetype,
                    'base64',
                    base64Str
                  ]
                };

                await client.query(imageUploadQuery);

                const tagsQuery = {
                  text: `INSERT INTO itemtags (tagid, itemid) VALUES ${tagsQueryString(
                    [...tags],
                    itemId,
                    ''
                  )}`,
                  values: tags.map(tag => tag.id)
                };
                await client.query(tagsQuery);

                client.query('COMMIT', err => {
                  if (err) {
                    throw err;
                  }
                  done();
                  resolve(newItem.rows[0]);
                });
              });
            });
          } catch (e) {
            client.query('ROLLBACK', err => {
              if (err) {
                throw err;
              }
              done();
            });
            switch (true) {
              case /uploads_itemid_key/.test(e.message):
                throw 'This item already has an image.';
              default:
                throw e;
            }
          }
        });
      });
    }
  };
};
