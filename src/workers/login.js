
self.onmessage = async function (event) {
    const { email, password } = event.data;

 
    const validateLoginData = (email, password) => {
        if (!email || !password) {
            return "Por favor, complete todos los campos";
        }

        //validacion del amail
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return "Por favor, ingrese un correo electrónico válido";
        }

        // validacion de la contraseña
        if (password.length < 6) {
            return "La contraseña debe tener al menos 6 caracteres";
        }

        return null;
    };

 
    const validationError = validateLoginData(email, password);
    if (validationError) {
        self.postMessage({ 
            success: false, 
            message: validationError 
        });
        return;
    }

    // Configure timeout
    const TIMEOUT_MS = 10000; // 10 seconds timeout

    try {
        // Create an AbortController for timeout and cancellation
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), TIMEOUT_MS);

        try {
            const response = await fetch("http://localhost:3000/api/users/user", {
                method: "POST",
                headers: { 
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify({ 
                    email, 
                    password,
                    loginAttemptTimestamp: new Date().toISOString() 
                }),
                signal: controller.signal // Connect abort signal
            });

            // Clear the timeout
            clearTimeout(timeoutId);

            // Parse response
            const data = await response.json();

            // Detailed error handling
            if (!response.ok) {
                self.postMessage({ 
                    success: false, 
                    message: data.message || "Error en el inicio de sesión" 
                });
                return;
            }

            // Validate role
            if (!data.role) {
                self.postMessage({ 
                    success: false, 
                    message: "Información de usuario incompleta" 
                });
                return;
            }

            // Successful login
            self.postMessage({ 
                success: true, 
                role: data.role 
            });

        } catch (fetchError) {
            // Clear timeout in case of fetch error
            clearTimeout(timeoutId);

            // Differentiate between abort and other errors
            if (fetchError.name === 'AbortError') {
                self.postMessage({ 
                    success: false, 
                    message: "Tiempo de conexión agotado. Por favor, intente nuevamente." 
                });
            } else {
                self.postMessage({ 
                    success: false, 
                    message: `Error de red: ${fetchError.message}` 
                });
            }
        }
    } catch (error) {
        // Catch-all for any unexpected errors
        self.postMessage({ 
            success: false, 
            message: `Error inesperado: ${error.message}` 
        });
    }
};