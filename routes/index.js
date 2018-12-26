var express = require('express');
var router = express.Router();
const searcher = require('../utils/searcher');
const setter = require('../utils/setter');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
})
.get('/types', function(req, res, next) {
  searcher.search('type')
  .then((list) => {
    res.json(list);
  });
})
.get('/locations', function(req, res, next) {
  searcher.search('location')
  .then((list) => {
    res.json(list);
  });
})
.get('/characters', function(req, res, next) {
  searcher.search('character')
  .then((list) => {
    res.json(list);
  });
})
.get('/sequences', function(req, res, next) {
  searcher.search('sequence',req.query)
  .then((list) => {
    res.json(list);
  });
})
.post('/sequences', function(req, res, next) {
  setter.update('sequence', null, req.body)
  .then((seq) => {
    res.json(seq);
  })
})
.post('/sequences/:id', function(req, res, next) {
  setter.update('sequence', req.params.id, req.body)
  .then((seq) => {
    res.json(seq);
  });
});


module.exports = router;
