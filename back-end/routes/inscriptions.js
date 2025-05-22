var express = require('express');
var router = express.Router();
var models = require('../models/index');

// POST : créer une nouvelle inscription
router.post('/inscriptions', async (req, res) => {
  try {
    const inscriptions = await models.inscriptions.create(req.body);
    res.json(inscriptions);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Erreur dans la création de l'inscription." });
  }
});

// GET : obtenir toutes les inscriptions
router.get('/inscriptions', async (req, res) => {
  try {
    const inscriptions = await models.inscriptions.findAll();
    res.json(inscriptions);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Erreur lors de l'obtention des inscriptions." });
  }
});

// GET : Obtenir toutes les inscriptions d'un évènement spécifique
router.get('/inscriptions/evenements/:id_evenement', async (req, res) => {
  try {
    const inscriptions = await models.inscriptions.findAll({
      where: { id_evenement: req.params.id_evenement }
    });
    if (inscriptions.length === 0) {
      res.status(404).json({ message: 'Aucune inscription trouvée pour cet évènement.' });
    } else {
      res.json(inscriptions);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Erreur lors de l'obtention des inscriptions de l'évènement." });
  }
});

// GET : Obtenir les détails d'une inscription
router.get('/inscriptions/:id', async (req, res) => {
  try {
    const inscriptions = await models.inscriptions.findByPk(req.params.id);
    if(!inscriptions) {
      res.status(404).json({ message: 'Inscription non trouvée.' });
    } else {
      res.json(inscriptions);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Erreur dans l'obtention de l'inscription." });
  }
});

// PUT: Mettre à jour une inscription
router.put('/inscriptions/:id', async (req, res) => {
  try {
    const [updatedRowsCount] = await models.inscriptions.update(req.body, {
        where: { id: req.params.id }
    });      
    if (updatedRowsCount === 0) {
      res.status(404).json({ message: "Inscription non trouvée." });
    } else {
      const inscriptions = await models.inscriptions.findByPk(req.params.id);
      res.json(inscriptions);
    }
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la mise a jour de l'inscription." });
  }
});

// DELETE : Supprimer par ID
router.delete('/inscriptions/:id', async (req, res) => {
  try {
    const deletedRowsCount = await models.inscriptions.destroy({ where: { id: req.params.id } });
    if (deletedRowsCount === 0) {
      res.status(404).json({ message: 'Inscription non trouvée.' });
    } else {
      res.json({ message: 'Évènement supprimé.' });
    }
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la suppression de l'inscription." });
  }
});

module.exports = router;
