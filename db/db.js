const { Sequelize, Op} = require('sequelize');

const modelProject = require('./model/projects'); // Modelo de Project
const modelScreenshots = require('./model/screenshots'); // Modelo de Screenshots


const entorno = true;

const dburl = entorno ? 'postgresql://postgres:nGMSzKGuSRUaMbRduDlCRbLFQsUwKTdY@viaduct.proxy.rlwy.net:35801/railway' : 'postgres:postgres:123@localhost:5432/me'

const sequelize = new Sequelize(dburl, {
    logging: false,
    native: false,
});

modelProject(sequelize);
modelScreenshots(sequelize);

const { project, screenshot } = sequelize.models;

// Relacionamos las Screenshots con el proyecto.
project.hasMany(screenshot, {as: "imagenes"}); 
screenshot.belongsTo(project, {as: "project"});

// Exportamos.

module.exports = {
    ...sequelize.models,
    db: sequelize,
    Op
}