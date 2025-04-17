const Habit = require("../models/habitsModel");
const User = require("../models/userModel");
const { Op } = require("sequelize");
exports.createHabit = async (req, res) => {
    try {
        const { title, time, type, status } = req.body;
        const userId = req.params.userId;

        // Validate user exists
        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const habit = await Habit.create({ title, time, type, status, userId });
        res.status(201).json({ message: "Habit created", habit });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getUserHabits = async (req, res) => {
    try {
        const userId = req.params.userId;

        // Validate user exists
        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const habits = await Habit.findAll({ where: { userId } });
        res.status(200).json(habits);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getHabitsByDate = async (req, res) => {
    try {
      const { userId } = req.params; // userId from URL params
      const { date } = req.query; // date from query params
  
      if (!userId || !date) {
        return res.status(400).json({ message: 'userId and date are required' });
      }
  
      // Convert 'dd-mm-yyyy' to JS Date (start and end of the day)
      const [day, month, year] = date.split('-');
      const startDate = new Date(`${year}-${month}-${day}T00:00:00.000Z`);
      const endDate = new Date(`${year}-${month}-${day}T23:59:59.999Z`);
  
      // Fetch habits for the specific date and specific user
      const habits = await Habit.findAll({
        where: {
          userId: userId, // Ensuring the habits belong to the specific user
          createdAt: {
            [Op.between]: [startDate, endDate], // Habits created within this date range
          },
        },
      });
  
      // If no habits found for this user on the given date
      if (habits.length === 0) {
        return res.status(404).json({ message: 'No habits found for the given user on this date' });
      }
  
      res.json({ habits });
    } catch (err) {
      console.error('Error fetching habits by date:', err);
      res.status(500).json({ message: 'Server error' });
    }
  };
  // Update Habit
exports.updateHabit = async (req, res) => {
  try {
      const { habitId } = req.params;
      const { title, time, type, status } = req.body;

      const habit = await Habit.findByPk(habitId);
      if (!habit) {
          return res.status(404).json({ message: "Habit not found" });
      }

      // Update habit fields
      habit.title = title ?? habit.title;
      habit.time = time ?? habit.time;
      habit.type = type ?? habit.type;
      habit.status = status ?? habit.status;

      await habit.save();

      res.status(200).json({ message: "Habit updated", habit });
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
};

// Delete Habit
exports.deleteHabit = async (req, res) => {
  try {
      const { habitId } = req.params;

      const habit = await Habit.findByPk(habitId);
      if (!habit) {
          return res.status(404).json({ message: "Habit not found" });
      }

      await habit.destroy();

      res.status(200).json({ message: "Habit deleted successfully" });
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
};
