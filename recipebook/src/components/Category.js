import React, { useState } from 'react';
import '../styles/Category.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function Category(props) {
    const { bgcolor, icon, name, onClick } = props;
    const [isSelected, setIsSelected] = useState(false);

    const boxClass = `${bgcolor !== undefined ? 'CategoryBox reversedColorCategoryBox' : 'CategoryBox'} ${isSelected ? 'selected' : ''}`;

    const handleClick = () => {
        setIsSelected(!isSelected);
        if (onClick) {
            onClick(name);
        }
    };

    return (
        <div className='col-3'>
            <div className={boxClass} onClick={handleClick}>
                {icon === "More" ? (
                    <span className='textCategoryBox'>Altro</span>
                ) : (
                    <FontAwesomeIcon icon={icon} className="icon iconCategoryBox" />
                )}
            </div>
        </div>
    );
}

export default Category;
