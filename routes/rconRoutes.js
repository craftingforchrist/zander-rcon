const { Router } = require('express');
const router = Router();
const config = require('../config.json');
const rcon = require('../controllers/rconController');

//
// OP
//
// router.post('/rcon/op/add', function (req, res, next) {
//   if (!req.session.user) {
//     console.log('An action in RCON was attempted but the user was not logged in.');
//     res.render('session/login', {
//       "pagetitle": "Login",
//       "pagedescription": "To be able to have full functionality, please login.",
//       "loginfailed": true
//     });
//   } else {
//     const username = req.body.username;
//
//     rcon.send(`op ${username}`);
//     res.redirect('/admin');
//   };
// });
//
// router.post('/rcon/op/remove', function (req, res, next) {
//   if (!req.session.user) {
//     console.log('An action in RCON was attempted but the user was not logged in.');
//     res.render('session/login', {
//       "pagetitle": "Login",
//       "pagedescription": "To be able to have full functionality, please login.",
//       "loginfailed": true
//     });
//   } else {
//     const username = req.body.username;
//
//     rcon.send(`deop ${username}`);
//     res.redirect('/admin');
//   };
// });

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
    res.redirect('/admin');
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
      res.redirect('/admin');
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
      res.redirect('/admin');
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
      res.redirect('/admin');
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
      res.redirect('/admin');
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
        console.log(result)
        res.redirect('/admin');
      });
    } else if (type == 'pardon') {
      rcon.send(`${type} ${username}`).then(result => {
        console.log(result)
        res.redirect('/admin');
      });
    } else {
      rcon.send(`${type} ${username} ${reason}`).then(result => {
        console.log(result)
        res.redirect('/admin');
      });
    }
  };
});

module.exports = router;
