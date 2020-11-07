const { Router } = require('express');
const router = Router();
const config = require('../config.json');
const rcon = require('../controllers/rconController');
const database = require('../controllers/databaseController');

router.get('/login', (req, res, next) => {
  res.render('session/login', {
    "pagetitle": "Login",
    "pagedescription": "Please login to access the remote administration panel.",
    "loginfailed": false
  });
});

router.post('/login', function (req, res, next) {
  database.query(`SELECT username, password FROM accountdata where username=?;`, [req.body.username], function (error, results, fields) {
      if (error) {
        throw error;

        console.log('this did not work');
      } else {
        if (results.length < 1) {
          res.render('session/login', {
            "pagetitle": "Login",
            "pagedescription": "To be able to have full functionality, please login.",
            "loginfailed": true
          });
        } else {
          if (req.body.username == results[0].username && req.body.password == results[0].password) {
            console.log(`[CONSOLE] [ADMIN] ${req.body.username} has logged in.`);
            req.session.user = req.body.username;
            res.redirect("/panel");
          }
        }
    };
  });
});

router.get('/logout', function (req, res) {
  req.session.destroy(function() {
      console.log(`[CONSOLE] [ADMIN] ${req.body.username} has logged out.`);
   });
   res.redirect('/');
});

module.exports = router;
