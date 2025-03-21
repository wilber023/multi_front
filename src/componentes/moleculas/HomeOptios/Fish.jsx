 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShieldAlt } from '@fortawesome/free-solid-svg-icons';

function FishMonitoring() {
    return (
        <div  style={{display:'flex', alignItems:'center', gap:'1px'}}>
            <FontAwesomeIcon icon={faShieldAlt} style={{fontSize:'22px' ,marginLeft:'4px', marginRight:'10px'}} /> <p style={{margin:'0px'}}>Fish Health Monitoring</p> 
        </div>
    );
}

export default FishMonitoring;
