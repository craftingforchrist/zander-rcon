const express = require('express');
const router = express.Router();
const config = require('../config.json');
const database = require('../controllers/databaseController');

router.get('/', (req, res, next) => {
  res.render('index', {
    "pagetitle": "Home",
    "pagedescription": "A RCON web application for remote administration of Minecraft Servers."
  });
});

router.get('/punishments', (req, res, next) => {
  database.query(`SELECT * FROM punishments;`, function (error, results, fields) {
    if (error) {
      throw error;
    } else {
      console.log(results);

      res.render('punishments', {
        "pagetitle": "Punishments",
        "pagedescription": "A list of all punishments from the RCON server.",
        objdata: results
      });
    };
  });
});

module.exports = router;
