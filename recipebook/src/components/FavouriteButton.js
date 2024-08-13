import React, { useState } from 'react';
import '../styles/RecipePage.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


function FavouriteButton(props) {
    const { bgcolor, icon } = props;
    const [isSelected, setIsSelected] = useState(false);

    const boxClass = `${isSelected ? 'selected FavouriteButton' : 'FavouriteButton'}`;

    const handleClick = () => {
        setIsSelected(!isSelected);
    };

    return (
        <div className={boxClass} onClick={handleClick}>
            <FontAwesomeIcon icon={icon} className="icon iconCategoryBox" />
        </div>
    );
}

export default FavouriteButton;
