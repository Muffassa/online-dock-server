export default {
  Query: {
    getPatient: (parent, {id}, {models}) =>
      models.Patient.findOne({where: {id}}),
    allPatients: (parent, args, {models}) => models.Patient.findAll(),
  },
  Mutation: {
    createPatient: (parent, args, {models}) => models.Patient.create(args),
  },
};
