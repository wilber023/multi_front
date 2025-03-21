import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClipboardList } from '@fortawesome/free-solid-svg-icons';

function Register(){
    return(
        <div  style={{display:'flex', alignItems:'center', gap:'10px',marginRight:' 50px'}}>
<FontAwesomeIcon icon={faClipboardList} style={{fontSize:'22px'}} /> <p>Sales Register</p> 
        </div>
    )
}

export default Register;