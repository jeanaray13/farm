//Llamada al controlador
const AnimalController = require('../controllers/animal.controller');

//Creación de las rutas de acuerdo a los métodos del controlador
module.exports = function(app){
    /**
     * @openapi
     * /api/animalsType/{type}:
     *   get:
     *     summary: Obtiene un animal de acuerdo al tipo de peligrosidad
     *     tags:
     *       - Animal
     *     parameters:
     *       - in: path
     *         name: type
     *         schema:
     *           type: string
     *         description: Type
     *     responses:
     *       200:
     *         description: OK
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 status:
     *                   type: string
     *                   example: OK
     *                 data:
     *                   type: array 
     *                   items: 
     *                     $ref: "#/components/schemas/Animal"
     *       400:
     *         description: FAILED
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 status:
     *                   type: string
     *                   example: FAILED
     *       404:
     *         description: No animals found with the specified type.
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 status:
     *                   type: string
     *                   example: No animals found with the specified type.
     */
    app.get('/api/animalsType/:type', AnimalController.getAnimalsByType);

    /**
     * @openapi
     * /api/animalsPen/{pen}:
     *   get:
     *     summary: Obtiene los animales por corral
     *     tags:
     *       - Animal
     *     parameters:
     *       - in: path
     *         name: pen_id
     *         schema:
     *           type: string
     *         description: Pen Id
     *     responses:
     *       200:
     *         description: OK
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 status:
     *                   type: string
     *                   example: OK
     *                 data:
     *                   type: array 
     *                   items: 
     *                     $ref: "#/components/schemas/Animal"
     *       400:
     *         description: FAILED
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 status:
     *                   type: string
     *                   example: FAILED
     *       404:
     *         description: No animals found with the specified type.
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 status:
     *                   type: string
     *                   example: No animals found with the specified type.
     */
    app.get('/api/animalsPen/:pen', AnimalController.getAnimalsByPen);

    /**
     * @openapi
     * /api/animalsPen/average/{pen}:
     *   get:
     *     summary: Obtiene el promedio de edad de los animales en un corral
     *     tags:
     *       - Animal
     *     parameters:
     *       - in: path
     *         name: pen_id
     *         schema:
     *           type: string
     *         description: Pen Id
     *     responses:
     *       200:
     *         description: OK
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 status:
     *                   type: string
     *                   example: OK
     *                 data:
     *                   type: number
     *                   example: 2.50
     *       400:
     *         description: FAILED
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 status:
     *                   type: string
     *                   example: FAILED
     *       404:
     *         description: No animals found with the specified type.
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 status:
     *                   type: string
     *                   example: No animals found with the specified type.
     */
    app.get('/api/animalsPen/average/:pen', AnimalController.getAverage);

    /**
     * @openapi
     * /api/animal/new:
     *   post:
     *     summary: Agrega un nuevo animal
     *     tags:
     *       - Animal
     *     parameters:
     *       - in: body
     *         name: animal
     *         schema:
     *           $ref: "#/components/schemas/Animal"
     *         description: Animal Schema
     *     responses:
     *       200:
     *         description: Sucessful animal creation
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 msg:
     *                   type: string
     *                   example: Sucessful animal creation
     *                 data:
     *                   type: array 
     *                   items: 
     *                     $ref: "#/components/schemas/Animal"
     *       400:
     *         description: Animal not created
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 msg:
     *                   type: string
     *                   example: Animal not created
     * 
     */
    app.post('/api/animal/new', AnimalController.createAnimal);

    /**
     * @openapi
     * /api/animal/{id}:
     *   put:
     *     summary: Actualiza un animal
     *     tags:
     *       - Animal
     *     parameters:
     *       - in: path
     *         name: _id
     *         schema:
     *           type: string
     *         description: Animal Id
     *       - in: body
     *         name: animal
     *         schema:
     *           $ref: "#/components/schemas/Animal"
     *         description: Animal Schema
     *     responses:
     *       200:
     *         description: Update animal
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 msg:
     *                   type: string
     *                   example: Update animal
     *                 data:
     *                   type: array 
     *                   items: 
     *                     $ref: "#/components/schemas/Animal"
     *       400:
     *         description: Animal not updated
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 msg:
     *                   type: string
     *                   example: Animal not updated
     * 
     */
    app.put('/api/animal/:id', AnimalController.updateAnimal);
}