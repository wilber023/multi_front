
self.onmessage = function(event) {
    const { data, windowSize } = event.data;
    
    // Función de media móvil para suavizar los datos
    const smoothData = (data, windowSize) => {
      return data.map((entry, index, arr) => {
        // Calcular la ventana de datos
        const start = Math.max(0, index - Math.floor(windowSize / 2));
        const end = Math.min(arr.length, index + Math.floor(windowSize / 2) + 1);
        
        // Obtener los datos de la ventana
        const windowData = arr.slice(start, end);
        
        // Calcular el promedio
        const avgTurbidez = windowData.reduce((sum, item) => sum + item.turbidez, 0) / windowData.length;
        
        return {
          ...entry,
          turbidez: parseFloat(avgTurbidez.toFixed(2))
        };
      });
    };
  
    // Aplicar suavizado
    const smoothedData = smoothData(data, windowSize);
    
    // Enviar datos suavizados de vuelta al hilo principal
    self.postMessage(smoothedData);
  };