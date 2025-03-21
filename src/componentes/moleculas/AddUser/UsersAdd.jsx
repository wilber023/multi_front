import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import '../../../Styles/Home.css';
import { useState } from 'react';
import Form from './FormUser';
import DeleteUser from './DeleteUser';

function AltUsers() {
     const [activeComponent, setActiveComponent] = useState(null);

     const toggleComponent = (componentName) => {
        setActiveComponent(prevComponent => prevComponent === componentName ? null : componentName);
    };

    return (
        <div className='options-Add'>
            <div className='cardAdd'>
                <div className='add' onClick={() => toggleComponent('Form')}>
                    <FontAwesomeIcon icon={faPlus} style={{ fontSize: '24px', marginRight: '8px' }} /> New User
                </div>
            </div>

            <h1 style={{ fontSize: '40px', textAlign: 'center', alignItems: 'center', justifyItems: 'center' }}>|</h1>

            <div className='card'>
                <div className='delete' onClick={() => toggleComponent('Delete')}>
                    <FontAwesomeIcon icon={faTrash} style={{ fontSize: '24px', marginRight: '8px' }} /> Delete
                </div>
            </div>

            {activeComponent === 'Form' && (
                <div className="form-container">
                    <Form />
                </div>
            )}
            
            {activeComponent === 'Delete' && (
                <div className="form-container">
                    <DeleteUser />
                </div>
            )}
        </div>
    );
}

export default AltUsers;
