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
    Message.belongsTo(models.Doctor, {
      foreignKey: {
        name: 'doctorId',
        field: 'doctor_id',
      },
    });
    Message.belongsTo(models.Patient, {
      foreignKey: {
        name: 'patientId',
        field: 'patient_id',
      },
    });
  };

  return Message;
};
