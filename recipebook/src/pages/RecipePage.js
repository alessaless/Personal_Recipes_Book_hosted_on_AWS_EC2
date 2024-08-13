import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../styles/RecipePage.css';
import FavouriteButton from '../components/FavouriteButton';
import DropDownMenu from '../components/DropDownMenu';
import BackButton from '../components/BackButton';

function RecipePage() {
    const apiUrl = process.env.REACT_APP_API_URL;
    const { id } = useParams();  
    const [recipe, setRecipe] = useState(null); 
    const [authToken, setAuthToken] = useState(localStorage.getItem('authToken') || ''); // Recupera il token dal localStorage


    const fetchRecipe = () => {
        // Effettua la fetch dei dati della ricetta
        fetch(`${apiUrl}/data/${id}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${authToken}`, // Aggiungi il token qui
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => setRecipe(data))
        .catch(error => {
            console.error('Error fetching recipe:', error);
        });
    };
    

    useEffect(() => {
        fetchRecipe();
    }, [id]);

    const styleTopSection = {
        backgroundImage: 'url(https://wips.plug.it/cips/buonissimo.org/cms/2023/09/cucina-gourmet.jpg?w=713&a=c&h=407)',
    };

    if (!recipe) {
        return <div className='recipe-page' />;
    }

    return (
        <div className='recipe-page'>
            <div style={styleTopSection} className='top-section'>
                <div className='overlay ps-4 pe-4 pt-4'>
                    <div className='actionButtonContainer'>
                        <BackButton />
                        <DropDownMenu recipeId={id} onSave={fetchRecipe} />
                    </div>

                    <div className='infoRecipe'>
                        <h4 className="text-start recipeInfoSubTitle">{recipe.meal}</h4>
                        <h1 className="text-start recipeInfoTitle">{recipe.name}</h1>
                    </div>
                </div>
            </div>

            <div className='bottomParte'>
                <div className='detailsRecipe ps-4 pe-4 pt-4'>
                    <div className='col-4'>
                        <h4 className="text-start detailSubTitle">Tempo:</h4>
                        <h1 className="text-start detailTitle">{recipe.minutes} min</h1>
                    </div>
                    <div className='col-4'>
                        <h4 className="text-start detailSubTitle">Porzioni</h4>
                        <h1 className="text-start detailTitle">{recipe.portions} persone</h1>
                    </div>
                </div>

                <div className='bottom-section ps-4 pe-4 pt-4'>
                    <h1 className="text-start labelTitle">Ingredienti</h1>
                    <ul className='ingredient-list'>
                        {recipe.ingredients.map((ingredient, index) => (
                            <li key={index}>{ingredient}</li>
                        ))}
                    </ul>
                    <h1 className="text-start labelTitle">Procedimento</h1>
                    <p className="text-break">
                        {recipe.procedure}
                    </p>
                </div>
            </div>
        </div>
    );
}

export default RecipePage;
