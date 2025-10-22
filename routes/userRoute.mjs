import express from 'express';
import User from '../schemas/userSchema.mjs';
import auth from "../middleware/basicAuth.mjs";

const router = express.Router();

// Create user
router
    .route('/')
    .post(async (req, res) => {
        try {
            let newUser = await User.create(req.body);
            console.log(req.body);
            res.json(newUser);

        } catch (err) {
            console.error(err.message);
            res.status(500).json({ msg: `Error - ${err.message}` });
        }
    })

    // Get all users
    .get(async (req, res) => {
        try {
            let allUsers = await User.find({});

            res.json(allUsers);
        } catch (err) {
            console.error(err.message);
            res.status(500).json({ msg: `Error - ${err.message}` });
        }
    });


// GET Authenticated User
router
    .get("/me", auth, async (req, res) => {
        try {
            const user = await User.findById(req.user.id).select("-password");
            if (!user) {
                return res.status(404).json({ msg: "User not found" });
            }
            res.json(user);
        } catch (err) {
            console.error(err.message);
            res.status(500).json({ msg: "Server Error" });
        }
    });

// Get user by ID
router
    .route('/:id')
    .get(async (req, res) => {
        const user = await User.findOne({ id: req.params.id });
        if (!user) return res.status(404).json({ error: 'User not found' });
        res.json(user);
    })

    // Update user

    .put(async (req, res) => {
        try {
            let updateUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
            res.json(updateUser);

        } catch (err) {
            console.error(err);
            res.status(500).json({ msg: `Error - ${err.message}` });
        }
    })

    // Delete user
    .delete(async (req, res) => {
        try {
            let deleteUser = await User.findByIdAndDelete(req.params.id);
            res.json(deleteUser);
        } catch (err) {
            console.error(err);
            res.status(500).json({ msg: `Error - ${err.message}` });
        }
    });

export default router;
