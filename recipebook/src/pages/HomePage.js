import React , { useRef } from 'react';
import Header from '../components/Header';
import Searchbar from '../components/Searchbar';
import LastRecipes from '../components/LastRecipes';

function HomePage() {

    const lastRecipesRef = useRef(null);

    const updateLastRecipes = () => {
        if (lastRecipesRef.current) {
            lastRecipesRef.current.fetchLatestRecipes();
        }
    };

    return (
        <div className='container ps-4 pe-4 pt-4'>
            <Header updateComponent={updateLastRecipes}/>
            <Searchbar/>
            <LastRecipes ref={lastRecipesRef}/>
        </div>
    );
}

export default HomePage;
