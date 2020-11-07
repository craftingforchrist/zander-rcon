const { Router } = require('express');
const router = Router();
const config = require('../config.json');
const rcon = require('../controllers/rconController');

//
// Main Administration Page.
//
router.get('/panel', (req, res, next) => {
  if (!req.session.user) {
    res.render('session/login', {
      "pagetitle": "Login",
      "pagedescription": "To be able to have full functionality, please login.",
      "loginfailed": false
    });
  } else {
    rcon.send(`list`).then(result => {
      res.render('session/panel', {
        "pagetitle": "Administration Panel",
        "pagedescription": "The main control room for the remote Minecraft instance.",
        "playersonline": result
      });
    });
  };
});

module.exports = router;
