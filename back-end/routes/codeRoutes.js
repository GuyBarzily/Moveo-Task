const express = require('express');
const router = express.Router();
const Code = require('../models/Code');

/**
 * @swagger
 * /codes/get-titles:
 *   get:
 *     summary: Get all code titles
 *     tags:
 *       - Codes
 *     responses:
 *       '200':
 *         description: Successful response
 *       '500':
 *         description: Internal server error
 */
router.get('/codes/get-titles', async (req, res) => {
    try {
        const codeTitles = await Code.find({}, 'title');
        res.status(200).json(codeTitles);
    } catch (error) {
        console.error('Error fetching code titles:', error);
        res.status(500).send('Internal Server Error');
    }
});

/**
 * @swagger
 * /codes/title/{title}:
 *   get:
 *     summary: Get code by title
 *     tags:
 *       - Codes
 *     parameters:
 *       - in: path
 *         name: title
 *         required: true
 *         description: The title of the code
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Successful response
 *       '500':
 *         description: Internal server error
 */
router.get('/codes/title/:title', async (req, res) => {
    try {
        const { title } = req.params;
        const code = await Code.find({ title });
        res.status(200).json(code);
    } catch (error) {
        console.error('Error fetching code by title:', error);
        res.status(500).send('Internal Server Error');
    }
});

/**
 * @swagger
 * /codes:
 *   post:
 *     summary: Create a new code
 *     tags:
 *       - Codes
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               code:
 *                 type: string
 *               solution:
 *                 type: string
 *             required:
 *               - title
 *               - code
 *               - solution
 *     responses:
 *       '201':
 *         description: Code created successfully
 *       '400':
 *         description: Bad request
 *       '500':
 *         description: Internal server error
 */
router.post('/codes', async (req, res) => {
    const { title, code, solution } = req.body;

    try {
        const newCode = new Code({ title, code, solution });
        const savedCode = await newCode.save();

        res.status(201).json(savedCode);
    } catch (error) {
        console.error('Error saving code:', error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;
