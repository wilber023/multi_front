// turbidezWorker.js
self.onmessage = function (event) {
    const { data, windowSize } = event.data;
    const result = [];

    for (let i = 0; i < data.length; i++) {
        const windowData = data.slice(Math.max(i - windowSize + 1, 0), i + 1);
        const average = windowData.reduce((acc, val) => acc + val.turbidez, 0) / windowData.length;
        result.push({ timestamp: data[i].timestamp, turbidez: average });
    }

    self.postMessage(result); // Envía el resultado de vuelta al main thread
};