import bcrypt from 'bcrypt';

export default {
  Mutation: {
    addPatient: async (parent, {age, password, ...userData}, {models}) => {
      const hashedPassword = await bcrypt.hash(password, 12);
      return {
        data: await models.Patient.create(
          {
            age,
            user: {...userData, password: hashedPassword, role: 'patient'},
          },
          {
            include: [
              {
                model: models.User,
                as: 'user',
              },
            ],
          }
        ),
        error: {
          message: '',
        },
      };
    },
  },
  Query: {
    allPatients: (parent, args, {models}) =>
      models.Patient.findAll({
        include: [
          {
            model: models.User,
            as: 'user',
          },
        ],
      }),
  },
};
