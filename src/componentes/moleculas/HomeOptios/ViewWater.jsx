 import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTint } from '@fortawesome/free-solid-svg-icons';

function WaterData() {
    return (
        <div style={{display:'flex', alignItems:'center'}}>
            <FontAwesomeIcon icon={faTint} style={{fontSize:'22px',marginLeft:'10px', marginRight:'10px'}}/> <p style={{marginTop:'20px'}}>View Water Quality Data</p>
        </div>
    );
}

export default WaterData;
