const strs = require('stringstream');

function tagsQueryString(tags, itemid, result) {
  /**
   * Challenge:
   * This function is recursive, and a little complicated.
   * Can you refactor it to be simpler / more readable?
   */
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
    async createUser({ fullname, email, password }) {
      const newUserInsert = {
        text:
          'INSERT INTO users (fullname, email, password) VALUES ($1, $2, $3) RETURNING *',
        values: [fullname, email, password]
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
      }; // @TODO: Authentication - Server
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
        text: `SELECT * FROM users WHERE users.id = $1`,
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
      try {
        const items = await postgres.query({
          text: `SELECT *
        FROM items          
        WHERE ownerid <> $1 AND borrowerid <> $1 OR borrowerid IS NULL`,
          values: filter ? [filter] : []
        });
        return items.rows;
      } catch (error) {
        throw error;
      }
    },
    async getItemsForUser(id) {
      const items = await postgres.query({
        text: `SELECT *
        FROM items WHERE ownerid = $1`,
        values: [id]
      });
      return items.rows;
    },
    async getBorrowedItemsForUser(id) {
      const items = await postgres.query({
        text: `SELECT * FROM items WHERE items.borrowerid = $1;`,
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
    async saveNewItem({ item, user }) {
      return new Promise((resolve, reject) => {
        /**
         * Begin transaction by opening a long-lived connection
         * to a client from the client pool.
         */
        postgres.connect((err, client, done) => {
          try {
            // Begin postgres transaction
            client.query('BEGIN', async err => {
              const { title, description, tags, id } = item;
              const itemQuery = {
                text:
                  'INSERT INTO items (title, description, ownerid) VALUES ($1, $2, $3) RETURNING *',
                values: [title, description, user.id]
              };
              const newItem = await client.query(itemQuery);
              return newItem.rows;
              // const tagsQuery = {
              //   text:
              //     'INSERT INTO itemtags (itemid, tagid) VALUES ($1, $2) RETURNING *',
              //   values: [id, tags]
              // };
              // return tagsQuery.rows;
              // Convert image (file stream) to Base64
              // const imageStream = image.stream.pipe(strs('base64'));

              // let base64Str = '';
              // imageStream.on('data', data => {
              //   base64Str += data;
              // });

              // imageStream.on('end', async () => {
              //   // Image has been converted, begin saving things
              //   const { title, description, tags } = item;

              //   // Generate new Item query
              // @TODO
              // -------------------------------

              // Insert new Item
              // @TODO
              // -------------------------------

              // const imageUploadQuery = {
              //   text:
              //     'INSERT INTO uploads (itemid, filename, mimetype, encoding, data) VALUES ($1, $2, $3, $4, $5) RETURNING *',
              //   values: [
              //     // itemid,
              //     image.filename,
              //     image.mimetype,
              //     'base64',
              //     base64Str
              //   ]
              // };

              // Upload image
              // const uploadedImage = await client.query(imageUploadQuery);
              // const imageid = uploadedImage.rows[0].id;

              // Generate image relation query
              // @TODO
              // -------------------------------

              // Insert image
              // @TODO
              // -------------------------------

              // Generate tag relationships query (use the'tagsQueryString' helper function provided)
              // @TODO
              // -------------------------------

              // Insert tags
              // @TODO
              // -------------------------------

              // Commit the entire transaction!
              client.query('COMMIT', err => {
                if (err) {
                  throw err;
                }
                // release the client back to the pool
                done();
                resolve(newItem.rows[0]);
              });
            });
          } catch (e) {
            // Something went wrong
            client.query('ROLLBACK', err => {
              if (err) {
                throw err;
              }
              // release the client back to the pool
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
