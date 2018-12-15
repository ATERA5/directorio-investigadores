'use strict';
module.exports = (sequelize, DataTypes) => {
  const Article = sequelize.define('Article', {
    name: DataTypes.STRING,
    area: DataTypes.STRING,
    path: DataTypes.STRING,
    date_of_publication: DataTypes.DATE,
  }, {
    freezeTableName: true,
  });
  Article.associate = function(models) {
    Article.belongsToMany(models.Researcher, {
        through: models.ArticleResearcher,
        foreignKey: 'article_id',
        as: 'researchers',
    })
  };
  return Article;
};
