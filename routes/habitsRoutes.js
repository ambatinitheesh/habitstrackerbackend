const express = require("express");
const router = express.Router();
const habitsController = require("../controllers/habitsController");

/**
 * @swagger
 * components:
 *   schemas:
 *     Habit:
 *       type: object
 *       required:
 *         - title
 *         - time
 *         - type
 *         - status
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto-generated ID of the habit
 *         title:
 *           type: string
 *           description: The habit title
 *         time:
 *           type: string
 *           description: The time of the habit
 *         type:
 *           type: string
 *           description: The type of habit (e.g., exercise, reading)
 *         status:
 *           type: boolean
 *           description: The habit completion status
 */

/**
 * @swagger
 * /habits:
 *   post:
 *     summary: Create a new habit
 *     tags: [Habits]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Habit'
 *     responses:
 *       201:
 *         description: Habit Created
 *       500:
 *         description: Server Error
 */
router.post("/habits", habitsController.createHabit);

/**
 * @swagger
 * /habits:
 *   get:
 *     summary: Get all habits
 *     tags: [Habits]
 *     responses:
 *       200:
 *         description: List of habits
 *       500:
 *         description: Server Error
 */
router.get("/habits", habitsController.getAllHabits);

/**
 * @swagger
 * /habits/{id}:
 *   get:
 *     summary: Get habit by ID
 *     tags: [Habits]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Habit Found
 *       404:
 *         description: Habit Not Found
 */
router.get("/habits/:id", habitsController.getHabitById);

/**
 * @swagger
 * /habits/{id}:
 *   put:
 *     summary: Update habit by ID
 *     tags: [Habits]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Habit'
 *     responses:
 *       200:
 *         description: Habit Updated
 *       404:
 *         description: Habit Not Found
 */
router.put("/habits/:id", habitsController.updateHabit);

/**
 * @swagger
 * /habits/{id}:
 *   delete:
 *     summary: Delete habit by ID
 *     tags: [Habits]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Habit Deleted
 *       404:
 *         description: Habit Not Found
 */
router.delete("/habits/:id", habitsController.deleteHabit);

module.exports = router;
