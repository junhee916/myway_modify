const express = require('express')
const checkAuth = require('../middleware/check-auth')
const {
    destinations_get_all,
    destinations_patch_destination,
    destinations_delete_destination,
    destinations_get_destination,
    destinations_post_destination
} = require('../controller/destination')
const router = express.Router()

// total get destination
router.get('/', checkAuth, destinations_get_all)

// detail get destination
router.get('/:destinationId', checkAuth, destinations_get_destination)

// register destination
router.post('/', checkAuth, destinations_post_destination)

// update destination
router.patch('/:destinationId', checkAuth, destinations_patch_destination)

// detail delete destination
router.delete('/:userId', checkAuth, destinations_delete_destination)

module.exports = router