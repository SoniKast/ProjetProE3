var express = require('express');
var router = express.Router();
var models = require('../models/index');

// POST : créer un nouvel évènement
router.post('/evenements', async (req, res) => {
  try {
    const evenements = await models.evenements.create(req.body);
    res.json(evenements);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Erreur dans la création de l'évènement." });
  }
});

// GET : obtenir tout les évènements
router.get('/evenements', async (req, res) => {
  try {
    const evenements = await models.evenements.findAll();
    res.json(evenements);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Erreur dans l'obtention des évènements." });
  }
});

// GET : obtenir un évènement
router.get('/evenements/:id', async (req, res) => {
  try {
    const evenements = await models.evenements.findByPk(req.params.id);
    if(!evenements) {
      res.status(404).json({ message: 'Évènement non trouvé.' });
    } else {
      res.json(evenements);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Erreur dans l'obtention de l'évènement." });
  }
});

// PUT: Mettre à jour les infos d'un évènement
router.put('/evenements/:id', async (req, res) => {
  try {
    const [updatedRowsCount] = await models.evenements.update(req.body, {
        where: { id: req.params.id }
    });      
    if (updatedRowsCount === 0) {
      res.status(404).json({ message: "Évènement non trouvé." });
    } else {
      const evenements = await models.evenements.findByPk(req.params.id);
      res.json(evenements);
    }
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la mise a jour de l'évènement." });
  }
});

// DELETE : Supprimer par ID
router.delete('/evenements/:id', async (req, res) => {
  try {
    const deletedRowsCount = await models.evenements.destroy({ where: { id: req.params.id } });
    if (deletedRowsCount === 0) {
      res.status(404).json({ message: 'Évènement non trouvé.' });
    } else {
      res.json({ message: 'Évènement supprimé.' });
    }
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la suppression de l'évènement." });
  }
});

module.exports = router;
