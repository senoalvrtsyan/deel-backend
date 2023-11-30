const { contractService } = require('../services');
const { HTTP_STATUS_CODES } = require('../constants');

module.exports = {
  async getContracts(req, res /*, next*/) {
    const contracts = await contractService.getActiveContracts(req.profile);
    return res.status(HTTP_STATUS_CODES.SUCCESS).json(contracts);
  },

  async getContractById(req, res /*, next*/) {
    const { id: contractId } = req.params;
    const profileCpy = { ...req.profile };
    const contract = await contractService.getContract(profileCpy, contractId);
    if (!contract) {
      return res.status(HTTP_STATUS_CODES.NOT_FOUND).json();
    }
    return res.status(HTTP_STATUS_CODES.SUCCESS).json(contract);
  }
}
