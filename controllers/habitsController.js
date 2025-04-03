const Habit = require("../models/habitsModel");

// ✅ CREATE HABIT
exports.createHabit = async (req, res) => {
    try {
        const habit = await Habit.create(req.body);
        res.status(201).json({ message: "Habit Created", habit });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// ✅ GET ALL HABITS
exports.getAllHabits = async (req, res) => {
    try {
        const habits = await Habit.findAll();
        res.status(200).json(habits);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// ✅ GET HABIT BY ID
exports.getHabitById = async (req, res) => {
    try {
        const habit = await Habit.findByPk(req.params.id);
        if (habit) {
            res.status(200).json(habit);
        } else {
            res.status(404).json({ message: "Habit Not Found" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// ✅ UPDATE HABIT
exports.updateHabit = async (req, res) => {
    try {
        const habit = await Habit.findByPk(req.params.id);
        if (habit) {
            await habit.update(req.body);
            res.status(200).json({ message: "Habit Updated", habit });
        } else {
            res.status(404).json({ message: "Habit Not Found" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// ✅ DELETE HABIT
exports.deleteHabit = async (req, res) => {
    try {
        const deleted = await Habit.destroy({ where: { id: req.params.id } });
        if (deleted) {
            res.status(200).json({ message: "Habit Deleted" });
        } else {
            res.status(404).json({ message: "Habit Not Found" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
