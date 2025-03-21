 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartBar } from '@fortawesome/free-solid-svg-icons';

function ConsumptionReport() {
    return (
        <div style={{display:'flex', alignItems:'center', gap:'10px'}}>
            <FontAwesomeIcon icon={faChartBar} style={{fontSize:'22px' ,marginLeft:'25px'}}/> <p>View Consumption Report</p> 
        </div>
    );
}

export default ConsumptionReport;
