self.onmessage = function (event) {
    const { days } = event.data;

    const generatedData = days.map(() => Math.floor(Math.random() * 100)); // Simular datos de nivel de agua

    self.postMessage(generatedData); // Enviar resultado al hilo principal
};
