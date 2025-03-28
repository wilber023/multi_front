import React, { useState, lazy, Suspense } from "react";

import '../../../src/Styles/Home.css'

const FishMonitoring = lazy(() => import("../moleculas/HomeOptios/Fish"));
const RegisterNewUser = lazy(() => import("../moleculas/HomeOptios/RegisterUser"));
const InformativeSite = lazy(() => import("../moleculas/HomeOptios/site"));
const ConsumptionReport = lazy(() => import("../moleculas/HomeOptios/ViewReport"));
const WaterData = lazy(() => import("../moleculas/HomeOptios/ViewWater"));
const AltUsers = lazy(() => import("../moleculas/AddUser/UsersAdd"));
const LineChartWater = lazy(() => import("../../Charts/Water/ChartWater"));
const TurbidezChart = lazy(() => import("../../Charts/Turbidez/CartTurbidez"));

function Options() {
    const [activeComponent, setActiveComponent] = useState(null);

    const toggleComponent = (componentName) => {
        React.startTransition(() => {
            setActiveComponent(prevComponent => prevComponent === componentName ? null : componentName);
        });
    };

    return (
        <div style={{ display: "flex" }}>
            <div className="options-container">
                <div className="options-main">
                    <div className="options">
                        <div className="cards" onClick={() => toggleComponent("RegisterNewUser")}>
                            <Suspense fallback={<p>Loading...</p>}>
                                <RegisterNewUser />
                            </Suspense>
                        </div>
                        <div className="cards" onClick={() => toggleComponent("WaterData")}>
                            <Suspense fallback={<p>Loading...</p>}>
                                <WaterData />
                            </Suspense>
                        </div>
                        <div className="cards" onClick={() => toggleComponent("ConsumptionReport")}>
                            <Suspense fallback={<p>Loading...</p>}>
                                <ConsumptionReport />
                            </Suspense>
                        </div>
                        <div className="cards" onClick={() => toggleComponent("FishMonitoring")}>
                            <Suspense fallback={<p>Loading...</p>}>
                                <FishMonitoring />
                            </Suspense>
                        </div>
                        <div className="cards" onClick={() => toggleComponent("InformativeSite")}>
                            <Suspense fallback={<p>Loading...</p>}>
                                <InformativeSite />
                            </Suspense>
                        </div>
                    </div>
                </div>
            </div>
            <div className="information">
                <Suspense fallback={<p>Loading...</p>}>
                    {activeComponent === "RegisterNewUser" && <AltUsers />}
                    {activeComponent === "WaterData" && <LineChartWater />}
                    {activeComponent === "ConsumptionReport" && <ConsumptionReport />}
                    {activeComponent === "FishMonitoring" && (
                        <TurbidezChart
                            data={[
                                { timestamp: "10:00", turbidez: 1500 },
                                { timestamp: "10:10", turbidez: 1700 },
                                { timestamp: "10:20", turbidez: 4000 },
                                { timestamp: "10:30", turbidez: 3000 },
                                { timestamp: "10:40", turbidez: 2000 },
                                { timestamp: "10:50", turbidez: 1500 },
                                { timestamp: "11:00", turbidez: 3000 },
                                { timestamp: "11:10", turbidez: 1400 },
                            ]}
                        />
                    )}
                    {activeComponent === "InformativeSite" && (
                        <div>
                            <LineChartWater />
                            <TurbidezChart
                                data={[
                                    { timestamp: "10:00", turbidez: 1500 },
                                    { timestamp: "12:10", turbidez: 1700 },
                                    { timestamp: "15:20", turbidez: 4000 },
                                    { timestamp: "20:30", turbidez: 3000 },
                                    { timestamp: "25:20", turbidez: 2000 },
                                    { timestamp: "35:20", turbidez: 1500 },
                                    { timestamp: "45:20", turbidez: 3000 },
                                    { timestamp: "55:20", turbidez: 1400 },
                                ]}
                            />
                            <ConsumptionReport />
                        </div>
                    )}
                </Suspense>
            </div>
        </div>
    );
}

export default Options;
