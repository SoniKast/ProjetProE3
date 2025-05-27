const { administrateurs } = require("./models");
const bcrypt = require("bcrypt");

async function hashPasswords() {
    const users = await administrateurs.findAll();

    for (const user of users) {
        const password = user.mot_de_passe;

        // Skip if already hashed (a very simple heuristic)
        if (password.startsWith("$2b$")) continue;

        const hashed = await bcrypt.hash(password, 10);
        user.mot_de_passe = hashed;
        await user.save();

        console.log(`Hashed password for user ${user.email}`);
    }

    console.log("Migration complete.");
    process.exit(0);
}

hashPasswords().catch((err) => {
    console.error(err);
    process.exit(1);
});