import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";


 



Chart.register(...registerables);

const LineChartWater = () => {

 

    const [waterLevels, setWaterLevels] = useState(new Array(7).fill(0)); // Estado para los datos dinámicos
    const [worker, setWorker] = useState(null);

    const days = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"];

    useEffect(() => {
        const newWorker = new Worker(new URL("../workers/waterLevel.js", import.meta.url));

        newWorker.onmessage = (event) => {
            setWaterLevels(event.data); // Recibe datos generados por el Worker
        };

        setWorker(newWorker);
        
        return () => newWorker.terminate(); // Limpia el worker al desmontar el componente
    }, []);

    useEffect(() => {
        if (worker) {
            worker.postMessage({ days }); // Enviar días para generar datos
        }
    }, [worker]);

    const data = {
        labels: days,
        datasets: [
            {
                label: "Nivel del agua Actualmente",
                data: waterLevels, // Datos actualizados dinámicamente
                fill: false,
                borderColor: "rgba(75, 192, 192, 1)",
                tension: 0,
            },
        ],
    };

    const options = {
        scales: {
            y: {
                beginAtZero: true,
                ticks: { stepSize: 10 },
                title: { display: true, text: "Porcentaje (%)" },
            },
            x: {
                title: { display: true, text: "Días de la Semana" },
                ticks: { autoSkip: true, maxTicksLimit: 7 },
                grid: { display: true },
            },
        },
    };

    return (
        <div style={{ width: "800px", height: "400px" }}>
            <Line data={data} options={options} />
        </div>
    );
};

export default LineChartWater;
