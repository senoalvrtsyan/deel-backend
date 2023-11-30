const { profileService } = require('../services');
const { HTTP_STATUS_CODES } = require('../constants');

module.exports = async (req, res, next) => {
  const id = req.get('profile_id');
  const profile = await profileService.getProfile(id);
  if (!profile) {
      return res.status(HTTP_STATUS_CODES.UNAUTHORIZED).end();
  }
  req.profile = profile;
  next();
}