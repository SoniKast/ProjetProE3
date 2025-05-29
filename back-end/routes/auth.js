// routes/auth.js
const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { administrateurs } = require("../models"); // adjust path to your models
const router = express.Router();

// Clé JWT
const JWT_SECRET = "openeventapi";

router.post("/login", async (req, res) => {
    const { email, mot_de_passe } = req.body;

    try {
        // Trouver utilisateur par mail
        const user = await administrateurs.findOne({ where: { email } });

        if (!user) {
            return res.status(401).json({ error: "Email ou mot de passe invalide" });
        }

        // Comparer MDP
        const match = await bcrypt.compare(mot_de_passe, user.mot_de_passe);
        if (!match) {
            return res.status(401).json({ error: "Email ou mot de passe invalide" });
        }

        // Créer token
        const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: "1h" });

        // Renvoyer un token et l'info utilisateur
        res.json({
            message: "Connexion réussie",
            token,
            user: {
                id: user.id,
                email: user.email,
            },
        });
    } catch (error) {
        console.error("Erreur de connexion:", error);
        res.status(500).json({ error: "Erreur interne du serveur" });
    }
});

module.exports = router;
