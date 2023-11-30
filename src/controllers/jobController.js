const { jobService } = require('../services');
const { HTTP_STATUS_CODES } = require('../constants');

module.exports = {
  async getUnpaid(req, res /*, next*/) {
    const contracts = await jobService.getUnpaidJobs(req.profile);
    return res.status(HTTP_STATUS_CODES.SUCCESS).json(contracts);
  },

  async payJob(req, res /*, next*/) {
    const { id: contractId } = req.params;
    const profileCpy = { ...req.profile };
    try {
      await jobService.payJob(profileCpy, contractId);
    } catch(err) {
      return res.status(HTTP_STATUS_CODES.BAD_REQUEST).json(err);
    }
    return res.status(HTTP_STATUS_CODES.SUCCESS).json();
  }
}
