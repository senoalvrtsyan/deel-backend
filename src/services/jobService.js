const { dbModels, db } = require('../db');
const { addProfileToQuery } = require('./helpers');

const { Op } = require("sequelize");

module.exports = {
  async getUnpaidJobs(profile) {
    let query = {
      paid: { [Op.not]: true },
      '$Contract.status$': 'in_progress',
      ...addProfileToQuery(profile, { client: '$Contract.ClientId$', contractor: '$Contract.ContractorId$' }),
    };

    return dbModels.models.Job.findAll({
      where: query,
      include: [{ model: dbModels.models.Contract, as: 'Contract', required: true }]
    });
  },
  
  async payJob(profile, id) {
    const { Job, Profile, Contract } = dbModels;
    const dbConnection = await db.getConnection()
    const transaction = await dbConnection.transaction();
    try {
      const job = await Job.findOne({
        where: {
            id,
            ...addProfileToQuery(profile, {client: '$Contract.ClientId$', contractor: '$Contract.ContractorId$'}),
        },
        include: [{model: Contract, as: 'Contract', required: true, include: [{ model: Profile, as: 'Client', required: true }]}],
        transaction
      });

      if (!job) {
        throw new Error('job for client not found!');
      }

      if (job.Contract.Client.balance >= job.price) {
        await Promise.all([
          Profile.increment({balance: job.price }, { where: { id: job.Contract.ContractorId }, transaction }),
          Profile.decrement({ balance: job.price }, { where:{ id: job.Contract.ClientId}, transaction }),
          Job.update({ paid: 1, paymentDate: new Date().toISOString() }, { where: { id }, transaction })
        ]);
      }
      await transaction.commit();
    } catch(err) {
      await transaction.rollback();
      throw err;
    }
  }
};
