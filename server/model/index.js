const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];
console.log(config);

const db = {};

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.sequelize
  .authenticate()
  .then(() => {
    console.log('데이터베이스 연결 성공');
  })
  .catch((err) => {
    console.log('데이터 베이스 연결 오류 ', err);
  });

db.User = require('./User')(sequelize, Sequelize);
db.Letter = require('./Letter')(sequelize, Sequelize);

//후에 데이터베이스 관계 설정하기

// LETTER - 외래키 참조 => SENDER_ID - USER_ID
db.User.hasMany(db.Letter, {
  foreignKey: 'sender_id',
  sourceKey: 'user_id',
  onDelete: 'cascade',
  onUpdate: 'cascade',
});

db.Letter.belongsTo(db.User, {
  foreignKey: 'sender_id',
  sourceKey: 'user_id',
  onDelete: 'cascade',
  onUpdate: 'cascade',
});

module.exports = db;
