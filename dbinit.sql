DROP DATABASE IF EXISTS zanderrcon;
CREATE DATABASE IF NOT EXISTS zanderrcon;
USE zanderrcon;

-- CREATE USER 'zanderrcon'@'%' IDENTIFIED WITH mysql_native_password BY 'Paswordzanderrcon321';
-- FLUSH PRIVILEGES;
-- GRANT SELECT ON zanderrcon.* TO zanderrcon@'%';
-- GRANT INSERT ON zanderrcon.* TO zanderrcon@'%';
-- GRANT UPDATE ON zanderrcon.* TO zanderrcon@'%';
-- GRANT DELETE ON zanderrcon.* TO zanderrcon@'%';

CREATE TABLE accountdata (
  id int AUTO_INCREMENT PRIMARY KEY NOT NULL,
  uuid VARCHAR(36),
  username VARCHAR(16),
  password TEXT,
  discordid VARCHAR(18),
  status ENUM('ACTIVE', 'DISABLED') DEFAULT 'ACTIVE'
);

INSERT INTO accountdata (username, password) VALUES ('CONSOLE', 'password');

CREATE TABLE accountspermissions (
  id int AUTO_INCREMENT PRIMARY KEY NOT NULL,
  accountid INT NOT NULL DEFAULT 0,
  accountcreate ENUM('on', 'off') DEFAULT 'off',
  accountdelete ENUM('on', 'off') DEFAULT 'off',
  accountdisable ENUM('on', 'off') DEFAULT 'off',
  accountedit ENUM('on', 'off') DEFAULT 'off',
  punishmentwarn ENUM('on', 'off') DEFAULT 'off',
  punishmentkick ENUM('on', 'off') DEFAULT 'off',
  punishmentban ENUM('on', 'off') DEFAULT 'off',
  punishmentbanip ENUM('on', 'off') DEFAULT 'off',
  punishmentpardon ENUM('on', 'off') DEFAULT 'off',
  serverbroadcast ENUM('on', 'off') DEFAULT 'off',
  servertime ENUM('on', 'off') DEFAULT 'off',
  servergamerule ENUM('on', 'off') DEFAULT 'off',
  servercommand ENUM('on', 'off') DEFAULT 'off',
  FOREIGN KEY (accountid) REFERENCES accountdata (id)
);

CREATE TABLE punishments (
  id int AUTO_INCREMENT PRIMARY KEY NOT NULL,
  punisheduser VARCHAR(16),
  punisher VARCHAR(16),
  punishtype VARCHAR(20),
  reason TEXT,
  punishtimestamp TIMESTAMP NOT NULL DEFAULT NOW()
);
