import express from "express";
import { db } from "./db/drizzle";

import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";
import { logger } from "./winston";

const app = express();

app.use(express.json());

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Express API con Swagger",
      version: "1.0.0",
    },
    components: {
      schemas: {
        Badge: {
          type: "object",
          properties: {
            id: {
              type: "number",
              description: "Identificador de la insignia",
            },
            code: {
              type: "string",
              description: "Código de la insignia",
            },
            visible: {
              type: "boolean",
              description: "Indica si la insignia es visible",
            },
          },
        },
      },
    },
  },
  apis: ["./**/*.ts"],
};

const specs = swaggerJsdoc(options);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

/**
 * @swagger
 * /:
 *   get:
 *     summary: Recupera una lista de insignias
 *     tags: [Badges]
 *     description: Recupera una lista de todas las insignias disponibles
 *     responses:
 *       200:
 *         description: La lista de insignias
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: 'src/components/schemas/Badge'
 *             examples:
 *               Badges:
 *                 value:
 *                   - id: "1"
 *                     code: "badge-1"
 *                     visible: true
 */
app.get("/", (req, res) => {
  db.query.badge.findMany().then((badges) => {
    res.send(badges);
  });
});

app.listen(3000, () => {
  logger.error("Server listening on port 3000");
});
