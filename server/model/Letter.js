const Letter = (Sequelize, DataTypes) => {
  return Sequelize.define(
    'letter',
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      sender_id: {
        type: DataTypes.STRING(45),
        allowNull: false,
      },
      receiver_id: {
        type: DataTypes.STRING(45),
        allowNull: false,
      },
      img_url: {
        type: DataTypes.BLOB('long'),
        allowNull: false,
      },

      letter_context: {
        type: DataTypes.TEXT('long'),
        allowNull: false,
      },
      img_base64: {
        type: DataTypes.TEXT('long'),
        allowNull: true,
      },
      sender_nickname: {
        type: DataTypes.STRING(45),
        allowNull: false,
      },
      receiver_nickname: {
        type: DataTypes.STRING(45),
        allowNull: false,
      },
    },
    {
      tableName: 'letter',
      freezeTableName: true,
      timestamps: false,
    }
  );
};

module.exports = Letter;
