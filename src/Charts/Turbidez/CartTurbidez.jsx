    import  { useEffect, useState, useCallback, useMemo } from "react";
    import ReactEcharts from "echarts-for-react";
    import PropTypes from "prop-types";

    const TurbidezChart = ({ data = [], windowSize = 3 }) => {
    const [smoothedData, setSmoothedData] = useState([]);
    const [worker, setWorker] = useState(null);
    const [alertTriggered, setAlertTriggered] = useState(false);

    const maxTurbidez = 3000;

    // Crear el worker solo una vez
    useEffect(() => {
        const newWorker = new Worker(new URL("../workers/turbidez.worker.js", import.meta.url));
        
        newWorker.onmessage = (event) => {
        setSmoothedData(event.data);
        };

        newWorker.onerror = (error) => {
        console.error("Worker error:", error);
        };

        setWorker(newWorker);

        return () => {
        newWorker.terminate();
        };
    }, []); // Sin dependencias para crear solo una vez

    // Enviar datos al worker de forma segura
    const processData = useCallback(() => {
        if (worker && data.length > 0) {
        try {
            worker.postMessage({ data, windowSize });
        } catch (error) {
            console.error("Error posting message to worker:", error);
        }
        }
    }, [data, windowSize, worker]);

    useEffect(() => {
        processData();
    }, [processData]);

    // Manejar alertas de forma más robusta
    useEffect(() => {
        const handleAlert = async () => {
        const exceedsLimit = data.some((entry) => entry.turbidez > maxTurbidez);

        if (exceedsLimit && !alertTriggered) {
            const alertMessage = "¡Alerta! El nivel de turbidez ha excedido el límite recomendado para los peces.";

            try {
            const response = await fetch("http://localhost:3000/api/tanque", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ message: alertMessage })
            });

            if (response.ok) {
                setAlertTriggered(true);
                console.log("Alerta de correo enviada");
            } else {
                console.error("Error al enviar la alerta");
            }
            } catch (error) {
            console.error("Error en la solicitud de alerta:", error);
            }
        }
        };

        handleAlert();
    }, [data, maxTurbidez, alertTriggered]);

    // Memoizar las opciones del gráfico para evitar renderizados innecesarios
    const options = useMemo(() => ({
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
    }), [smoothedData, maxTurbidez]);

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