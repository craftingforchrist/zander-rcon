const express = require('express');
const router = express.Router();
const config = require('../config.json');

router.get('/', (req, res, next) => {
  res.render('index', {
    "pagetitle": "Home",
    "pagedescription": "A RCON web application for remote administration of Minecraft Servers."
  });
});

module.exports = router;
