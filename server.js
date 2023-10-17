const express = require('express');
const app = express(); //.use(siofu.router);
const http = require('http').Server(app);
const path = require('path');
const io = require('socket.io')(http);
const fs = require('fs');
const crypto = require('crypto');
const mysql = require('mysql2');
const bcrypt = require('bcrypt');
const { Sequelize, DataTypes } = require('sequelize');
require('dotenv').config({path: './serverSecurityVariables.env'});
const createPlayer = require('./authentication/create-account')
var PORT = process.env.PORT;
const sequelize = new Sequelize('AMWT', 'root', process.env.MY_SQL_HIDDEN, {
	host: 'localhost',
	dialect: 'mysql',
	logging: console.log,
});

const players = sequelize.define('players', {
	username: {
		type: DataTypes.STRING,
		allowNull: false,
		unique: true,
	},
	email: {
		type: DataTypes.STRING,
		allowNull: false,
		unique: true,
		validate: {
			isEmail: true
		  },
	},
	password: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	wins: {
		type: DataTypes.INTEGER,
		allowNull: false,
		validate: {
			isNumeric: true
		  },
	},
	id: {
		type: DataTypes.STRING,
		allowNull: false,
		unique: true,
		primaryKey: true,
		validate: {
			isAlphanumeric: true,

		  },
	},
});
app.use(express.static(path.join(__dirname, 'client/build/')));
app.use(express.json());
app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, 'client/public', 'index.html'));
});
io.on('connection', function (socket) {});


app.post('/save-user', async (req, res, next) => await createPlayer
	(
		req, res, next, crypto, bcrypt,players
	) && console.log('msg executed')
	);
http.listen(PORT, () => {
	console.log('Server started on port: ' + PORT);
});



///etc/sysctl.conf <<if you get weird error remove the last line.



/*


card type map keys.

class wizards
	constructor name, imgs
	consts health, mana, moves = [a, b, c, d, ... etc]

	method health


	methods attacks use params to selects who to dmg i.e. player2, player3, player4.
	

	mana rechardge


GAME LOOP


PLAYER TURNS
// models/Wizard.js


export default Wizard;







class Wizard {
	constructor(wizardName, image) {
	  this.wizardName = wizardName;
	  this.image = image;
	  this.mana = 10;
	  this.maxMana = 10;
	  this.moves = [
		{
		  name: 'Meteor Strike',
		  action: this.meteorStrike.bind(this),
		  cost: 5,
		},
	  ];
	  this.manaRegenRate = 1; // This wizard regenerates 1 mana per turn
	}
  
	regenerateMana() {
	  this.mana = Math.min(this.mana + this.manaRegenRate, this.maxMana);
	}
  
	meteorStrike(targetWizard) {
	  if (this.mana >= 5) {
		this.mana -= 5;
		// Apply the meteor strike effect to the target wizard
		let turns = 3;
		const effectInterval = setInterval(() => {
		  targetWizard.receiveDamage(1); // target takes 1 damage
		  this.receiveDamage(2); // self takes 2 damage
		  turns--;
		  if (turns <= 0) {
			clearInterval(effectInterval);
		  }
		}, 1000); // Simulating turns with a 1-second delay for this example
	  } else {
		console.log('Not enough mana!');
	  }
	}
  
	receiveDamage(damage) {
	  // Normally, you would decrease the wizard's health here.
	  // For this example, I'm just logging the damage received.
	  console.log(`${this.wizardName} received ${damage} damage!`);
	}
  }
  

*/