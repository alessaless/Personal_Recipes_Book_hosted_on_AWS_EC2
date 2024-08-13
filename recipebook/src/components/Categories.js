import React, { useState } from 'react';
import '../styles/Category.css';
import Category from './Category';
import { faMugSaucer, faDrumstickBite, faBurger, faBowlRice, faPizzaSlice, faCookieBite, faCakeCandles } from '@fortawesome/free-solid-svg-icons';

const categories = [
    { icon: faMugSaucer, name: "Bevande" },
    { icon: faDrumstickBite, name: "Secondi" },
    { icon: faBurger, name: "Pane" },
    { icon: faBowlRice, name: "Primi" },
    { icon: faPizzaSlice, name: "Pizza e focacce" },
    { icon: faCookieBite, name: "Biscotti" },
    { icon: faCakeCandles, name: "Torte" },
    { icon: "More", name: "Altro", bgcolor: "#FE7F22" }
];

function Categories({ onCategoriesChange }) {
    const [selectedCategories, setSelectedCategories] = useState([]);

    const handleCategoryClick = (name) => {
        setSelectedCategories(prev => {
            const isSelected = prev.includes(name);
            const updatedCategories = isSelected
                ? prev.filter(category => category !== name)
                : [...prev, name];

            if (onCategoriesChange) {
                onCategoriesChange(updatedCategories);
            }


            return updatedCategories;
        });
    };

    return (
        <div className='row mt-4'>
            <div className='col-12'>
                <h3 className='text-start'>Categorie: </h3>
                <div className='ContainerCategories'>
                    {categories.map((category, index) => (
                        <Category
                            key={index}
                            icon={category.icon}
                            name={category.name}
                            bgcolor={category.bgcolor}
                            onClick={() => handleCategoryClick(category.name)}
                            isSelected={selectedCategories.includes(category.name)}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Categories;
