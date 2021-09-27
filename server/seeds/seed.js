const db = require('../config/connection');
const { Sounds } = require('../models');

const soundsData = require('./soundData.json');

db.once('open', async () => {
  await Sounds.deleteMany({});

  await Sounds.insertMany(soundsData);

  console.log('Sounds seeded!');
  process.exit(0);
});