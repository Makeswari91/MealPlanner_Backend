import express from 'express';
import GroceryList from '../schemas/grocerylistSchema.mjs';

const router = express.Router();

router.route('/')
    .post(async (req, res) => {
        try {
            const { userId, weekStart, items } = req.body;
            const groceryList = new GroceryList({ userId, weekStart, items });
            await groceryList.save();
            res.status(201).json(groceryList);
        } catch (err) {
            console.error(err.message);
            res.status(500).json({ msg: `Error - ${err.message}` });
        }
    })
    .get(async (req, res) => {
        try {
            const { userId } = req.query;
            const query = userId ? { userId } : {};
            const lists = await GroceryList.find(query).sort({ weekStart: -1 });
            res.json(lists);
        } catch (err) {
            console.error(err.message);
            res.status(500).json({ msg: `Error - ${err.message}` });
        }
    });

router
    .route('/:id')
    .get(async (req, res) => {
        try {
            const list = await GroceryList.findById(req.params.id);
            if (!list) return res.status(404).json({ error: 'List not found' });
            res.json(list);
        } catch (err) {
            console.error(err.message);
            res.status(500).json({ msg: `Error - ${err.message}` });
        }
    })
    .put(async (req, res) => {
        try {
            const updatedList = await GroceryList.findByIdAndUpdate(
                req.params.id,
                req.body,
                { new: true, runValidators: true }
            );
            if (!updatedList) return res.status(404).json({ error: 'List not found' });
            res.json(updatedList);
        } catch (err) {
            console.error(err.message);
            res.status(500).json({ msg: `Error - ${err.message}` });
        }
    })
    .delete(async (req, res) => {
        try {
            const deletedList = await GroceryList.findByIdAndDelete(req.params.id);
            if (!deletedList) return res.status(404).json({ error: 'List not found' });
            res.json({ message: 'List deleted successfully' });
        } catch (err) {
            console.error(err.message);
            res.status(500).json({ msg: `Error - ${err.message}` });
        }
    })

export default router;