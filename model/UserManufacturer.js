const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class UserManufacturer extends Model {

}

UserManufacturer.init(
  {
    manufacturer_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    user_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: {
        model: 'user',
        key: 'id'
      }
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'usermanufacturer',
  }
);

module.exports = UserManufacturer;