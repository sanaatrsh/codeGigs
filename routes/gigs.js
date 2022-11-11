const express = require('express');
const db = require('../config/database');
const Gig = require('../models/gig');

const gigRoutes = require('../controllers/gigs')

const router = express.Router();

router.get('/', gigRoutes.getGigs);

router.get('/add', gigRoutes.getAddGigs);

router.post('/add', gigRoutes.postAddGigs)

router.get('/search', gigRoutes.getSearchGigs);

module.exports = router;