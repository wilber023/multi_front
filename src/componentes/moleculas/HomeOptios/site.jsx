 import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';

function InformativeSite() {
    return (
        <div  style={{display:'flex', alignItems:'center', gap:'15px', marginRight:'45px'}}>
            <FontAwesomeIcon icon={faBell} style={{fontSize:'22px' ,marginLeft:'0px'}} /> <p>Informative site</p> 
        </div>
    );
}

export default InformativeSite;
