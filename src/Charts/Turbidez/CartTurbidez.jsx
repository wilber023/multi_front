import { useEffect, useState } from "react";
import ReactEcharts from "echarts-for-react";
import PropTypes from "prop-types";



 


const TurbidezChart = ({ data = [], windowSize = 3 }) => {
    const [smoothedData, setSmoothedData] = useState([]);
    const [worker, setWorker] = useState(null);
    const maxTurbidez = 3000;
    const [alertTriggered, setAlertTriggered] = useState(false);

    useEffect(() => {
        const newWorker = new Worker(new URL("../workers/turbidez.js", import.meta.url));

        newWorker.onmessage = (event) => {
            setSmoothedData(event.data);
        };

        setWorker(newWorker);

        return () => newWorker.terminate(); // Limpia el worker al desmontar el componente
    }, []);

    useEffect(() => {
        if (worker) {
            worker.postMessage({ data, windowSize }); // Enviar datos al Worker
        }
    }, [data, windowSize, worker]);

    useEffect(() => {
        const exceedsLimit = data.some((entry) => entry.turbidez > maxTurbidez);

        if (exceedsLimit && !alertTriggered) {
            const alertMessage = "¡Alerta! El nivel de turbidez ha excedido el límite recomendado para los peces.";
            fetch("http://localhost:3000/api/tanque", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ message: alertMessage })
            })
            .then((response) => {
                if (response.ok) {
                    setAlertTriggered(true);
                    console.log("Alerta de correo enviada");
                } else {
                    console.error("Error al enviar la alerta");
                }
            })
            .catch((error) => console.error("Error en la solicitud de alerta:", error));
        }
    }, [data, maxTurbidez, alertTriggered]);

    const options = {
        title: { text: "Niveles de Turbidez del Agua" },
        xAxis: {
            type: "category",
            data: smoothedData.map((entry) => entry.timestamp),
            axisLabel: { interval: 0, rotate: 0 }
        },
        yAxis: {
            type: "value",
            name: "Turbidez (0 - 4095)",
            min: 0,
            max: 4095,
            splitLine: { lineStyle: { type: "dashed" } },
            axisLine: { lineStyle: { color: "#409EFF" } }
        },
        series: [
            {
                data: smoothedData.map((entry) => entry.turbidez),
                type: "line",
                smooth: true,
                areaStyle: {},
                lineStyle: { color: "#409EFF" },
                name: "Turbidez (Media Móvil)",
                markLine: {
                    data: [
                        {
                            yAxis: maxTurbidez,
                            label: { formatter: "Nivel Máximo", position: "end", color: "red" },
                            lineStyle: { color: "red", type: "dashed" }
                        }
                    ]
                }
            }
        ]
    };

    return <ReactEcharts option={options} style={{ height: "400px", width: "100%" }} />;
};

TurbidezChart.propTypes = {
    data: PropTypes.arrayOf(
        PropTypes.shape({
            timestamp: PropTypes.string.isRequired,
            turbidez: PropTypes.number.isRequired
        })
    ),
    windowSize: PropTypes.number
};

export default TurbidezChart;
