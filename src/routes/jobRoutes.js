const { Router } = require('express');
const { jobController } = require('../controllers');
const { getProfile } = require('../middlewares');

const router = Router();

router.route('/unpaid').get(getProfile, jobController.getUnpaid);
router.route('/:id/pay').post(getProfile, jobController.payJob);

module.exports = router;
