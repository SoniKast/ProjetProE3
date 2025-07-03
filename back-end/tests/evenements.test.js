const request = require("supertest");
const app = require("../app.js");

describe("POST /api/evenements", () => {
  it("devrait refuser si les données sont incomplètes", async () => {
    const res = await request(app)
      .post("/api/evenements")
      .send({}); // données vides

    expect(res.statusCode).toBe(500);
    expect(res.text).toMatch(/Erreur dans la création de l'évènement./i);
  });

  it("devrait créer un événement avec données valides", async () => {
    const res = await request(app)
      .post("/api/evenements")
      .send({
        titre: "Conférence 2025",
        description: "Un grand événement",
        description_detail: "Avec beaucoup d’intervenants",
        date_debut: "2025-07-01",
        date_fin: "2025-07-02",
        categorie: "Tech"
      });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("id");
    expect(res.body.titre).toBe("Conférence 2025");
  });
});

describe("PUT /api/evenements", () => { 
  it("devrait modifier un évènement avec des données valides", async () => {
    const res = await request(app)
      .post("/api/evenements")
      .send({
        titre: "Salon 2025",
        description: "Salon annuel",
        description_detail: "Avec exposants et keynotes",
        date_debut: "2025-09-10",
        date_fin: "2025-09-12",
        categorie: "Business"
      });

    expect(res.statusCode).toBe(200);

    // Étape 2 : Modifier l'événement créé
    const modification = await request(app)
      .put("/api/evenements/1")
      .send({
        titre: "Salon International 2025",
        description: "Salon mondial",
        description_detail: "Encore plus d'exposants",
        date_debut: "2025-09-11",
        date_fin: "2025-09-13",
        categorie: "International"
      });

    expect(modification.statusCode).toBe(200);
    expect(modification.body.titre).toBe("Salon International 2025");
  });
});

describe("PUT /api/evenements", () => {
  it("devrait refuser la modification si l'ID est invalide", async () => {
    const res = await request(app)
      .put("/api/evenements/id-inexistant-123")
      .send({
        titre: "Essai d'échec"
      });

    expect(res.statusCode).toBe(404);
    expect(res.text).toMatch(/Évènement non trouvé./i);
  });
});