const Rcon = require('modern-rcon');
const rcon = new Rcon(`${process.env.rconaddress}`, `${process.env.rconpassword}`);

rcon.connect();
console.log('Remote Connection has been made.');

module.exports = rcon;
