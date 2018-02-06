export default {
  Query: {
    getDoctor: (parent, {id}, {models}) =>
      models.Doctor.findOne({where: {id}}),
    allDoctors: (parent, args, {models}) => models.Doctor.findAll(),
  },
  Mutation: {
    createDoctor: (parent, args, {models}) => models.Doctor.create(args),
  },
};
