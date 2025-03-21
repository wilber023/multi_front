 import { Line } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables); 

const LineChartWater = () => {
 
    const data = {
        
        labels: ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'],
        datasets: [
            {
                label: 'Nivel del agua Actualmente',
                data: [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100],  
                fill: false,
                borderColor: 'rgba(75, 192, 192, 1)',  
                tension: 0,  
            },
        ],
    };

     const options = {
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    stepSize: 10,  
                },
                title: {
                    display: true,
                    text: 'Porcentaje (%)',
                },
            },
            x: {
                title: {
                    display: true,
                    text: 'Días de la Semana',
                },
                ticks: {
                    autoSkip: true,
                    maxTicksLimit: 7,  
                },
                grid: {
                    display: true, 
                },
            },
        },
    };

    return (
        <div style={{ width: '800px', height: '400px' }}>
            <Line data={data} options={options} />
        </div>
    );
};

export default LineChartWater;
    