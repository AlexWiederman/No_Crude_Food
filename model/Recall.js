const { Model, DataTypes } = require('sequelize')
const sequelize = require('../config/connection')

class Recall extends Model {}

Recall.init(
  {
    recalling_firm: {
      type: DataTypes.STRING
    },
    recall_number: {
      type: DataTypes.STRING,
      primaryKey: true
    },
    product_description: {
      type: DataTypes.STRING
    },
    reason_for_recall: {
      type: DataTypes.STRING
    },
    date_created: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    },
    comment: {
      type: DataTypes.STRING
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id'
      },
      primaryKey: true
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'recall'
  }
)

module.exports = Recall
