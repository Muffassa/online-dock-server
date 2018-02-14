import bcrypt from 'bcrypt';
import {tryLogin} from '../auth';

export default {
  Query: {
    getDoctor: (parent, {id}, {models}) =>
      models.Doctor.findOne({where: {id}}),
    allDoctors: (parent, args, {models}) => models.Doctor.findAll(),
  },
  Mutation: {
    createDoctor: async (parent, {password, email, ...args}, {models}) => {
      try {
        const hashedPassword = await bcrypt.hash(password, 12);
        const {dataValues: {id}} = await models.Email.create({email});
        await models.Doctor.create({
          ...args,
          password: hashedPassword,
          emailId: id,
        });
        return true;
      } catch (err) {
        return false;
      }
    },
    login: async (parent, {email, password}, {models, SECRET, SECRET2}) =>
      tryLogin(email, password, models, SECRET, SECRET2),
  },
};
