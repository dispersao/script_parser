var express = require('express');
var router = express.Router();
const searcher = require('../utils/searcher');
const setter = require('../utils/setter');


/* GET home page. */
router.get('/', (req, res, next)=> {
  res.render('index', { title: 'Express' });
})
.get('/types', (req, res, next)=> {
  searcher.search('type')
  .then((list) => {
    res.json(list);
  }, (err) => {
    console.log(err);
    res.json(err);
  });
})
.get('/locations', (req, res, next)=> {
  searcher.search('location')
  .then((list) => {
    res.json(list);
  }, (err) => {
    console.log(err);
    res.json(err);
  });
})
.get('/characters', (req, res, next)=> {
  searcher.search('character')
  .then((list) => {
    res.json(list);
  });
})
.get('/sequences', (req, res, next)=> {
  searcher.search('sequence',req.query)
  .then((list) => {
    res.json(list);
  }, (err) => {
    console.log(err);
    res.json(err);
  });
})
.post('/sequences', (req, res, next)=> {
  setter.update('sequence', null, req.body)
  .then((seq) => {
    res.json(seq);
  }, (err) => {
    console.log(err);
    res.json(err);
  })
})
.post('/sequences/:id', (req, res, next)=> {
  setter.update('sequence', req.params.id, req.body)
  .then((seq) => {
    res.json(seq);
  }, (err) => {
    console.log(err);
    res.json(err);
  });
});


module.exports = router;
