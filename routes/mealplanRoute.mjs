import express from "express";
import MealPlan from "../schemas/mealplanSchema.mjs";

const router = express.Router();

router
    .route('/')
    .post(async (req, res) => {
        try {
            const savedMealPlan = await MealPlan.create(req.body);
            console.log('Meal plan created:', req.body);
            res.status(201).json(savedMealPlan);
        } catch (err) {
            console.error('Meal plan creation error:', err.message);
            res.status(500).json({ msg: `Error - ${err.message}` });
        }
    })
    .get(async (req, res) => {
        try {
            const mealPlans = await MealPlan.find();
            res.json(mealPlans);
        } catch (err) {
            console.error('Error fetching meal plans:', err.message);
            res.status(500).json({ msg: `Error - ${err.message}` });
        }
    });
router
    .route('/:id')
    .get(async (req, res) => {
        try {
            const mealPlan = await MealPlan.findById(req.params.id);
            if (!mealPlan) return res.status(404).json({ msg: 'Meal plan not found' });
            res.json(mealPlan);
        } catch (err) {
            console.error('Error fetching meal plan:', err.message);
            res.status(500).json({ msg: `Error - ${err.message}` });
        }
    })
    .put(async (req, res) => {
        try {
            const updatedMealPlan = await MealPlan.findByIdAndUpdate(req.params.id, req.body, {
                new: true,
                runValidators: true
            });
            if (!updatedMealPlan) return res.status(404).json({ msg: 'Meal plan not found' });
            res.json(updatedMealPlan);
        } catch (err) {
            console.error('Error updating meal plan:', err.message);
            res.status(400).json({ msg: `Error - ${err.message}` });
        }
    })
    .delete(async (req, res) => {
        try {
            const deletedMealPlan = await MealPlan.findByIdAndDelete(req.params.id);
            if (!deletedMealPlan) return res.status(404).json({ msg: 'Meal plan not found' });
            res.json({ msg: 'Meal plan deleted successfully' });
        } catch (err) {
            console.error('Error deleting meal plan:', err.message);
            res.status(500).json({ msg: `Error - ${err.message}` });
        }
    })

export default router;



