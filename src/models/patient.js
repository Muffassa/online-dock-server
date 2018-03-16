export default (sequelize, DataTypes) => {
  const Patient = sequelize.define(
    'patient',
    {
      age: {
        type: DataTypes.INTEGER,
      },
    },
    {underscored: true}
  );

  Patient.associate = (models) => {
    // 1:M
    Patient.belongsTo(models.User, {
      foreignKey: {
        name: 'userId',
        field: 'user_id',
      },
    });
  };
  return Patient;
};
