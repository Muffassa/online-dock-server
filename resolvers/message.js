export default {
  Query: {
    getMessage: (parent, {id}, {models}) =>
      models.Message.findOne({where: {id}}),
    allMessages: (parent, args, {models}) => models.Message.findAll(),
  },
  Mutation: {
    createMessage: (parent, args, {models}) => models.Message.create(args),
  },
};
