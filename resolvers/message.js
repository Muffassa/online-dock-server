import {Op} from 'sequelize';
import {PubSub, withFilter} from 'graphql-subscriptions';

const pubsub = new PubSub();
const NEW_MESSAGE = 'NEW_MESSAGE';

export default {
  Subscription: {
    newMessage: {
      subscribe: withFilter(
        () => pubsub.asyncIterator(NEW_MESSAGE),
        (payload, args, context) => {
          // TODO: Придумать как получать user не из payload а из контекста
          const isSendingMessage =
            (payload.senderId === args.senderId &&
              payload.receiverId === args.receiverId) ||
            (payload.senderId === args.receiverId &&
              payload.receiverId === args.senderId);
          return isSendingMessage;
        }
      ),
    },
  },
  Mutation: {
    createMessage: async (parent, args, {models, user}) => {
      try {
        const message = await models.Message.create({
          senderId: user.id,
          ...args,
        });

        try {
          pubsub.publish(NEW_MESSAGE, {
            newMessage: message.dataValues,
            receiverId: message.dataValues.receiverId,
            senderId: message.dataValues.senderId,
          });
        } catch (e) {
          console.log(e);
        }
        console.log('sended');
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
