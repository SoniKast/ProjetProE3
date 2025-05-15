var express = require('express');
var router = express.Router();
var Evenements = require('../models/evenements');

// GET
router.get('/evenements', async (req, res) => {
  try {
    const evenements = await Evenements.findAll();
    res.json(evenements);
  } catch (error) {
    res.status(500).json({ message: "Erreur dans l'obtention des évènements"});
  }
});

module.exports = router;
