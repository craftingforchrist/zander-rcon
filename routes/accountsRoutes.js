const { Router } = require('express');
const router = Router();
const config = require('../config.json');
const rcon = require('../controllers/rconController');

//
// Accounts Administration Page.
//
router.get('/panel/accounts', (req, res, next) => {
  if (!req.session.user) {
    res.render('session/login', {
      "pagetitle": "Login",
      "pagedescription": "To be able to have full functionality, please login.",
      "loginfailed": false
    });
  } else {
    res.render('session/accounts/list', {
      "pagetitle": "Administration",
      "pagedescription": "The main control room for the remote Minecraft instance."
    });
  };
});

router.get('/panel/accounts/create', (req, res, next) => {
  if (!req.session.user) {
    res.render('session/login', {
      "pagetitle": "Login",
      "pagedescription": "To be able to have full functionality, please login.",
      "loginfailed": false
    });
  } else {
    res.render('session/accounts/add', {
      "pagetitle": "Account Creator",
      "pagedescription": "Create an account."
    });
  };
});

module.exports = router;
