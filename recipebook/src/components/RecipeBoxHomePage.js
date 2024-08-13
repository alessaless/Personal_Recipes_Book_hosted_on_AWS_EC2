import React from 'react';
import '../styles/LastRecipes.css';
import { Link } from 'react-router-dom';

function RecipeBoxHomePage(props) {
    const recipeLink = `/ricetta/${props.id}`;

    return (
        <Link to={recipeLink} className='col-12 recipeBox link'>
            <div className='col-12 recipeInformationContainer ps-3'>
                <h6 className='recipeSubTitle'>{props.pasto}</h6>
                <h5 className='recipeTitle'>{props.nomeRicetta}</h5>
            </div>         
        </Link>
    );
}

export default RecipeBoxHomePage;
