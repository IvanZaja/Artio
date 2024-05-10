require('dotenv').config();

const mongoose = require('mongoose');
const User = require('../models/user.model');
const usersData = require('../data/users.json');

const Project = require('../models/project.model');
const projectsData = require('../data/projects.json');

require('../configs/db.config');

//////////// USERS SEED - CAREFULL WITH THE ID's
// mongoose.connection.once('open', () => {
//  console.info(`Successfully connected to the database ${mongoose.connection.db.databaseName}`);
//  mongoose.connection.db.dropCollection('users')
//    .then(() => {
 //     console.info('Dropped users collection');
   //   return User.create(usersData);
    //})
    //.then((users) => console.info(`- ${users.length} users created`))
    //.catch((error) => console.error(error))
    //.finally(() => process.exit(0))
//});


//////////// PROJECTS SEED 
mongoose.connection.once('open', () => {
    console.info(`Successfully connected to the database ${mongoose.connection.db.databaseName}`);
    mongoose.connection.db.dropCollection('projects')
      .then(() => {
        console.info('Dropped projects collection');
        return Project.create(projectsData);
      })
      .then((projects) => console.info(`- ${projects.length} projects created`))
      .catch((error) => console.error(error))
      .finally(() => process.exit(0))
  });