const express = require('express');
const { getAPI } = require('../controllers/getAPI');
const router = express.Router();

router.route('/').get(getAPI);

module.exports = router;
