const App = require('../src/app');
const { request } = require('./helpers');

describe('Get contract by id', () => {
  let app;
  
  beforeEach(async () => {
    app = new App();
  });
  
  afterEach(async () => {
    await app.close();
  })
  
  it('It should return contract for profile', async () => {
    await app.start();
    const contractId = 1;
    const profileId = 1;
    const { body } = await request({
      app: app.server,
      method: 'get',
      url: `/contracts/${contractId}`,
    }, profileId);
    
    expect(body.length).toEqual(2);
    expect(body).toEqual([
      { id: 4, fullName: 'Ash Kethcum', paid: 2020 },
      { id: 1, fullName: 'Harry Potter', paid: 643 }
    ]);
  });
});
