var db = require("../models/index");
const Article = require('../models/article')(db.sequelize, db.Sequelize);

module.exports ={
    create(req, res){
      return Article
        .create({
          name: req.body.name,
          area: req.body.area,
          path: req.body.path,
          date_of_publication: req.body.date_of_publication,
          createdAt: new Date(),
          updatedAt: new Date(),
        })
        .then(article => res.status(201).send(article))
        .catch(error => res.status(400).send(error));
    },
    list(req, res){
      return Article
          .all()
          .then(articles => {
            return res.status(200).send(articles);
          })
          .catch(error => res.status(400).send(error));
    },
    update(req, res){
      return Article
          .findByPk(req.params.articleId)
          .then(article => {
            if(! article)
              return res.status(404).send({
                message: 'Article not found',
              });
            return article
              .update({
                name: req.body.name || article.name,
                area: req.body.area || article.area,
                path: req.body.path || article.path,
                date_of_publication: req.body.date_of_publication || article.date_of_publication,
              })
              .then(() => res.status(200).send(article))
              .catch((error) => res.status(400).send(error));
          })
          .catch((error) => res.status(400).send(error));
    },
    delete(req, res){
        return Article
            .findByPk(req.params.articleId)
            .then(article => {
              if(!article){
                return res.status(404).send({
                  message: 'Article not found',
                });
              }
              return article
                  .destroy()
                  .then(()=> res.status(200).send())
                  .catch(error = res.status(400).send(error));
            })
            .catch(error => res.status(400).send(error));
    },
    show(req, res){
        return Article
            .findByPk(req.param.articleId)
            .then(article => {
              if(!article){
                return res.status(404).send({
                  message: 'Article not found',
                });
              }
              return res.status(200).send(article);
            })
            .catch(error => res.status(400).send(error));
    },
};
