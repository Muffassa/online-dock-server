export default (sequelize, DataTypes) => {
  const Doctor = sequelize.define(
    'doctor',
    {
      name: {
        type: DataTypes.STRING,
      },
      familyName: {
        type: DataTypes.STRING,
      },
      patronymic: {
        type: DataTypes.STRING,
      },
      speciality: {
        type: DataTypes.STRING,
        unique: true,
      },
      email: {
        type: DataTypes.STRING,
        unique: true,
      },
      password: DataTypes.STRING,
    },
    {underscored: true}
  );
  return Doctor;
};
