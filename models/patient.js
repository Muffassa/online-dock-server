export default (sequelize, DataTypes) => {
  const Patient = sequelize.define(
    'patient',
    {
      name: {
        type: DataTypes.STRING,
      },
      password: DataTypes.STRING,
    },
    {underscored: true}
  );

  Patient.associate = (models) => {
    // 1:M
    Patient.belongsTo(models.Email, {
      foreignKey: {
        name: 'emailId',
        field: 'email_id',
      },
    });
  };
  return Patient;
};
