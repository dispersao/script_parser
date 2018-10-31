var express = require('express');
var router = express.Router();
const searcher = require('../utils/searcher');


/* GET users listing. */
router.get('/', function(req, res, next) {
  searcher.search('sequence',req.query)
  .then((list) => {
    res.json(list);
  });
});

module.exports = router;
