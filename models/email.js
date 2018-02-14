export default (sequelize, DataTypes) => {
  const Message = sequelize.define(
    'email',
    {
      email: {type: DataTypes.STRING, unique: true, allowNull: false},
    },
    {underscored: true}
  );

  return Message;
};
