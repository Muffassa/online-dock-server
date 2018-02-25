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
    dialog: (parent, {patientId, doctorId}, {models}) =>
      models.Message.findAll({
        where: {
          receiverId: {[Op.or]: [patientId, doctorId]},
          senderId: {[Op.or]: [patientId, doctorId]},
        },
        order: [['created_at', 'ASC']],
      }),
  },
};
