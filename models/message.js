export default (sequelize, DataTypes) => {
  const Message = sequelize.define(
    'message',
    {
      text: DataTypes.STRING,
    },
    {underscored: true}
  );

  Message.associate = (models) => {
    // 1:M
    Message.belongsTo(models.User, {
      foreignKey: {
        name: 'senderId',
        field: 'sender_id',
      },
      as: 'sender',
    });
    Message.belongsTo(models.User, {
      foreignKey: {
        name: 'receiverId',
        field: 'receiver_id',
      },
      as: 'receiver',
    });
  };

  return Message;
};
