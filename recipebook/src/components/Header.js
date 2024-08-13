import React from 'react';
import '../styles/Header.css';
import AggiungiRicettaComponent from './AggiungiRicettaComponent';

function Header({updateComponent}) {
    
    return (    
        <div className='row'>
            <div className='col-10'>
                <h4 className="text-start text-muted headerSubTitle">Buongiorno, </h4>
                <h1 className="text-start headerTitle">Mirko Zoccola 👨🏻‍🍳</h1>
            </div>
            <AggiungiRicettaComponent updateComponent={updateComponent}/>
        </div>
    );
}

export default Header;
