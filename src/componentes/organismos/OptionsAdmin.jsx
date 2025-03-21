    import '../../Styles/Home.css';
    import FishMonitoring from '../moleculas/HomeOptios/Fish';
    import RegisterNewUser from '../moleculas/HomeOptios/RegisterUser';
    import InformativeSite from '../moleculas/HomeOptios/site';
    import ConsumptionReport from '../moleculas/HomeOptios/ViewReport';
    import WaterData from '../moleculas/HomeOptios/ViewWater';
    import AltUsers from '../moleculas/AddUser/UsersAdd';
    import LineChartWater from '../../Charts/Water/ChartWater';
    import { useState } from 'react';
    import TurbidezChart from '../../Charts/Turbidez/CartTurbidez';

    function Options() {

        
        const [activeComponent, setActiveComponent] = useState(null);

        const toggleComponent = (componentName) => {
            setActiveComponent(prevComponent => prevComponent === componentName ? null : componentName);
        };

        return (
            <div style={{ display: 'flex' }}>
                <div className="options-container">
                    <div className="options-main">
                        <div className="options">
                            <div className="cards" onClick={() => toggleComponent('RegisterNewUser')}>
                                <RegisterNewUser />
                            </div>
                            <div className="cards" onClick={() => toggleComponent('WaterData')}> 
                                <WaterData /> 
                            </div>
                            <div className="cards" onClick={() => toggleComponent('ConsumptionReport')}>
                                <ConsumptionReport />
                            </div>
                            <div className="cards" onClick={() => toggleComponent('FishMonitoring')}>
                                <FishMonitoring />
                            </div>
                            <div className="cards" onClick={() => toggleComponent('InformativeSite')}>
                                <InformativeSite />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="information">
                    {activeComponent === 'RegisterNewUser' && (
                        <div className="graph-container">
                            <AltUsers />
                        </div>
                    )}
                    {activeComponent === 'WaterData' && (
                        <div className="graph-container">
                            <LineChartWater />
                        </div>
                    )}
                    {activeComponent === 'ConsumptionReport' && (
                        <div className="graph-container">
                            <ConsumptionReport />
                        </div>
                    )}
                    {activeComponent === 'FishMonitoring' && (
                        <div className="graph-container">
                            
                        <TurbidezChart 
                        data={[
                            { timestamp: '10:00', turbidez: 1500 },
                            { timestamp: '10:10', turbidez: 1700 },
                            { timestamp: '10:20', turbidez: 4000 },
                            { timestamp: '10:30', turbidez: 3000 },
                            { timestamp: '10:40', turbidez: 2000 },
                            { timestamp: '10:50', turbidez: 1500 },
                            { timestamp: '11:00', turbidez: 3000 },
                            { timestamp: '11:10', turbidez: 1400 },
                        ]}
                        />
                        </div>
                    )}
                    {activeComponent === 'InformativeSite' && (
        <div>
            <div className="graph-container">
                <LineChartWater />
            </div>
            <div className="graph-container"    >
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
            <div className="graph-container">
                <ConsumptionReport />
            </div>
    
        </div>
    )}
                </div>
            </div> 
        );
    }

    export default Options;
