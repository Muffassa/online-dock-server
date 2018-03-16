import Sequelize from 'sequelize';

console.log(process.env.DB_HOST);
const sequelize = new Sequelize('doctor', 'doctor', 'doctor', {
  dialect: 'postgres',
  operatorsAliases: Sequelize.Op,
  host: process.env.DB_HOST || '221',
  define: {
    underscored: true,
  },
});

const models = {
  Doctor: sequelize.import('./doctor'),
  Patient: sequelize.import('./patient'),
  Message: sequelize.import('./message'),
  User: sequelize.import('./user'),
};

Object.keys(models).forEach((modelName) => {
  if ('associate' in models[modelName]) {
    models[modelName].associate(models);
  }
});

models.sequelize = sequelize;
models.Sequelize = Sequelize;

export default models;
