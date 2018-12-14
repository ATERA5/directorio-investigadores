'use strict';
var faker = require('faker');
faker.locale = "es_MX"
module.exports = {
  up: (queryInterface, Sequelize) => {
    var researcher = [];
    for (var i = 0; i< 30; i++){
      researcher[i] ={
        CV: faker.system.filePath(),
        about_me: faker.name.jobDescriptor(),
        user_id : faker.random.number({min: 1, max: 40}),
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    }
    return queryInterface.bulkInsert('Researcher', researcher,{})
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Researcher', null,{});
  }
};
