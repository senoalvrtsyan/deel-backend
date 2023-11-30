const express = require('express');
const bodyParser = require('body-parser');
const { createHttpTerminator } = require('http-terminator');
const { db, dbModels } = require('./db');
const { contractRoutes, jobRoutes, adminRoutes } = require('./routes');
const config = require('./config');

class App {
  constructor() {
    this.app = express();
    this.setupMiddlewares();
    this.setupRoutes();
  }

  async init() {
    // Connect and Init database
    db.connect(config.db);
    const dbConnection = await db.getConnection();
    await dbModels.init();

    // Store database models and connection
    this.app.set('models', dbModels);
    this.app.set('dbConnection', dbConnection);

    this.server = this.app.listen(config.port, () => console.log(`Server listening on ${config.port}`));

    this.httpTerminator = createHttpTerminator({ server: this.server });
  }
  
  setupRoutes() {
    this.app.use('/contracts', contractRoutes);
    this.app.use('/jobs', jobRoutes);
    this.app.use('/admin', adminRoutes);
  }
  
  setupMiddlewares() {
    this.app.use(bodyParser.json());
  }
  
  async close() {
    try {
        await db.close();
        await this.httpTerminator.terminate();
    } catch(e) {
        console.log(`Error in closing app: ${e}`)
    }
  }
}

module.exports = App;
