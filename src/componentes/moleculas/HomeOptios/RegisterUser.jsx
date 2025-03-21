import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
    import { faUserPlus } from '@fortawesome/free-solid-svg-icons';

function RegisterNewUser(){
    return (
        <>
        <div style={{display:'flex', alignItems:'center',gap:'0px'}}>
            <FontAwesomeIcon icon={faUserPlus} style={{fontSize:'22px', marginLeft:'0px', marginRight:'10px'  }} /> <p>Register a New User</p>
        </div>
        </>
    )
}

export default RegisterNewUser;