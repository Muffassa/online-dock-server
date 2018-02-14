import bcrypt from 'bcrypt';
export default {
  Query: {
    getPatient: (parent, {id}, {models}) =>
      models.Patient.findOne({where: {id}}),
    allPatients: (parent, args, {models}) => models.Patient.findAll(),
  },
  Mutation: {
    createPatient: async (parent, {email, password, ...args}, {models}) => {
      const {id} = await models.Email.create({email});
      const hashedPassword = await bcrypt.hash(password, 12);
      console.log('ID', id);
      return await models.Patient.create({
        emailId: id,
        password: hashedPassword,
        ...args,
      });
    },
  },
};
