import bcrypt from 'bcrypt';
import {tryLogin} from '../auth';

export default {
  Query: {
    allUsers: (parent, args, {models}) => models.User.findAll(),
  },
  Mutation: {
    register: async (parent, {password, ...args}, {models}) => {
      try {
        const hashedPassword = await bcrypt.hash(password, 12);
        return {
          data: await models.User.create({password: hashedPassword, ...args}),
          errors: [],
        };
      } catch (err) {
        return {
          data: null,
          errors: err,
        };
      }
    },
    login: (parent, {password, email}, {models, SECRET, SECRET2}) =>
      tryLogin(email, password, models, SECRET, SECRET2),
  },
};
