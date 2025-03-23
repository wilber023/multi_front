import { useState, lazy, Suspense, useTransition } from "react";
import "../../Styles/Home.css";

// Lazy Loading para componentes pesados
const WaterData = lazy(() => import("../moleculas/HomeOptios/ViewWater"));
const LineChartWater = lazy(() => import("../../Charts/Water/ChartWater"));
const FishMonitoring = lazy(() => import("../moleculas/HomeOptios/Fish"));
const Register = lazy(() => import("../moleculas/UserSales/Sales"));
const Sales = lazy(() => import("./SalesRegister"));
const TurbidezChart = lazy(() => import("../../Charts/Turbidez/CartTurbidez"));

function UserHome() {
    const [activeComponent, setActiveComponent] = useState(null);
    const [isPending, startTransition] = useTransition();

    const toggleComponent = (componentName) => {
        startTransition(() => {
            setActiveComponent((prevComponent) => (prevComponent === componentName ? null : componentName));
        });
    };

    return (
        <div style={{ display: "flex" }}>
            <div className="options-container">
                <div className="options-main">
                    <div className="options">
                        <div className="cards" onClick={() => toggleComponent("Sales")}>
                            <Suspense fallback={<p>Loading...</p>}>
                                <Register />
                            </Suspense>
                        </div>
                        <div className="cards" onClick={() => toggleComponent("WaterData")}>
                            <Suspense fallback={<p>Loading...</p>}>
                                <WaterData />
                            </Suspense>
                        </div>
                        <div className="cards" onClick={() => toggleComponent("FishMonitoring")}>
                            <Suspense fallback={<p>Loading...</p>}>
                                <FishMonitoring />
                            </Suspense>
                        </div>
                    </div>
                </div>
            </div>
            <div className="information">
                <Suspense fallback={<p>Loading...</p>}>
                    {activeComponent === "WaterData" && <LineChartWater />}
                    {activeComponent === "Sales" && <Sales />}
                    {activeComponent === "FishMonitoring" && (
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
                    )}
                </Suspense>
            </div>
        </div>
    );
}

export default UserHome;
