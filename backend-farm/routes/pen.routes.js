//Llamada al controlador
const PenController = require('../controllers/pen.controller');

//Creación de las rutas de acuerdo a los métodos del controlador
module.exports = function(app){
    /**
     * @openapi
     * /api/pens/:
     *   get:
     *     summary: Obtiene el listado de los corrales
     *     tags:
     *       - Pen
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
     *                     $ref: "#/components/schemas/Pen"
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
     */
    app.get('/api/pens', PenController.getAllPens);

    /**
     * @openapi
     * /api/pen/new:
     *   post:
     *     summary: Agrega un nuevo corral
     *     tags:
     *       - Pen
     *     parameters:
     *       - in: body
     *         name: pen
     *         schema:
     *           $ref: "#/components/schemas/Pen"
     *         description: Pen Schema
     *     responses:
     *       200:
     *         description: Sucessful pen creation
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 msg:
     *                   type: string
     *                   example: Sucessful pen creation
     *                 data:
     *                   type: array 
     *                   items: 
     *                     $ref: "#/components/schemas/Pen"
     *       400:
     *         description: Pen not created
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 msg:
     *                   type: string
     *                   example: Pen not created
     * 
     */
    app.post('/api/pen/new', PenController.createPen);

    /**
     * @openapi
     * /api/pen/{id}:
     *   put:
     *     summary: Actualiza un corral
     *     tags:
     *       - Pen
     *     parameters:
     *       - in: path
     *         name: _id
     *         schema:
     *           type: string
     *         description: Pen Id
     *       - in: body
     *         name: pen
     *         schema:
     *           $ref: "#/components/schemas/Pen"
     *         description: Pen Schema
     *     responses:
     *       200:
     *         description: Update pen
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 msg:
     *                   type: string
     *                   example: Update pen
     *                 data:
     *                   type: array 
     *                   items: 
     *                     $ref: "#/components/schemas/Pen"
     *       400:
     *         description: Pen not updated
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 msg:
     *                   type: string
     *                   example: Pen not updated
     * 
     */
    app.put('/api/pen/:id', PenController.updatePen);
}