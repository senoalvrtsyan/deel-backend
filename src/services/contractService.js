const { dbModels } = require('../db');
const { addProfileToQuery } = require('./helpers');

const { Op } = require("sequelize");

module.exports = {
  async getActiveContracts(profile) {
    const query = {
      [Op.or]: [
        { status: 'in_progress' },
        { status: 'new' }
      ],
      ...addProfileToQuery(profile, { client: 'ClientId', contractor: 'ContractorId' })
    };
    return dbModels.models.Contract.findAll({ where: query });
  },

  async getContract(profile, id) {
    let query = {
      id,
      ...addProfileToQuery(profile, {client: 'ClientId', contractor: 'ContractorId'}),
    };
    return dbModels.models.Contract.findOne({ where: query });
  }
}
