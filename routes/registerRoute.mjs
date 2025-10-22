import express from "express";
import dotenv from 'dotenv';
import jwt from "jsonwebtoken";
import bcrypt from 'bcryptjs'
import User from "../schemas/userSchema.mjs";
import { check, validationResult } from 'express-validator';

dotenv.config();

const registerUser = express.Router();

registerUser.route('/')
    .post(
        [
            check("userName", "Please include a valid username").isLength({ min: 4 }),
            check("password", "Password must be at least 6 characters long").isLength(
                { min: 6 }
            ),
            check("email", "Please include a valid email").isEmail(),
        ],

        async (req, res) => {
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            try {
                const { name, email, password } = req.body;

                let user = await User.findOne({ email });

                if (user) {
                    return res.status(400).json({ errors: [{ msg: "User Exists" }] });
                }

                user = new User({
                    name,
                    email,
                    password,
                    wrongQuestions: [],
                });

                const salt = await bcrypt.genSalt(10);
                user.password = await bcrypt.hash(user.password, salt);

                await user.save();

                const payload = {
                    user: {
                        id: user._id,
                    },
                };

                jwt.sign(
                    payload,
                    process.env.jwtSecret,
                    { expiresIn: "6h" },
                    (err, token) => {
                        if (err) throw err;

                        res.status(201).json({ token });
                    }
                );
            } catch (err) {
                console.error(err.message);
                res.status(500).json({ errors: [{ msg: "Server Error" }] });
            }
        }
    )

export default registerUser;