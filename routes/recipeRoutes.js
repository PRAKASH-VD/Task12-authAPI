const express = require('express');
const Recipe = require('../models/Recipe');
const router = express.Router();

// @route GET /api/recipes
// @desc Get all recipes
router.get('/', async (req, res) => {
  try {
    const recipes = await Recipe.find();
    res.json(recipes);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching recipes', error });
  }
});

// @route GET /api/recipes/:id
// @desc Get a single recipe by ID
router.get('/:id', async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) return res.status(404).json({ message: 'Recipe not found' });
    res.json(recipe);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching recipe', error });
  }
});

// @route POST /api/recipes
// @desc Create a new recipe
router.post('/', async (req, res) => {
  try {
    const { title, ingredients, instructions } = req.body;
    const newRecipe = await Recipe.create({ title, ingredients, instructions });
    res.status(201).json(newRecipe);
  } catch (error) {
    res.status(500).json({ message: 'Error creating recipe', error });
  }
});

// @route PUT /api/recipes/:id
// @desc Update a recipe by ID
router.put('/:id', async (req, res) => {
  try {
    const { title, ingredients, instructions } = req.body;
    const updatedRecipe = await Recipe.findByIdAndUpdate(
      req.params.id,
      { title, ingredients, instructions },
      { new: true }
    );
    if (!updatedRecipe) return res.status(404).json({ message: 'Recipe not found' });
    res.json(updatedRecipe);
  } catch (error) {
    res.status(500).json({ message: 'Error updating recipe', error });
  }
});

// @route DELETE /api/recipes/:id
// @desc Delete a recipe by ID
router.delete('/:id', async (req, res) => {
  try {
    const deletedRecipe = await Recipe.findByIdAndDelete(req.params.id);
    if (!deletedRecipe) return res.status(404).json({ message: 'Recipe not found' });
    res.json({ message: 'Recipe deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting recipe', error });
  }
});

module.exports = router;
