import React, { useState, useEffect } from 'react';
import '../styles/Searchbar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

function Searchbar() {
    const apiUrl = process.env.REACT_APP_API_URL;
    const [searchQuery, setSearchQuery] = useState('');
    const [results, setResults] = useState([]);
    const [authToken, setAuthToken] = useState(localStorage.getItem('authToken') || ''); // Recupera il token dal localStorage
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            if (searchQuery.trim()) {
                try {
                    const response = await fetch(`${apiUrl}/data/search-by-name`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${authToken}`
                        },
                        body: JSON.stringify({ name: searchQuery })
                    });
                    
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    
                    const data = await response.json();
                    setResults(data);
                } catch (error) {
                    console.error('Error searching for recipes:', error);
                    setResults([]);
                }
            } else {
                setResults([]);
            }
        };

        fetchData();
    }, [searchQuery]);

    const handleChange = (event, value) => {
        setSearchQuery(value);
    };

    const handleClick = (id) => {
        navigate(`/ricetta/${id}`);
    };

    return (
        <div className='row mt-3'>
            <div className='col-12'>
                <div className="input-with-icon">
                    <Autocomplete
                        freeSolo
                        options={results}
                        getOptionLabel={(option) => option.name}
                        onInputChange={handleChange}
                        renderOption={(props, option) => (
                            <li {...props} onClick={() => handleClick(option._id)}>
                                {option.name}
                            </li>
                        )}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                className="form-control SearchRecipeInput"
                                placeholder="Cerca una ricetta..."
                                InputProps={{
                                    ...params.InputProps,
                                    endAdornment: (
                                        <FontAwesomeIcon
                                            icon={faSearch}
                                            className="icon searchIcon"
                                        />
                                    ),
                                    sx: {
                                        '& .MuiOutlinedInput-notchedOutline': {
                                            border: 'none',
                                        },
                                    },
                                }}
                            />
                        )}
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                '& fieldset': {
                                    border: 'none',
                                },
                            },
                        }}
                    />
                </div>
            </div>
        </div>
    );
}

export default Searchbar;
