const { Router } = require('express');
const { contractController } = require('../controllers');
const { getProfile } = require('../middlewares');

const router = Router();

router.route('/').get(getProfile, contractController.getContracts);
router.route('/:id').get(getProfile, contractController.getContractById);

module.exports = router;
