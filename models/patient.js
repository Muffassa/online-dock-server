export default (sequelize, DataTypes) => {
  const Patient = sequelize.define(
    'patient',
    {
      name: {
        type: DataTypes.STRING,
      },
      email: {
        type: DataTypes.STRING,
        unique: true,
      },
      password: DataTypes.STRING,
    },
    {underscored: true}
  );
  return Patient;
};
