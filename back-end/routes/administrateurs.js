var express = require('express');
var router = express.Router();
var models = require('../models/index');

// POST : créer un nouvel administrateur
router.post('/administrateurs', async (req, res) => {
  try {
    const administrateurs = await models.administrateurs.create(req.body);
    res.json(administrateurs);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Erreur dans la création de l'administrateur." });
  }
});

// GET : obtenir tout les administrateurs
router.get('/administrateurs', async (req, res) => {
  try {
    const administrateurs = await models.administrateurs.findAll();
    res.json(administrateurs);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Erreur dans l'obtention des administrateurs." });
  }
});

// GET : obtenir un administrateur
router.get('/administrateurs/:id', async (req, res) => {
  try {
    const administrateurs = await models.administrateurs.findByPk(req.params.id);
    if(!administrateurs) {
      res.status(404).json({ message: 'administrateur non trouvé.' });
    } else {
      res.json(administrateurs);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "administrateur dans l'obtention de l'administrateur." });
  }
});

// PUT: Mettre à jour les infos d'un administrateur
router.put('/administrateurs/:id', async (req, res) => {
  try {
    const [updatedRowsCount] = await models.administrateurs.update(req.body, {
        where: { id: req.params.id }
    });      
    if (updatedRowsCount === 0) {
      res.status(404).json({ message: "administrateur non trouvé." });
    } else {
      const administrateurs = await models.administrateurs.findByPk(req.params.id);
      res.json(administrateurs);
    }
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la mise a jour de l'administrateur." });
  }
});

// DELETE : Supprimer par ID
router.delete('/administrateurs/:id', async (req, res) => {
  try {
    const deletedRowsCount = await models.administrateurs.destroy({ where: { id: req.params.id } });
    if (deletedRowsCount === 0) {
      res.status(404).json({ message: 'administrateur non trouvé.' });
    } else {
      res.json({ message: 'administrateur supprimé.' });
    }
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la suppression de l'administrateur." });
  }
});

module.exports = router;
