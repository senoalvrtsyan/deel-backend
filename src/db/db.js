const Sequelize = require("sequelize");

class Db {
  constructor() {}

  connect(config) {
    this.sequelize = new Sequelize({
      dialect: config.dialect,
      storage: config.storage,
    });
  }

  async close(){
    return this.sequelize.close();
  }

  async getConnection() {
    if (this.sequelize) {
      try {
        await this.sequelize.authenticate();
        console.log('Databse connection has been established successfully.');
        return this.sequelize;
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }
    } else {
      this.connect();
    }
    return this.sequelize;
  }
}

module.exports = new Db();
