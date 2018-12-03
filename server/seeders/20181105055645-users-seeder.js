'use strict';
const randomstring = require("randomstring");
var faker = require('faker');
faker.locale = "es_MX";

module.exports = {
  up: (queryInterface, Sequelize) => {
      var users = [];
      for (var i = 0; i < 50; i++) {
          users[i] = {
              names: faker.name.findName(),
              last_names: faker.name.lastName() + " " + faker.name.lastName(),
              email: faker.internet.email(),
              password: faker.internet.password(),
              token: randomstring.generate(25),
              createdAt: new Date(),
              updatedAt: new Date(),
          };
      }
      return queryInterface.bulkInsert('User', users, {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('User', null, {});
  }
};
