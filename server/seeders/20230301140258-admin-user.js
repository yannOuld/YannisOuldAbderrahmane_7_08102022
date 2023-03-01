require("dotenv").config();
const { ADMINPASS } = process.env
'use strict';



/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Users', [{
      imageUrl: 'http://localhost:3000/images/icon1.webp',
      firstName: 'John',
      lastName: 'Doe',
      email: 'example@example.com',
      password: ADMINPASS,
      role: 'admin',
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
