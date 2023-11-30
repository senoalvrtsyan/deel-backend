const { Router } = require('express');
const { adminController } = require('../controllers');

const router = Router();

router.route('/best-profession').get(adminController.bestProfession);
router.route('/best-clients').get(adminController.bestClients);

module.exports = router;
