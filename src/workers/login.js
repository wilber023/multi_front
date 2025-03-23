self.onmessage = async function (event) {
    const { email, password } = event.data;

    if (!email || !password) {
        self.postMessage({ success: false, message: "Por favor, complete todos los campos" });
        return;
    }

    try {
        const response = await fetch("http://localhost:3000/api/users/user", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
        });

        const data = await response.json();

        if (response.ok) {
            self.postMessage({ success: true, role: data.role });
        } else {
            self.postMessage({ success: false, message: data.message || "Error en el inicio de sesión" });
        }
    } catch (error) {
        self.postMessage({ success: false, message: "Error de red, por favor intenta más tarde" });
    }
};