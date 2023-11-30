const { profileService } = require('../services');
const { HTTP_STATUS_CODES } = require('../constants');

module.exports = {
  async bestProfession(req, res /*, next*/) {
      const { start, end } = req.query;
      const profile = await profileService.getBestProfession(start, end);
      if (profile) {
        return res
            .status(HTTP_STATUS_CODES.SUCCESS)
            .json({ profession: profile.toJSON().profession });
      }
      return res.status(HTTP_STATUS_CODES.NOT_FOUND).json();
  },

  async bestClients(req, res /*, next*/) {
    const { start, end, limit } = req.query;
    const profiles = await profileService.getBestClients(start, end, limit);
    return res.status(HTTP_STATUS_CODES.SUCCESS).json(profiles);
  }
}
