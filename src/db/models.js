const db = require('./db');
const { 
  contractModel,
  jobModel,
  profileModel
} = require('../models');


class DbModels {
  constructor() {}

  async init() {
    this.db = await db.getConnection();
    this.models = {
      Contract: contractModel(this.db),
      Profile: profileModel(this.db),
      Job: jobModel(this.db)
    };
    this.models.Profile.hasMany(this.models.Contract, {as :'Contractor',foreignKey:'ContractorId'})
    this.models.Contract.belongsTo(this.models.Profile, {as: 'Contractor'})
    this.models.Profile.hasMany(this.models.Contract, {as : 'Client', foreignKey:'ClientId'})
    this.models.Contract.belongsTo(this.models.Profile, {as: 'Client'})
    this.models.Contract.hasMany(this.models.Job)
    this.models.Job.belongsTo(this.models.Contract)
  }
}

module.exports = new DbModels();
