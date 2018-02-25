import {Op} from 'sequelize';

export default {
  Mutation: {
    createMessage: async (parent, args, {models, user}) => {
      try {
        await models.Message.create({senderId: user.id, ...args});
        return {
          ok: true,
          error: null,
        };
      } catch (err) {
        return {
          ok: false,
          error: {
            message: err,
          },
        };
      }
    },
  },

  Query: {
    allMessages: async (parent, args, {models}) =>
      models.Message.findAll({
        include: [
          {
            model: models.User,
            as: 'sender',
          },
          {
            model: models.User,
            as: 'receiver',
          },
        ],
      }),
    dialog: (parent, {receiverId}, {models, user}) =>
      models.Message.findAll({
        where: {
          receiverId: {[Op.or]: [user.id, receiverId]},
          senderId: {[Op.or]: [user.id, receiverId]},
        },
        order: [['created_at', 'ASC']],
      }),
  },
};
