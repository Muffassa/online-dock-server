export default {
  Mutation: {
    createMessage: async (parent, args, {models}) => {
      try {
        await models.Message.create(args);
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
  },
};
