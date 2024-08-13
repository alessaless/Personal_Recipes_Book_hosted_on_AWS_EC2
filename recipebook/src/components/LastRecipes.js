import React, { useImperativeHandle, useState, forwardRef, useEffect } from 'react';
import '../styles/LastRecipes.css';
import RecipeBoxHomePage from './RecipeBoxHomePage';
import { Link } from 'react-router-dom';

const LastRecipes = forwardRef((props, ref) => {
    const apiUrl = process.env.REACT_APP_API_URL;
    const [recipes, setRecipes] = useState([]);
    const [authToken, setAuthToken] = useState(localStorage.getItem('authToken') || ''); // Recupera il token dal localStorage

    useImperativeHandle(ref, () => ({
        fetchLatestRecipes
    }));

    const fetchLatestRecipes = () => {
        fetch(`${apiUrl}/data/latest`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${authToken}`,
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => setRecipes(data))
        .catch(error => console.error('Error fetching latest recipes:', error));
    };

    useEffect(() => {
        fetchLatestRecipes();
    }, [authToken]); // Refetch recipes if authToken changes

    return (
        <div className='row mt-4'>
            <div className='col-12'>
                <div className='row'>
                    <div className='col-10'>
                        <h3 className='text-start'>Ultime ricette: </h3>
                    </div>
                    <div className='col-2 verticallyCentered'>
                        <Link to="/ricette" className='link'>
                            <h6 className='text-start link'>Tutte </h6>
                        </Link>
                    </div>
                </div>
                <div className='ContainerRecipes mt-4'>
                    {recipes.map(recipe => (
                        <RecipeBoxHomePage
                            key={recipe._id}
                            id={recipe._id}
                            pasto={recipe.meal}
                            nomeRicetta={recipe.name}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
});

export default LastRecipes;
