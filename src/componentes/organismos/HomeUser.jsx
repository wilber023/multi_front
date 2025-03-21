import WaterData from "../moleculas/HomeOptios/ViewWater";
import LineChartWater from "../../Charts/Water/ChartWater";
import FishMonitoring from "../moleculas/HomeOptios/Fish";
import { useState } from 'react';
import Register from "../moleculas/UserSales/Sales";
import '../../Styles/Home.css';
import Sales from "./SalesRegister";
import TurbidezChart from "../../Charts/Turbidez/CartTurbidez";

function UserHome() {

    const [activeComponent, setActiveComponent] = useState(null);


    const toggleComponent = (componentName) => {
        setActiveComponent(prevComponent => prevComponent === componentName ? null : componentName);
    };

    return (
        <div style={{ display: 'flex' }}> 
            <div className="options-container">
                <div className="options-main">
                    <div className="options">
                        <div className="cards" onClick={() => toggleComponent('Sales')}>
                            <Register />
                        </div>
                        <div className="cards" onClick={() => toggleComponent('WaterData')}>
                            <WaterData />
                        </div>                     
                        <div className="cards" onClick={() => toggleComponent('FishMonitoring')}>
                            <FishMonitoring />
                        </div>
                    </div>
                </div>
            </div>
            <div className="information">
                {activeComponent === 'WaterData' && (
                    <div className="graph-container">
                        <LineChartWater />
                    </div>
                )}
                {activeComponent === 'Sales' && (
                    <div>
                        <Sales />
                    </div>
                )}
                {activeComponent === 'FishMonitoring' && (
                    <div className="graph-container">
                        
                        <TurbidezChart
                                            data={[
                                                { timestamp: '10:00', turbidez: 1500 },
                                                { timestamp: '12:10', turbidez: 1700 },
                                                { timestamp: '15:20', turbidez: 4000 },
                                                { timestamp: '20:30', turbidez: 3000 },
                                                { timestamp: '25:20', turbidez: 2000 },
                                                { timestamp: '35:20', turbidez: 1500 },
                                                { timestamp: '45:20', turbidez: 3000 },
                                                { timestamp: '55:20', turbidez: 1400 },
                                              ]}
                        />
                                            </div>
                )}

            </div>
        </div> 
    );
}

export default UserHome;
