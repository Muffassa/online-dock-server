import bcrypt from 'bcrypt';

export default {
  Query: {
    getDoctor: (parent, {id}, {models}) =>
      models.Doctor.findOne({where: {id}}),
    allDoctors: (parent, args, {models}) => models.Doctor.findAll(),
  },
  Mutation: {
    createDoctor: async (parent, {password, ...args}, {models}) => {
      try {
        const hashedPassword = await bcrypt.hash(password, 12);
        await models.Doctor.create({...args, password: hashedPassword});
        return true;
      } catch (err) {
        return false;
      }
    },
  },
};
