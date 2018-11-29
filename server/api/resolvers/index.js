const { ApolloError } = require('apollo-server-express');
const jwt = require('jsonwebtoken');
const authMutations = require('./auth');

const { UploadScalar, DateScalar } = require('../custom-types');

module.exports = app => {
  return {
    // Upload: UploadScalar,
    // Date: DateScalar,

    Query: {
      viewer(parent, args, context, info) {
        if (context.token) {
          return jwt.decode(context.token, app.get('JWT_SECRET'));
        }
        return null;
      },
      async user(parent, { id }, { pgResource }, info) {
        try {
          const user = await pgResource.getUserById(id);
          return user;
        } catch (e) {
          throw new ApolloError(e);
        }
      },
      async items(parent, { filter }, { pgResource }, info) {
        try {
          const items = await pgResource.getItems(filter);
          return items;
        } catch (e) {
          throw new ApolloError(e);
        }
        // -------------------------------
      },
      async item(parent, { id }, { pgResource }) {
        try {
          const item = await pgResource.getItem(id);
          return item.rows[0];
        } catch (e) {
          throw new ApolloError(e);
        }
      },
      async tags(parent, { title }, { pgResource }, info) {
        try {
          const tags = await pgResource.getTags(title);
          return tags;
        } catch (e) {
          throw new ApolloError(e);
        }
      }
    },
    User: {
      async items(user, _, { pgResource }) {
        try {
          const items = await pgResource.getItemsForUser(user.id);
          return items;
        } catch (e) {
          throw new ApolloError(e);
        }
      },
      async borrowed(user, _, { pgResource }) {
        try {
          const userBorrowedItems = await pgResource.getBorrowedItemsForUser(
            user.id
          );
          return userBorrowedItems;
        } catch (e) {
          throw new ApolloError(e);
        }
      }
    },
    Item: {
      async owner(item, _, { pgResource }) {
        try {
          const itemUser = await pgResource.getUserById(item.ownerid);
          return itemUser;
        } catch (e) {
          throw new ApolloError(e);
        }
      },
      async tags(item, _, { pgResource }) {
        try {
          const itemTags = await pgResource.getTagsForItem(item.id);
          return itemTags;
        } catch (e) {
          throw new ApolloError(e);
        }
      },
      async borrower(user, _, { pgResource }) {
        try {
          const borrowerId = await pgResource.getUserById(user.borrowerid);
          return borrowerId;
        } catch (e) {
          throw new ApolloError(e);
        }
      }
    },
    // async imageurl({ imageurl, imageid, mimetype, data }) {
    //   if (imageurl) return imageurl;
    //   if (imageid) {
    //     return `data:${mimetype};base64, ${data}`;
    //   }
    // },

    Mutation: {
      ...authMutations(app),

      async addItem(parent, args, context, info) {
        image = await args.item.image;
        const user = await jwt.decode(context.token, app.get('JWT_SECRET'));
        const newItem = await context.pgResource.saveNewItem({
          item: args.item,
          image,
          user
          // tags: args.item.tags,
        });
        return newItem;
      },

      async borrowItem(parent, args, context, info) {
        try {
          const user = await jwt.decode(context.token, app.get('JWT_SECRET'));
          const borrowedItem = await context.pgResource.getBorrowedItemsForUser(
            {
              item: args.item,
              user
            }
          );
          return borrowedItem;
        } catch (e) {
          throw new ApolloError(e);
        }
      }
    }
  };
};
