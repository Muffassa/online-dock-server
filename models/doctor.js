export default (sequelize, DataTypes) => {
  const Doctor = sequelize.define(
    'doctor',
    {
      speciality: {
        type: DataTypes.STRING,
        unique: true,
      },
    },
    {underscored: true}
  );

  Doctor.associate = (models) => {
    // 1:M
    Doctor.belongsTo(models.User, {
      foreignKey: {
        name: 'userId',
        field: 'user_id',
      },
    });
  };

  return Doctor;
};
