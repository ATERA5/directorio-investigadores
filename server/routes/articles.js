var express = require('express');
var router = express.Router();
var articlesRouter = require("../controllers/articles.js");

router.get('/', articlesRouter.list);
router.post('/', articlesRouter.create);
router.put('/:articleId', articlesRouter.update);
router.delete('/:articleId',articlesRouter.delete);
router.get('/:articleId', articlesRouter.show);


module.exports = router;
