import React, { useState, useEffect } from 'react';
import { Modal, Button, Dropdown, Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisV, faMinusCircle } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom'; // Importa useNavigate
import '../styles/RecipePage.css';

const DropDownMenu = ({ recipeId, onSave }) => {
  const apiUrl = process.env.REACT_APP_API_URL;
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [authToken, setAuthToken] = useState(localStorage.getItem('authToken') || ''); // Recupera il token dal localStorage
  const [recipeName, setRecipeName] = useState('');
  const [ingredients, setIngredients] = useState(['']);
  const [category, setCategory] = useState('');
  const [meal, setMeal] = useState('');
  const [procedure, setProcedure] = useState('');
  const [servings, setServings] = useState('');
  const [minutes, setMinutes] = useState('');
  
  const navigate = useNavigate(); // Inizializza useNavigate

  useEffect(() => {
    if (recipeId) {
      // Fetch existing recipe data to populate form
      fetch(`${apiUrl}/data/${recipeId}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${authToken}`, 
          'Content-Type': 'application/json'
        }
      })
      .then(response => response.json())
      .then(data => {
        setRecipeName(data.name || '');
        setIngredients(data.ingredients || ['']);
        setCategory(data.category || '');
        setMeal(data.meal || '');
        setProcedure(data.procedure || '');
        setServings(data.portions || '');
        setMinutes(data.minutes || '');
      })
      .catch(error => console.error('Error fetching recipe:', error));
    }
  }, [recipeId]);
  
  const handleEdit = () => {
    setShowEditModal(true);
  };

  const handleDelete = () => {
    setShowDeleteModal(true);
  };

  const handleCloseEditModal = () => {
    setShowEditModal(false);
  };

  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
  };

  const handleRecipeNameChange = (e) => setRecipeName(e.target.value);

  const handleIngredientChange = (index, e) => {
    const newIngredients = [...ingredients];
    newIngredients[index] = e.target.value;
    setIngredients(newIngredients);
  };

  const handleAddIngredient = () => {
    setIngredients([...ingredients, '']);
  };

  const handleRemoveIngredient = (index) => {
    const newIngredients = ingredients.filter((_, i) => i !== index);
    setIngredients(newIngredients);
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  const handleMealChange = (e) => {
    setMeal(e.target.value);
  };

  const handleProcedureChange = (e) => {
    setProcedure(e.target.value);
  };

  const handleServingsChange = (e) => {
    setServings(e.target.value);
  };

  const handleMinutesChange = (e) => {
    setMinutes(e.target.value);
  };

  const handleSave = () => {
    const payload = {
        name: recipeName,
        ingredients: ingredients,
        category: category,
        meal: meal,
        procedure: procedure,
        portions: servings,
        minutes: minutes
    };

    fetch(`${apiUrl}/data/${recipeId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authToken}`
        },
        body: JSON.stringify(payload),
    })
    .then(response => response.json())
    .then(data => {
        console.log('Recipe updated:', data);
        handleCloseEditModal();
        onSave(); // Chiamata alla funzione di callback per ricaricare RecipePage
    })
    .catch(error => console.error('Error updating recipe:', error));
  };

  const handleConfirmDelete = () => {
    fetch(`${apiUrl}/data/${recipeId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${authToken}`, 
        'Content-Type': 'application/json'
      }
    })
      .then(() => {
        console.log('Recipe deleted');
        handleCloseDeleteModal();
        onSave(); 
        navigate(-1); 
      })
      .catch(error => console.error('Error deleting recipe:', error));
  };
  

  return (
    <div>
      <Dropdown>
        <Dropdown.Toggle id="dropdown-basic" className='action-button'>
          <FontAwesomeIcon icon={faEllipsisV} />
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item onClick={handleEdit}>Modifica</Dropdown.Item>
          <Dropdown.Item onClick={handleDelete}>Elimina</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>

      {/* Modale Modifica */}
      <Modal show={showEditModal} onHide={handleCloseEditModal}>
        <Modal.Header closeButton>
          <Modal.Title>Modifica</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formRecipeName" className='mt-3'>
              <Form.Label className='labelInput'>Nome della Ricetta</Form.Label>
              <Form.Control
                type="text"
                placeholder="Inserisci il nome della ricetta"
                value={recipeName}
                onChange={handleRecipeNameChange}
                required
              />
            </Form.Group>

            <Form.Label className='mt-3 labelInput'>Ingredienti</Form.Label>
            {ingredients.map((ingredient, index) => (
              <Form.Group controlId={`formIngredient${index}`} key={index} className='d-flex align-items-center'>
                <Form.Control
                  type="text"
                  placeholder="Inserisci un ingrediente"
                  className='mt-1 flex-grow-1'
                  value={ingredient}
                  onChange={(e) => handleIngredientChange(index, e)}
                  required
                />
                {ingredients.length > 1 && (
                  <Button variant="danger" className='ms-2 mt-1' onClick={() => handleRemoveIngredient(index)}>
                    <FontAwesomeIcon icon={faMinusCircle} />
                  </Button>
                )}
              </Form.Group>
            ))}
            <Button variant="secondary" onClick={handleAddIngredient} className='mt-2'>
              Aggiungi Ingrediente
            </Button>

            <Form.Group controlId="formCategory" className='mt-3'>
              <Form.Label className='labelInput'>Categoria della Ricetta</Form.Label>
              <Form.Control
                as="select"
                value={category}
                onChange={handleCategoryChange}
                required
              >
                <option value="Bevande">Bevande</option>
                <option value="Primi">Primi</option>
                <option value="Secondi">Secondi</option>
                <option value="Pane">Pane</option>
                <option value="Pizza e focacce">Pizza e focacce</option>
                <option value="Torte">Torte</option>
                <option value="Biscotti">Biscotti</option>
                <option value="Altro">Altro</option>
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="formMeal" className='mt-3'>
              <Form.Label className='labelInput'>Pasto di Riferimento</Form.Label>
              <Form.Control
                as="select"
                value={meal}
                onChange={handleMealChange}
                required
              >
                <option value="">Seleziona un pasto</option>
                <option value="Colazione">Colazione</option>
                <option value="Pranzo">Pranzo</option>
                <option value="Cena">Cena</option>
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="formProcedure" className='mt-3'>
              <Form.Label className='labelInput'>Procedimento della Ricetta</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Inserisci il procedimento della ricetta"
                value={procedure}
                onChange={handleProcedureChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="formServings" className='mt-3'>
              <Form.Label className='labelInput'>Porzioni</Form.Label>
              <Form.Control
                type="number"
                placeholder="Inserisci il numero di porzioni"
                value={servings}
                onChange={handleServingsChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="formMinutes" className='mt-3'>
              <Form.Label className='labelInput'>Tempo di Preparazione (in minuti)</Form.Label>
              <Form.Control
                type="number"
                placeholder="Inserisci il tempo di preparazione"
                value={minutes}
                onChange={handleMinutesChange}
                required
              />
            </Form.Group>

          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseEditModal}>
            Chiudi
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Salva
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modale Elimina */}
      <Modal show={showDeleteModal} onHide={handleCloseDeleteModal}>
        <Modal.Header closeButton>
          <Modal.Title>Conferma Eliminazione</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Sei sicuro di voler eliminare questo elemento?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseDeleteModal}>
            Annulla
          </Button>
          <Button variant="danger" onClick={handleConfirmDelete}>
            Elimina
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default DropDownMenu;
