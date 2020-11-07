const { Router } = require('express');
const router = Router();
const config = require('../config.json');
const rcon = require('../controllers/rconController');

router.get('/login', (req, res, next) => {
  res.render('session/login', {
    "pagetitle": "Login",
    "pagedescription": "Please login to access the remote administration panel.",
    "loginfailed": false
  });
});

router.post('/login', function (req, res, next) {
  const username = req.body.username;
  const password = req.body.password;

  if (username == process.env.adminusername && password == process.env.adminpassword) {
    console.log(`[CONSOLE] [ADMIN] ${process.env.adminusername} has logged in.`);
    req.session.user = process.env.adminusername;
    res.redirect("/panel");
  } else {
    console.log('An action in RCON was attempted but the user was not logged in.');
    res.render('session/login', {
      "pagetitle": "Login",
      "pagedescription": "To be able to have full functionality, please login.",
      "loginfailed": true
    });
  };
});

router.get('/logout', function (req, res) {
  req.session.destroy(function() {
      console.log(`[CONSOLE] [ADMIN] ${process.env.adminusername} has logged out.`);
   });
   res.redirect('/');
});

module.exports = router;
