import Sequelize from 'sequelize';

const sequelize = new Sequelize('doctor', 'doctor', 'doctor', {
  dialect: 'postgres',
  operatorsAliases: Sequelize.Op,
  define: {
    underscored: true,
  },
});

const models = {
  Doctor: sequelize.import('./doctor'),
  Patient: sequelize.import('./patient'),
  Message: sequelize.import('./message'),
  Email: sequelize.import('./email'),
};

Object.keys(models).forEach((modelName) => {
  if ('associate' in models[modelName]) {
    models[modelName].associate(models);
  }
});

models.sequelize = sequelize;
models.Sequelize = Sequelize;

export default models;
