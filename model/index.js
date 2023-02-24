const Recall = require('./Recall')
const UserManufacturer = require('./UserManufacturer')
const User = require('./User')

User.hasMany(UserManufacturer, {
  foreignKey: 'user_id'
})

UserManufacturer.belongsTo(User, {
  foreignKey: 'user_id'
})

User.hasMany(Recall, {
  foreignKey: 'user_id'
})

Recall.belongsTo(User, {
  foreignKey: 'user_id'
})

module.exports = { User, Recall, UserManufacturer }
