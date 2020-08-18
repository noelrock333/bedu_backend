var express = require('express');
var router = express.Router();
const destinationsModel = require('../models/destinations');

/* GET home page. */
router.get('/', function(req, res, next) {
  const destinations = destinationsModel.getDestinations();
  res.render('dashboard', { destinations });
});

router.post('/api/v1/destinations', function(req, res, next) {
  const destinations = destinationsModel.getDestinations();
  res.json({ destinations });
});

module.exports = router;
