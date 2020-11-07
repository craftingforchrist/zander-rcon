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
INSERT INTO accountspermissions (accountid, accountcreate, accountdelete, accountdisable, accountedit, punishmentwarn, punishmentkick, punishmentban, punishmentbanip, punishmentpardon, serverbroadcast, servertime, servergamerule, servercommand) VALUES ((SELECT id FROM accountdata WHERE username='CONSOLE'), "GRANT", "GRANT", "GRANT", "GRANT", "GRANT", "GRANT", "GRANT", "GRANT", "GRANT", "GRANT", "GRANT", "GRANT", "GRANT");

CREATE TABLE accountspermissions (
  id int AUTO_INCREMENT PRIMARY KEY NOT NULL,
  accountid INT NOT NULL DEFAULT 0,
  accountcreate ENUM('GRANT', 'DENY') DEFAULT 'DENY',
  accountdelete ENUM('GRANT', 'DENY') DEFAULT 'DENY',
  accountdisable ENUM('GRANT', 'DENY') DEFAULT 'DENY',
  accountedit ENUM('GRANT', 'DENY') DEFAULT 'DENY',
  punishmentwarn ENUM('GRANT', 'DENY') DEFAULT 'DENY',
  punishmentkick ENUM('GRANT', 'DENY') DEFAULT 'DENY',
  punishmentban ENUM('GRANT', 'DENY') DEFAULT 'DENY',
  punishmentbanip ENUM('GRANT', 'DENY') DEFAULT 'DENY',
  punishmentpardon ENUM('GRANT', 'DENY') DEFAULT 'DENY',
  serverbroadcast ENUM('GRANT', 'DENY') DEFAULT 'DENY',
  servertime ENUM('GRANT', 'DENY') DEFAULT 'DENY',
  servergamerule ENUM('GRANT', 'DENY') DEFAULT 'DENY',
  servercommand ENUM('GRANT', 'DENY') DEFAULT 'DENY',
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
