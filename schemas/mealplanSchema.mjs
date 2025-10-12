import mongoose from "mongoose";

const mealPlanSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    weekStart: {
        type: Date,
        required: true
    },
    meals: [
        {
            day: {
                type: String,
                required: true
            },
            breakfast: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Recipe'
            },
            lunch: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Recipe'
            },
            dinner: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Recipe'
            }
        }
    ]
}, {
    timestamps: true
});

export default mongoose.model('MealPlan', mealPlanSchema);
