const mongoose = require('mongoose');

const RecipeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    ingredients: {
        type: [String],
        required: true
    },
    procedure: {
        type: String,
        required: true
    },
    portions: {
        type: Number, // Cambiato da String a Number
        required: true
    },
    minutes: {
        type: Number, // Cambiato da String a Number
        required: true
    },
    category: {
        type: String,
        required: true
    },
    meal: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Recipe = mongoose.model('Recipe', RecipeSchema);

module.exports = Recipe;
