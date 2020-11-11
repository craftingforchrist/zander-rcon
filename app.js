//
// Project Constants
//
const express = require('express');
const session = require('express-session');
require ('dotenv').config();
const bodyParser = require('body-parser');
const ejs = require('ejs');
const cookieParser = require('cookie-parser');
const Discord = require('discord.js');
const client = new Discord.Client({ disableEveryone: true });


//
// File Constants
//
const package = require('./package.json');
const config = require('./config.json');

//
// Controllers
//
const rcon = require('./controllers/rconController');
const database = require('./controllers/databaseController');

//
// Constants
//
const app = express();
app.set('view engine', 'ejs');
app.set('views', 'views');
app.use(express.static('./assets'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(session({
  cookie: { maxAge: process.env.sessionMaxAge },
  secret: process.env.sessionsecret,
  resave: false,
  saveUninitialized: true
}));

//
// Global Website Variables
//
app.use((req, res, next) => {
  res.locals.servername = config.servername;
  res.locals.website = config.website;
  res.locals.weblogo = config.weblogo;
  res.locals.webfavicon = config.webfavicon;

  res.locals.sessionUser = req.session.user;

  res.locals.loginfailed = false;
  res.locals.successalert = false;
  res.locals.warningalert = false;
  res.locals.erroralert = false;

  next();
});

//
// Site Routes
//
var index = require('./routes/index');
app.use('/', index);

var sessionRoutes = require('./routes/sessionRoutes');
app.use(sessionRoutes);

var administrationRoutes = require('./routes/administrationRoutes');
app.use(administrationRoutes);

var accountsRoutes = require('./routes/accountsRoutes')(client);
app.use(accountsRoutes);

var rconRoutes = require('./routes/rconRoutes');
app.use(rconRoutes);

//
// Application Boot
//
const port = process.env.PORT || 8080;
app.listen(port, function() {
  console.log(`\n// ${package.name} v.${package.version}\nGitHub Repository: ${package.homepage}\nCreated By: ${package.author}`);
  console.log(`[CONSOLE] Application is listening to the port ${port}`);

  client.login(process.env.discordapitoken);

  client.on("ready", () => {
    console.log('[CONSOLE] [DISCORD] Launched Discord web side.');
  });
});
