
self.onmessage = async function (event) {
    const { formData, timeout = 10000 } = event.data;

    try {
        // Configurar un timeout para la solicitud
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), timeout);

        const response = await fetch("https://api.example.com/users", {
            method: "POST",
            headers: { 
                "Content-Type": "application/json",
                // Puedes añadir headers adicionales si es necesario
                "Accept": "application/json"
            },
            body: JSON.stringify(formData),
            signal: controller.signal
        });

        // Limpiar el timeout
        clearTimeout(timeoutId);

        // Intentar parsear la respuesta como JSON
        const data = await response.json();

        if (response.ok) {
            self.postMessage({ 
                success: true, 
                message: data.message || "Usuario registrado exitosamente" 
            });
        } else {
            // Manejar diferentes códigos de error
            switch (response.status) {
                case 400:
                    self.postMessage({ 
                        success: false, 
                        message: "Datos de registro inválidos" 
                    });
                    break;
                case 409:
                    self.postMessage({ 
                        success: false, 
                        message: "El usuario ya existe" 
                    });
                    break;
                default:
                    self.postMessage({ 
                        success: false, 
                        message: data.error || "No se pudo registrar el usuario" 
                    });
            }
        }
    } catch (error) {
        // Manejar diferentes tipos de errores
        if (error.name === 'AbortError') {
            self.postMessage({ 
                success: false, 
                message: "La solicitud ha excedido el tiempo límite" 
            });
        } else if (error.name === 'TypeError') {
            self.postMessage({ 
                success: false, 
                message: "Error de red. Comprueba tu conexión" 
            });
        } else {
            self.postMessage({ 
                success: false, 
                message: error.message || "Error al conectar con el servidor" 
            });
        }
    }
};