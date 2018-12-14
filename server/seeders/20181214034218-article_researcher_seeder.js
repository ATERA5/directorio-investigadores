'use strict';
var faker = require('faker');
faker.locale = "es_MX"
module.exports = {
  up: (queryInterface, Sequelize) => {
    var article_researcher = [];
    var j = 100;
    for (var i=0; i<100; i++){
      article_researcher[i]={
        article_id: j--,
        researcher_id: faker.random.number({min:1, max: 25}),
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    }
    return queryInterface.bulkInsert('ArticleResearcher', article_researcher, {})
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('ArticleResearcher', null, {});
  }
};
