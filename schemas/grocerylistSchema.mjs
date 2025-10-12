import mongoose from 'mongoose';

const groceryListSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    weekStart: {
        type: Date,
        required: true
    },
    items: {
        type: [String],
        required: true
    }
}, {
    timestamps: true
});

export default mongoose.model('GroceryList', groceryListSchema);

