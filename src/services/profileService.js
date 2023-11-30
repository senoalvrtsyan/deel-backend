const { dbModels, db } = require('../db');
const { Op } = require("sequelize");
const { QUERY_CONSTANTS } = require('../constants');

module.exports = {
  async getProfile(id) {
    const query = { id: id || 0 };
    return dbModels.models.Profile.findOne({ where: query })
  },
  
  async getBestProfession(start, end) {
    const dbConnection = await db.getConnection();
    const andQuery = []
    if (start) {
      andQuery.push({ createdAt: { [Op.gte]: start } })
    }
    if (end) {
      andQuery.push({ createdAt: { [Op.lte]: end } })
    }

    return dbModels.models.Job.findOne({
      where: { paid: 1, ...(andQuery.length && { [Op.and]: andQuery } || {}) },
      include: [{
        model: dbModels.models.Contract,
        as: 'Contract',
        required: true,
        attributes: [],
        include: [{ model: dbModels.models.Profile, as: 'Contractor', required: true, attributes: [] }]
      }],
      attributes: [
        [dbConnection.col('Contract.Contractor.profession'), 'profession'],
        [dbConnection.fn('sum', dbConnection.col('price')), 'earnings']
      ],
      group: [ 'Contract.Contractor.profession' ],
      order: dbConnection.literal('earnings DESC'),
      limit: 1
    });
  },
  
  async getBestClients(start, end, limit) {
    const dbConnection = await db.getConnection();
    const andQuery = [];
    if (start) {
      andQuery.push({ createdAt: { [Op.gte]: start } })
    }
    if (end) {
      andQuery.push({createdAt: { [Op.lte]: end } })
    }
    return dbModels.models.Job.findAll({
      where: { paid: 1, ...(andQuery.length &&  { [Op.and]: andQuery } || {}) },
      include: [{
        model: dbModels.models.Contract,
        as: 'Contract',
        required: true,
        attributes: [],
        include: [{
          model: dbModels.models.Profile,
          as: 'Client',
          required: true,
          attributes: []
        }]
      }],
      attributes: [
        [ dbConnection.col('Contract.Client.id'), 'id' ],
        [ dbConnection.literal("firstName || ' ' || lastName"), 'fullName' ],
        [ dbConnection.fn('sum', dbConnection.col('price')), 'paid' ]
      ],
      group: [ 'Contract.Client.id' ],
      order: dbConnection.literal('paid DESC'),
      limit: limit || QUERY_CONSTANTS.BEST_CLIENTS_LIMIT,
    });
  }
};
