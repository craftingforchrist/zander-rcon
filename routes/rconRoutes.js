const { Router } = require('express');
const router = Router();
const config = require('../config.json');
const rcon = require('../controllers/rconController');
const database = require('../controllers/databaseController');

//
// Broadcast
//
router.post('/rcon/broadcast', function (req, res, next) {
  if (!req.session.user) {
    console.log('An action in RCON was attempted but the user was not logged in.');
    res.render('session/login', {
      "pagetitle": "Login",
      "pagedescription": "To be able to have full functionality, please login.",
      "loginfailed": true
    });
  } else {
    const broadcastmessage = req.body.broadcastmessage;

    rcon.send(`say ${broadcastmessage}`);
    res.redirect('/panel');
  };
});

//
// Time
//
router.post('/rcon/time/day', function (req, res, next) {
  if (!req.session.user) {
    console.log('An action in RCON was attempted but the user was not logged in.');
    res.render('session/login', {
      "pagetitle": "Login",
      "pagedescription": "To be able to have full functionality, please login.",
      "loginfailed": true
    });
  } else {
    rcon.send(`time set day`).then(result => {
      console.log(result)
      res.redirect('/panel');
    });
  };
});

router.post('/rcon/time/midnight', function (req, res, next) {
  if (!req.session.user) {
    console.log('An action in RCON was attempted but the user was not logged in.');
    res.render('session/login', {
      "pagetitle": "Login",
      "pagedescription": "To be able to have full functionality, please login.",
      "loginfailed": true
    });
  } else {
    rcon.send(`time set midnight`).then(result => {
      console.log(result)
      res.redirect('/panel');
    });
  };
});

router.post('/rcon/time/night', function (req, res, next) {
  if (!req.session.user) {
    console.log('An action in RCON was attempted but the user was not logged in.');
    res.render('session/login', {
      "pagetitle": "Login",
      "pagedescription": "To be able to have full functionality, please login.",
      "loginfailed": true
    });
  } else {
    rcon.send(`time set night`).then(result => {
      console.log(result)
      res.redirect('/panel');
    });
  };
});

router.post('/rcon/time/noon', function (req, res, next) {
  if (!req.session.user) {
    console.log('An action in RCON was attempted but the user was not logged in.');
    res.render('session/login', {
      "pagetitle": "Login",
      "pagedescription": "To be able to have full functionality, please login.",
      "loginfailed": true
    });
  } else {
    rcon.send(`time set noon`).then(result => {
      console.log(result)
      res.redirect('/panel');
    });
  };
});

//
// Punish
//
router.post('/rcon/punish', function (req, res, next) {
  if (!req.session.user) {
    console.log('An action in RCON was attempted but the user was not logged in.');
    res.render('session/login', {
      "pagetitle": "Login",
      "pagedescription": "To be able to have full functionality, please login.",
      "loginfailed": true
    });
  } else {
    const username = req.body.punishmentusername;
    const type = req.body.punishmenttype;
    const reason = req.body.punishmentreason;

    console.log(req.body);

    if (type == 'warn') {
      rcon.send(`msg ${username} You have been warned for the following reason: ${reason}!`).then(result => {
        console.log(result);

        database.query(`INSERT INTO punishments (punisheduser, punisher, punishtype, reason) VALUES (?, ?, ?, ?);`, [username, req.session.user, type.toUpperCase(), reason], function (error, results, fields) {
            if (error) {
              throw error;
            } else {
              res.redirect('/panel');
            };
        });
      });
    } else if (type == 'pardon') {
      rcon.send(`${type} ${username}`).then(result => {
        console.log(result);

        database.query(`INSERT INTO punishments (punisheduser, punisher, punishtype, reason) VALUES (?, ?, ?, ?);`, [username, req.session.user, type.toUpperCase(), reason], function (error, results, fields) {
            if (error) {
              throw error;
            } else {
              res.redirect('/panel');
            };
        });
      });
    } else {
      rcon.send(`${type} ${username} ${reason}`).then(result => {
        console.log(result);

        database.query(`INSERT INTO punishments (punisheduser, punisher, punishtype, reason) VALUES (?, ?, ?, ?);`, [username, req.session.user, type.toUpperCase(), reason], function (error, results, fields) {
            if (error) {
              throw error;
            } else {
              res.redirect('/panel');
            };
        });
      });
    }
  };
});

module.exports = router;
