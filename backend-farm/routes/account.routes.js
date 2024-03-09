//Llamada al controlador
const AccountController = require('../controllers/account.controller');

//Creación de las rutas de acuerdo a los métodos del controlador
module.exports = function(app){
    /**
     * @openapi
     * /api/account/new:
     *   post:
     *     summary: Crea una cuenta
     *     tags:
     *       - Account
     *     parameters:
     *       - in: body
     *         name: account
     *         schema:
     *           $ref: "#/components/schemas/Account"
     *         description: Account Schema
     *     responses:
     *       200:
     *         description: Sucessful creation
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 msg:
     *                   type: string
     *                   example: Sucessful creation
     *                 data:
     *                   type: array 
     *                   items: 
     *                     $ref: "#/components/schemas/Account"
     */
    app.post('/api/account/new', AccountController.createAccount);

    /**
     * @openapi
     * /api/account/login:
     *   post:
     *     summary: Verifica si las credenciales existen
     *     tags:
     *       - Account
     *     parameters:
     *       - in: body
     *         name: account
     *         schema:
     *           $ref: "#/components/schemas/Account"
     *         description: Account Schema
     *     responses:
     *       200:
     *         description: Login Success
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 msg:
     *                   type: string
     *                   example: Sucessful creation
     *                 data:
     *                   type: array 
     *                   items: 
     *                     $ref: "#/components/schemas/Account"
     *       400:
     *         description: Account not exist/Invalid Password
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 msg:
     *                   type: string
     *                   example: Account not exist/Invalid Password
     */
    app.post('/api/account/login', AccountController.verifyAccount);
}