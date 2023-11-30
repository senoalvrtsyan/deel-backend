const App = require('./app');

(async function init() {
  try {
    const app = new App();
    await app.init();
  } catch (err) {
    console.error(`An error occurred: ${JSON.stringify(err.message)}`);
    process.exit(1);
  }

  /**
   * Checking Uncaught Exceptions
   */
  process.on('uncaughtException', err => {
    console.log('error', (new Date).toUTCString() + ' uncaughtException:', err.message);
    console.log('info', err.stack);
    process.exit(1);
  });

  /**
   * Checking Unhandled Rejection
   */
  process.on('unhandledRejection', err => {
    console.log('error', (new Date).toUTCString() + ' unhandledRejection:', err.message);
    console.log('info', err.stack);
    process.exit(1);
  });
})()
