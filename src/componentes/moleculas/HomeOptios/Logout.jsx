import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';  
import { useState } from 'react';
import '../../../Styles/login.css'

function Exit() {

    const [isConfirmVisible, setIsConfirmVisible] = useState(false);
    
    const handleDeleteClick = (event) => {
        event.preventDefault();  
        setIsConfirmVisible(true); 
    };
    return (
        <div className="icon-container">
            <Link style={{textDecoration:'none', color:'purple'}} onClick={handleDeleteClick} >
            <div className='confirm' >
                             
                <FontAwesomeIcon name='x' icon={faRightFromBracket} style={{ transform: 'rotate(180deg)', fontSize: '45px' }} />
                <label htmlFor="x">Log Out</label>
                <span className="tooltip">log out</span>
            </div>

            </Link>

            {isConfirmVisible && (
                 <div className="modal-background">
                <div className="confirm-card">
                    <p>¿Are you sure you want to log out?</p>
                    <Link to="/">
                    <button style={{marginLeft:'auto', marginRight:'auto'}}>Log Out</button>
                    </Link>
                    
                    <button onClick={() => setIsConfirmVisible(false)} style={{marginLeft:'auto', marginRight:'auto'}}>Cancel</button>
                </div>
                </div>
            )}
        </div>
    );
}

export default Exit;
