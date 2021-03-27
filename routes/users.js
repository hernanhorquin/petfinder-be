const express = require('express');
const {
  getOwed, updateOwed,
} = require('../controllers/owed');
const auth = require('../middleware/check-auth');

const router = express.Router();

router.use(auth);
router.route('/')
  /* Gets iva of the db */
  .get(getOwed);

/* Updates a iva */
router.put('/:owed_id', updateOwed);

module.exports = router;
