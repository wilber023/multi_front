
self.onmessage = async function (event) {
    const { userId, quantity, fishDetails } = event.data;

    
    const validateSaleData = (userId, quantity, fishDetails) => {
        if (!userId || typeof userId !== 'string') {
            return "Invalid user ID";
        }

        if (quantity <= 0 || !Number.isInteger(quantity)) {
            return "Invalid quantity";
        }

        if (!fishDetails || fishDetails.length === 0) {
            return "No fish details provided";
        }

        for (let i = 0; i < fishDetails.length; i++) {
            const fish = fishDetails[i];
            if (!fish.weight || isNaN(parseFloat(fish.weight))) {
                return `Invalid weight for fish ${i + 1}`;
            }
            if (!fish.type) {
                return `Missing fish type for fish ${i + 1}`;
            }
            if (!fish.price || isNaN(parseFloat(fish.price))) {
                return `Invalid price for fish ${i + 1}`;
            }
        }

        return null;
    };

  
    const validationError = validateSaleData(userId, quantity, fishDetails);
    if (validationError) {
        self.postMessage({ 
            success: false, 
            message: validationError 
        });
        return;
    }

  
    const TIMEOUT_MS = 10000; 

    try {
      
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), TIMEOUT_MS);

        try {
            const response = await fetch("http://localhost:3000/api/sales", {
                method: "POST",
                headers: { 
                    "Content-Type": "application/json",
                     
                    "Accept": "application/json"
                },
                body: JSON.stringify({ 
                    userId, 
                    quantity, 
                    fishDetails,
                    timestamp: new Date().toISOString() // Agregar marca de tiempo para seguimiento
                }),
                signal: controller.signal //    Conectar señal de aborto
            });

            // Borrar el tiempo de espera
            clearTimeout(timeoutId);

           
            if (!response.ok) {
                
                const errorBody = await response.text();
                self.postMessage({ 
                    success: false, 
                    message: `Sale registration failed: ${response.status} ${errorBody || response.statusText}` 
                });
                return;
            }

          
            const result = await response.json();
            self.postMessage({ 
                success: true, 
                message: result.message || "Sale registered successfully!",
                saleId: result.saleId //Si el backend devuelve un ID de venta
            });

        } catch (fetchError) {
            // Borrar el tiempo de espera en caso de error de búsqueda
            clearTimeout(timeoutId);

            // Diferenciar entre abortoController y otros errores
            if (fetchError.name === 'AbortError') {
                self.postMessage({ 
                    success: false, 
                    message: "Sale registration timed out. Please try again." 
                });
            } else {
                self.postMessage({ 
                    success: false, 
                    message: `Network error: ${fetchError.message}` 
                });
            }
        }
    } catch (error) {
        
        self.postMessage({ 
            success: false, 
            message: `Unexpected error: ${error.message}` 
        });
    }
};