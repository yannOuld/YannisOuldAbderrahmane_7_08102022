require("dotenv").config();
const db = require("../models");
const bcrypt = require("bcrypt");
const { User } = db.sequelize.models;
const { ADMINPASS } = process.env

'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const bcryptedPassword = await bcrypt.hash(ADMINPASS, 5);

    await User.create({

      firstName: 'John',
      lastName: 'Doe',
      email: 'example@example.com',
      password: bcryptedPassword,
      role: 'admin',
      createdAt: new Date(),
      updatedAt: new Date()
    }).catch(err => console.log(err))
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
