import { useNavigate, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

function BackButton() {
    
    let navigate = useNavigate();
    const goBack = () => {
        navigate(-1);
    };

    return(
        <button className='action-button' onClick={goBack}>
            <FontAwesomeIcon icon={faArrowLeft} />
        </button>
    )
}

export default BackButton;