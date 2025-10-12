import express from 'express';
import Recipe from '../schemas/recipeSchema.mjs';

const router = express.Router();

router
    .route('/')
    .post(async (req, res) => {
        try {
            let recipe = await Recipe.create(req.body);
            let savedRecipe = await recipe.save();
            res.status(201).json(savedRecipe);
        } catch (err) {
            console.error(err.message);
            res.status(500).json({ msg: `Error - ${err.message}` });
        }
    })

    .get(async (req, res) => {
        try {
            let recipes = await Recipe.find();
            res.json(recipes);
        } catch (err) {
            console.error(err.message);
            res.status(500).json({ msg: `Error - ${err.message}` });
        }
    })

router
    .route('/:id')
    .get(async (req, res) => {
        try {
            const recipe = await Recipe.findById(req.params.id);
            if (!recipe) return res.status(404).json({ error: 'Recipe not found' });
            res.json(recipe);
        } catch (err) {
            console.error(err.message);
            res.status(500).json({ msg: `Error - ${err.message}` });
        }
    })
    .put(async (req, res) => {
        try {
            const updatedRecipe = await Recipe.findByIdAndUpdate(req.params.id, req.body, {
                new: true,
                runValidators: true
            });
            if (!updatedRecipe) return res.status(404).json({ error: 'Recipe not found' });
            res.json(updatedRecipe);
        } catch (err) {
            console.error(err.message);
            res.status(500).json({ msg: `Error - ${err.message}` });
        }
    })
    .delete(async (req, res) => {
        try {
            const deletedRecipe = await Recipe.findByIdAndDelete(req.params.id);
            if (!deletedRecipe) return res.status(404).json({ error: 'Recipe not found' });
            res.json({ message: 'Recipe deleted successfully' });
        } catch (err) {
            console.error(err.message);
            res.status(500).json({ msg: `Error - ${err.message}` });
        }
    })

export default router;

