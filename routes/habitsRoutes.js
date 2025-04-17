const express = require("express");
const router = express.Router();
const habitController = require("../controllers/habitsController");

/**
 * @swagger
 * /users/{userId}/habits:
 *   post:
 *     summary: Add a new habit for a user
 *     tags: [Habits]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - time
 *               - type
 *             properties:
 *               title:
 *                 type: string
 *               time:
 *                 type: string
 *               type:
 *                 type: string
 *               status:
 *                 type: boolean
 *     responses:
 *       201:
 *         description: Habit created
 *       404:
 *         description: User not found
 */
router.post("/users/:userId/habits", habitController.createHabit);

/**
 * @swagger
 * /users/{userId}/habits:
 *   get:
 *     summary: Get all habits for a user
 *     tags: [Habits]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the user
 *     responses:
 *       200:
 *         description: List of user's habits
 *       404:
 *         description: User not found
 */
router.get("/users/:userId/habits", habitController.getUserHabits);
/**
 * @swagger
 * /users/{userId}/get-by-date:
 *   get:
 *     summary: Get habits by date for a user
 *     description: Fetch habits created by a specific user on a given date.
 *     tags:
 *       - Habits
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the user
 *       - in: query
 *         name: date
 *         required: true
 *         schema:
 *           type: string
 *           format: date
 *         description: The date in dd-mm-yyyy format
 *     responses:
 *       200:
 *         description: List of habits for the specified date
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 habits:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                       title:
 *                         type: string
 *                       userId:
 *                         type: integer
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *       400:
 *         description: Bad request if userId or date are missing
 *       500:
 *         description: Server error
 */
router.get('/users/:userId/get-by-date', habitController.getHabitsByDate);

/**
 * @swagger
 * /habits/{habitId}:
 *   put:
 *     summary: Update a habit
 *     tags: [Habits]
 *     parameters:
 *       - in: path
 *         name: habitId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the habit
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               time:
 *                 type: string
 *               type:
 *                 type: string
 *               status:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Habit updated successfully
 *       404:
 *         description: Habit not found
 */
router.put("/habits/:habitId", habitController.updateHabit);

/**
 * @swagger
 * /habits/{habitId}:
 *   delete:
 *     summary: Delete a habit
 *     tags: [Habits]
 *     parameters:
 *       - in: path
 *         name: habitId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the habit
 *     responses:
 *       200:
 *         description: Habit deleted successfully
 *       404:
 *         description: Habit not found
 */
router.delete("/habits/:habitId", habitController.deleteHabit);

module.exports = router;
