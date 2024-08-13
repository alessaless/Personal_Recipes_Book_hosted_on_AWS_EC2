import React, { useRef, useState } from 'react';
import Header from '../components/Header';
import Categories from '../components/Categories';
import ContainerRecipes from '../components/ContainerRecipes';

function RecipesPage() {
    const recipesRef = useRef(null);
    const [categories, setCategories] = useState([]);

    const updateRecipes = () => {
        if (recipesRef.current) {
            recipesRef.current.fetchRecipes();
        }
    };

    return (
        <div className='container ps-4 pe-4 pt-4'>
            <Header updateComponent={updateRecipes} />
            <ContainerRecipes ref={recipesRef} categories={categories} />
        </div>
    );
}

export default RecipesPage;
