import React, { useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import RecipeBoxHomePage from './RecipeBoxHomePage';
import Categories from './Categories';

const ContainerRecipes = forwardRef((props, ref) => {
    const apiUrl = process.env.REACT_APP_API_URL;
    const [recipes, setRecipes] = useState([]);
    const [authToken, setAuthToken] = useState(localStorage.getItem('authToken') || ''); // Recupera il token dal localStorage
    const [selectedCategories, setSelectedCategories] = useState([]);

    const handleCategoriesChange = (categories) => {
        setSelectedCategories(categories);
    };

    useImperativeHandle(ref, () => ({
        fetchRecipes
    }));

    const fetchRecipes = () => {
        fetch(`${apiUrl}/data/filter-by-categories`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authToken}`
            },
            body: JSON.stringify({ categories: selectedCategories }) // Usa selectedCategories nel body
        })
        .then(response => response.json())
        .then(data => setRecipes(data))
        .catch(error => console.error('Error fetching recipes:', error));
    };

    // Optional: fetch recipes when selectedCategories changes
    useEffect(() => {
        fetchRecipes();
    }, [selectedCategories]); // Rinfresca i dati se selectedCategories cambia

    return (
        <div className='mt-3'>
            <Categories onCategoriesChange={handleCategoriesChange} />
            {recipes.length > 0 ? (
                recipes.map(recipe => (
                    <RecipeBoxHomePage
                        key={recipe._id}
                        id={recipe._id}
                        pasto={recipe.meal}
                        nomeRicetta={recipe.name}
                    />
                ))
            ) : (
                <h2>Non ci sono ricette di queste categorie...</h2>
            )}
        </div>
    );
});

export default ContainerRecipes;
