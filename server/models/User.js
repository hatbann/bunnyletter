const User = (Sequelize, DataTypes) => {
  return Sequelize.define(
    "user",
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      user_id: {
        type: DataTypes.STRING(45),
        allowNull: false,
      },
      user_pw: {
        type: DataTypes.STRING(45),
        allowNull: false,
      },
      user_nickname: {
        type: DataTypes.STRING(45),
        allowNull: false,
      },
    },
    {
      tableName: "user",
      freezeTableName: true,
      timestamps: false,
    }
  );
};

module.exports = User;
