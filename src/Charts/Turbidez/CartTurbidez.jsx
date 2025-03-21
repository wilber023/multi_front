import  { useEffect, useState } from 'react';
import ReactEcharts from 'echarts-for-react';
import PropTypes from 'prop-types';

const TurbidezChart = ({ data = [], windowSize = 3 }) => {
    const chartData = Array.isArray(data) ? data : [];
    const maxTurbidez = 3000;
    const [alertTriggered, setAlertTriggered] = useState(false);

    // Calcular la media  de tipo L de 3 en 3
    const calculateMovingAverage = (data, windowSize) => {
        const result = [];
        for (let i = 0; i < data.length; i++) {
            const windowData = data.slice(Math.max(i - windowSize + 1, 0), i + 1);
            const average = windowData.reduce((acc, val) => acc + val.turbidez, 0) / windowData.length;
            result.push({ timestamp: data[i].timestamp, turbidez: average });
        }
        return result;
    };

    const smoothedData = calculateMovingAverage(chartData, windowSize);

    const options = {
        title: {
            text: 'Niveles de Turbidez del Agua'
        },
        xAxis: {
            type: 'category',
            data: smoothedData.map((entry) => entry.timestamp),
            axisLabel: {
                interval: 0,
                rotate: 0,
            }
        },
        yAxis: {
            type: 'value',
            name: 'Turbidez (0 - 4095)',
            min: 0,
            max: 4095,
            splitLine: {
                lineStyle: { type: 'dashed' },
            },
            axisLine: { lineStyle: { color: '#409EFF' } },
        },
        series: [
            {
                data: smoothedData.map((entry) => entry.turbidez),
                type: 'line',
                smooth: true,
                areaStyle: {},
                lineStyle: {
                    color: '#409EFF'
                },
                name: 'Turbidez (Media Móvil)',
                markLine: {
                    data: [
                        {
                            yAxis: maxTurbidez,
                            label: {
                                formatter: 'Nivel Máximo',
                                position: 'end',
                                color: 'red'
                            },
                            lineStyle: {
                                color: 'red',
                                type: 'dashed'
                            }
                        }
                    ]
                }
            }
        ]
    };

    useEffect(() => {
        const exceedsLimit = chartData.some((entry) => entry.turbidez > maxTurbidez);

        if (exceedsLimit && !alertTriggered) {
            const alertMessage = "¡Alerta! El nivel de turbidez ha excedido el límite recomendado para los peces.";
            fetch('http://localhost:3000/api/tanque', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ message: alertMessage })
            })
            .then(response => {
                if (response.ok) {
                    setAlertTriggered(true);
                    console.log("Alerta de correo enviada");
                } else {
                    console.error("Error al enviar la alerta");
                }
            })
            .catch((error) => {
                console.error("Error en la solicitud de alerta:", error);
            });
        }
    }, [chartData, maxTurbidez, alertTriggered]);

    return <ReactEcharts option={options} style={{ height: '400px', width: '100%' }} />;
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
