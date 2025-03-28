
self.onmessage = async function (event) {
    const { email, password, timeout = 10000 } = event.data;

    try {
        // Configurar un timeout para la solicitud
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), timeout);

        const response = await fetch("http://localhost:3000/api/deleteUser", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
            signal: controller.signal // Añadir señal de abort
        });

        // Limpiar el timeout
        clearTimeout(timeoutId);

        // Intentar parsear la respuesta como JSON
        const data = await response.json();

        if (response.ok) {
            self.postMessage({ 
                success: true, 
                message: data.message || "Cuenta eliminada exitosamente" 
            });
        } else {
            // Manejar diferentes códigos de error
            switch (response.status) {
                case 401:
                    self.postMessage({ 
                        success: false, 
                        message: "Credenciales incorrectas" 
                    });
                    break;
                case 404:
                    self.postMessage({ 
                        success: false, 
                        message: "Usuario no encontrado" 
                    });
                    break;
                default:
                    self.postMessage({ 
                        success: false, 
                        message: data.error || "No se pudo eliminar la cuenta" 
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