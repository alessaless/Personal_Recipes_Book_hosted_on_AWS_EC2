import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinusCircle } from '@fortawesome/free-solid-svg-icons';
import '../styles/AggiungiRicettaComponent.css';

function AggiungiRicettaComponent({updateComponent}) {

  const apiUrl = process.env.REACT_APP_API_URL;

  const [show, setShow] = useState(false);
  const [recipeName, setRecipeName] = useState('');
  const [ingredients, setIngredients] = useState([{ name: '' }]);
  const [authToken, setAuthToken] = useState(localStorage.getItem('authToken') || ''); // Recupera il token dal localStorage
  const [portions, setPortions] = useState('');
  const [prepTime, setPrepTime] = useState('');
  const [category, setCategory] = useState('');
  const [meal, setMeal] = useState('');
  const [procedure, setProcedure] = useState('');

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleRecipeNameChange = (e) => setRecipeName(e.target.value);

  const handleIngredientChange = (index, e) => {
    const newIngredients = [...ingredients];
    newIngredients[index].name = e.target.value;
    setIngredients(newIngredients);
  };

  const handleAddIngredient = () => {
    setIngredients([...ingredients, { name: '' }]);
  };

  const handleRemoveIngredient = (index) => {
    const newIngredients = ingredients.filter((_, i) => i !== index);
    setIngredients(newIngredients);
  };

  const handlePortionsChange = (e) => {
    setPortions(e.target.value);
  };

  const handlePrepTimeChange = (e) => {
    setPrepTime(e.target.value);
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

  const resetForm = () => {
    setRecipeName('');
    setIngredients([{ name: '' }]);
    setPortions('');
    setPrepTime('');
    setCategory('');
    setMeal('');
    setProcedure('');
  };

  const handleSave = () => {
    const recipeData = {
      name: recipeName,
      ingredients: ingredients.map(ingredient => ingredient.name),
      portions: portions,
      minutes: prepTime,
      procedure: procedure,
      category: category,
      meal: meal
    };

    fetch(`${apiUrl}/data`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`
      },
      body: JSON.stringify(recipeData)
    })
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data);
        resetForm();
        handleClose();
        updateComponent();
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  return (
    <>
      <div className='col-2 containerPlusButton'>
        <button type="button" className="btn btn-primary btn-circle btn-default btnNewRecipe" onClick={handleShow}>+</button>
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Aggiungi una ricetta</Modal.Title>
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
                    value={ingredient.name}
                    onChange={(e) => handleIngredientChange(index, e)}
                    required
                />
                {index > 0 && (
                  <Button variant="danger" className='ms-2 mt-1' onClick={() => handleRemoveIngredient(index)}>
                    <FontAwesomeIcon icon={faMinusCircle} />
                  </Button>
                )}
              </Form.Group>
            ))}
            <Button variant="secondary" onClick={handleAddIngredient} className='mt-2'>
              Aggiungi Ingrediente
            </Button>

            <Form.Group controlId="formPortions" className='mt-3'>
              <Form.Label className='labelInput'>Porzioni (in persone)</Form.Label>
              <Form.Control 
                type="number" 
                placeholder="Inserisci il numero di porzioni" 
                value={portions}
                onChange={handlePortionsChange}
                required 
              />
            </Form.Group>

            <Form.Group controlId="formPrepTime" className='mt-3'>
              <Form.Label className='labelInput'>Tempo di Preparazione (in minuti)</Form.Label>
              <Form.Control 
                type="number" 
                placeholder="Inserisci il tempo di preparazione" 
                value={prepTime}
                onChange={handlePrepTimeChange}
                required 
              />
            </Form.Group>

            <Form.Group controlId="formCategory" className='mt-3'>
              <Form.Label className='labelInput'>Categoria della Ricetta</Form.Label>
              <Form.Control 
                as="select" 
                value={category} 
                onChange={handleCategoryChange}
                required
              >
                <option value="">Seleziona una categoria</option>
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
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleSave}>
            Salva
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AggiungiRicettaComponent;
