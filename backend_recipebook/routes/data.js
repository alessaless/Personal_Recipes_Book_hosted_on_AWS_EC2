const express = require('express');
const router = express.Router();
const Recipe = require('../models/data');

// Rotta per inserire una nuova ricetta
router.post('/', async (req, res) => {
    try {
        const { name, ingredients, procedure, portions, minutes, category, meal } = req.body;

        // Verifica che gli ingredienti siano un array
        if (!Array.isArray(ingredients)) {
            return res.status(400).json({ error: 'Ingredients must be an array of strings' });
        }

        const newRecipe = new Recipe({
            name,
            ingredients,
            procedure,
            portions,
            minutes,
            category,
            meal
        });

        const recipe = await newRecipe.save();
        res.json(recipe);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Rotta per ottenere ricette in base alle categorie
router.post('/filter-by-categories', async (req, res) => {
    try {
        const { categories } = req.body;

        // Verifica se categories è un array e non è vuoto
        if (!Array.isArray(categories) || categories.length === 0) {
            // Se categories non è un array o è vuoto, restituisce tutte le ricette
            const recipes = await Recipe.find();
            return res.json(recipes);
        }

        // Se categories è un array non vuoto, trova le ricette con le categorie specificate
        const recipes = await Recipe.find({ category: { $in: categories } });
        res.json(recipes);
    } catch (err) {
        // Gestione degli errori
        console.error(err);  // Aggiunge un log dell'errore per debug
        res.status(500).json({ error: err.message });
    }
});

// Rotta per ottenere le ultime 3 ricette inserite
router.get('/latest', async (req, res) => {
    try {
        const latestRecipes = await Recipe.find().sort({ createdAt: -1 }).limit(3);
        res.json(latestRecipes);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Rotta per ottenere una ricetta dato il suo ID
router.get('/:id', async (req, res) => {
    try {
        const recipe = await Recipe.findById(req.params.id);
        if (!recipe) {
            return res.status(404).json({ error: 'Recipe not found' });
        }
        res.json(recipe);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Elimina una ricetta esistente
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
  
    try {
      const deletedRecipe = await Recipe.findByIdAndDelete(id);
  
      if (!deletedRecipe) {
        return res.status(404).json({ message: 'Ricetta non trovata' });
      }
  
      res.json({ message: 'Ricetta eliminata con successo' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Errore del server' });
    }
});

// Modifica una ricetta esistente
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { name, ingredients, category, meal, procedure, portions, minutes } = req.body;

    // Recupera la ricetta esistente
    try {
      let updatedRecipe = await Recipe.findById(id);
  
      if (!updatedRecipe) {
        return res.status(404).json({ message: 'Ricetta non trovata' });
      }
  
      // Aggiorna i dati della ricetta
      updatedRecipe.name = name || updatedRecipe.name;
      updatedRecipe.ingredients = ingredients || updatedRecipe.ingredients;
      updatedRecipe.category = category || updatedRecipe.category;
      updatedRecipe.meal = meal || updatedRecipe.meal;
      updatedRecipe.procedure = procedure || updatedRecipe.procedure;
      updatedRecipe.portions = portions || updatedRecipe.portions;
      updatedRecipe.minutes = minutes || updatedRecipe.minutes;

      // Salva le modifiche
      await updatedRecipe.save();
  
      res.json(updatedRecipe);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Errore del server' });
    }
});


// Rotta per cercare ricette tramite nome
router.post('/search-by-name', async (req, res) => {
    try {
        const { name } = req.body;

        if (!name) {
            return res.status(400).json({ error: 'Recipe name is required' });
        }

        // Trova ricette che contengono il nome specificato (case-insensitive)
        const recipes = await Recipe.find({ name: new RegExp(name, 'i') });

        if (recipes.length === 0) {
            return res.status(404).json({ message: 'No recipes found' });
        }

        res.status(200).json(recipes);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});



module.exports = router;
