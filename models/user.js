export default (sequelize, DataTypes) => {
  const User = sequelize.define(
    'user',
    {
      email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
      },
      role: {
        type: DataTypes.ENUM({values: ['doctor', 'patient']}),
      },
    },
    {underscored: true}
  );

  User.associate = (models) => {
    // 1:M
    User.hasOne(models.Doctor, {
      foreignKey: {
        name: 'userId',
        field: 'user_id',
      },
    });

    User.hasOne(models.Patient, {
      foreignKey: {
        name: 'userId',
        field: 'user_id',
      },
    });
  };

  return User;
};
