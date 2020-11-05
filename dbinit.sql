DROP DATABASE IF EXISTS zanderrcon;
CREATE DATABASE IF NOT EXISTS zanderrcon;
USE zanderrcon;

CREATE USER 'zanderrcon'@'%' IDENTIFIED WITH mysql_native_password BY 'Paswordzanderrcon321';
FLUSH PRIVILEGES;
GRANT SELECT ON zanderrcon.* TO zanderrcon@'%';
GRANT INSERT ON zanderrcon.* TO zanderrcon@'%';
GRANT UPDATE ON zanderrcon.* TO zanderrcon@'%';
GRANT DELETE ON zanderrcon.* TO zanderrcon@'%';

CREATE TABLE accountdata (
  username VARCHAR(16),
  password TEXT,
  status ENUM('ACTIVE', 'DISABLED')
);

CREATE TABLE accountspermissions (
  id int AUTO_INCREMENT PRIMARY KEY NOT NULL,
  accountid INT NOT NULL DEFAULT 0,
  punishmentwarn BOOLEAN DEFAULT false,
  punishmentkick BOOLEAN DEFAULT false,
  punishmentban BOOLEAN DEFAULT false,
  punishmentbanip BOOLEAN DEFAULT false,
  punishmentbanpardon BOOLEAN DEFAULT false,
  serverbroadcast BOOLEAN DEFAULT false,
  servertime BOOLEAN DEFAULT false
);

CREATE TABLE punishments (
  id int AUTO_INCREMENT PRIMARY KEY NOT NULL,
  punisheduser VARCHAR(16),
  punisher VARCHAR(16),
  punishtype VARCHAR(20),
  reason TEXT,
  punishtimestamp TIMESTAMP NOT NULL DEFAULT NOW()
);
