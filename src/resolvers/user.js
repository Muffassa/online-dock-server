import {tryLogin} from '../auth';

export default {
  Query: {
    allUsers: (parent, args, {models}) => models.User.findAll(),
  },
  Mutation: {
    login: (parent, {password, email}, {models, SECRET, SECRET2}) =>
      tryLogin(email, password, models, SECRET, SECRET2),
  },
};
