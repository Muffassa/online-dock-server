import bcrypt from 'bcrypt';

export default {
  Mutation: {
    addDoctor: async (
      parent,
      {speciality, password, ...userData},
      {models}
    ) => {
      try {
        const hashedPassword = await bcrypt.hash(password, 12);
        return {
          ok: true,
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
      } catch (err) {
        return {
          ok: false,
          data: {},
          error: {
            message: err,
          },
        };
      }
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
