import bcrypt from 'bcrypt';

export default {
  Mutation: {
    addDoctor: async (
      parent,
      {speciality, password, ...userData},
      {models}
    ) => {
      const hashedPassword = await bcrypt.hash(password, 12);
      return {
        data: await models.Doctor.create(
          {
            speciality,
            user: {...userData, password: hashedPassword, role: 'doctor'},
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
    allDoctors: (parent, args, {models}) =>
      models.Doctor.findAll({
        include: [
          {
            model: models.User,
            as: 'user',
          },
        ],
      }),
  },
};
