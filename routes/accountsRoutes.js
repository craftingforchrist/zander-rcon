const { Router } = require('express');
const router = Router();
const config = require('../config.json');
const rcon = require('../controllers/rconController');
const database = require('../controllers/databaseController');
const randomToken = require('random-token').create('abcdefghijklmnopqrstuvwxzyABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789');
const token = randomToken(16);
const Discord = require('discord.js');
const client = new Discord.Client({ disableEveryone: true });

//
// Accounts Administration Page.
//
module.exports = (client) => {
  router.get('/panel/accounts', (req, res, next) => {
    if (!req.session.user) {
      res.render('session/login', {
        "pagetitle": "Login",
        "pagedescription": "To be able to have full functionality, please login.",
        "loginfailed": false
      });
    } else {
      database.query(`SELECT * FROM accountdata;`, function (error, results, fields) {
        if (error) {
          throw error;
        } else {
          res.render('session/accounts/list', {
            "pagetitle": "Accounts",
            "pagedescription": "List of all Accounts.",
            objdata: results
          });
        };
      });
    };
  });

  //
  // Delte Account and remove from Database.
  //
  router.post('/panel/accounts/delete', function (req, res, next) {
    if (!req.session.user) {
      res.render('session/login', {
        "pagetitle": "Login",
        "pagedescription": "To be able to have full functionality, please login.",
        "loginfailed": false
      });
    } else {
      console.log(req.body);

      let id = req.body.id;

      let sql = `DELETE FROM accountdata WHERE id=?;`
      database.query (sql, [`${req.body.id}`], async function (err, results) {
        console.log(results);
        res.redirect('/panel/accounts')
      });
    }
  });

  //
  // Accounts Create.
  //
  router.get('/panel/accounts/add', (req, res, next) => {
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

  //
  // Create Account and add to Database.
  //
  router.post('/panel/accounts/create', function (req, res, next) {
    if (!req.session.user) {
      res.render('session/login', {
        "pagetitle": "Login",
        "pagedescription": "To be able to have full functionality, please login.",
        "loginfailed": false
      });
    } else {
      let username = req.body.username;
      console.log(req.body);

      let selectsql = `SELECT COUNT(username) as 'usercount' FROM accountdata WHERE username=?;`
      database.query (selectsql, [`${username}`], async function (err, results) {
        if (results[0].usercount > 0) {
          console.log('There are more than 2 ACCOUNTS!');
          res.redirect('/');
        } else {
          let discordid = req.body.discordid;
          let sql = `INSERT INTO accountdata (username, password, discordid) VALUES (?, ?, ?);`
          database.query (sql, [`${username}`, `${token}`, `${discordid}`], async function (err, results) {
            console.log(results);

            //
            // Discord Notification Send
            //
            const embed = new Discord.MessageEmbed()
              .setTitle(`Panel Access Credentials`)
              .setDescription(`Hello ${username},\n A panel account has been created for you, here are the credentials:\nUsername: Your Username\nPassword: ${token}\nTo login, go to ${config.website}\n\nIf you have any issues, please report this to a Developer.`)
              .setFooter(`Keep this password safe as it cannot be regenerated.`)

              client.users.fetch(`${discordid}`).then((user) => {
                  user.send(embed);
              });
            console.log(`[CONSOLE] [DISCORD] Sent ${username}'s password for panel access via direct messages.`);

            // TODO: Need to add account permissions.

            // let sql = `INSERT INTO accountspermissions (username, accountcreate, accountdelete, accountdisable, accountedit, punishmentwarn, punishmentkick, punishmentban, punishmentpardon, serverbroadcast, servertime) VALUES ((SELECT id from accountdata where username='?'), ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`
            // database.query (sql, [`${username}`, `${req.body.accountcreate}`, `${req.body.accountdelete}`, `${req.body.accountdisable}`, `${req.body.accountedit}`, `${req.body.punishmentwarn}`, `${req.body.punishmentkick}`, `${req.body.punishmentban}`, `${req.body.punishmentpardon}`, `${req.body.serverbroadcast}`, `${req.body.servertime}`], async function (err, results) {
            //   console.log(results);
            // });

            res.redirect('/panel/accounts');
          });
        }
      });
    }
  });

  return router;
};
