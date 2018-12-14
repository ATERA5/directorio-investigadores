'use strict';
var faker = require('faker');
faker.locale = "es_MX"
module.exports = {
  up: (queryInterface, Sequelize) => {
    var article = [];
    for(var i = 0; i< 100; i++){
      article[i]={
        name: faker.lorem.words(),
        area: faker.name.jobTitle(),
        path: faker.system.filePath(),
        date_of_publication: faker.date.past(),
        createdAt: new Date(),
        updatedAt: new Date(),

      }
    }
    return queryInterface.bulkInsert('Article', article,{})
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Article', null,{});
  }
};
