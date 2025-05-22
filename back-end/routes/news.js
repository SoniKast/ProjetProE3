var express = require('express');
var router = express.Router();
var models = require('../models/index');

// POST : créer une nouvel actualité
router.post('/news', async (req, res) => {
  try {
    const news = await models.news.create(req.body);
    res.json(news);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Erreur dans la création de l'actualité." });
  }
});

// GET : obtenir tout les actualités
router.get('/news', async (req, res) => {
  try {
    const news = await models.news.findAll();
    res.json(news);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Erreur dans l'obtention des actualités." });
  }
});

// GET : obtenir une actualité
router.get('/news/:id', async (req, res) => {
  try {
    const news = await models.news.findByPk(req.params.id);
    if(!news) {
      res.status(404).json({ message: 'Actualité non trouvé.' });
    } else {
      res.json(news);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Actualité dans l'obtention de l'actualité." });
  }
});

// PUT: Mettre à jour les infos d'un actualité
router.put('/news/:id', async (req, res) => {
  try {
    const [updatedRowsCount] = await models.news.update(req.body, {
        where: { id: req.params.id }
    });      
    if (updatedRowsCount === 0) {
      res.status(404).json({ message: "Actualité non trouvé." });
    } else {
      const news = await models.news.findByPk(req.params.id);
      res.json(news);
    }
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la mise a jour de l'actualité." });
  }
});

// DELETE : Supprimer par ID
router.delete('/news/:id', async (req, res) => {
  try {
    const deletedRowsCount = await models.news.destroy({ where: { id: req.params.id } });
    if (deletedRowsCount === 0) {
      res.status(404).json({ message: 'Actualité non trouvé.' });
    } else {
      res.json({ message: 'Actualité supprimé.' });
    }
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la suppression de l'actualité." });
  }
});

module.exports = router;
