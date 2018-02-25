import {Op} from 'sequelize';

export default {
  Mutation: {
    createMessage: async (parent, args, {models, user}) => {
      try {
        const message = await models.Message.create({
          senderId: user.id,
          ...args,
        });

        return {
          ok: true,
          ...message.dataValues,
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
          [Op.or]: [
            {
              [Op.and]: [{receiverId: user.id}, {senderId: receiverId}],
            },
            {
              [Op.and]: [{receiverId}, {senderId: user.id}],
            },
          ],
        },
        order: [['created_at', 'ASC']],
      }),
  },
};
