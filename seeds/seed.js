const sequelize = require('../config/connection');
const { User, Recall , UserManufacturer,} = require('../model');

const userData = require('./userData.json');
const recallData = require('./recall.json');
const userManufacturerData = require('./userManufacturer.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  const recalls = await Recall.bulkCreate(recallData, {
    returning: true
  });

  const userManufacturer = await UserManufacturer.bulkCreate(userManufacturerData, {
    returning: true
  });

  process.exit(0);
};

seedDatabase();