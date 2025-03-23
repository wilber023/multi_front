// registerUserWorker.js
self.onmessage = async function (event) {
    const { formData } = event.data;

    try {
        const response = await fetch("https://api.example.com/users", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
        });

        if (response.ok) {
            self.postMessage({ success: true, message: "User registered successfully!" });
        } else {
            self.postMessage({ success: false, message: "Failed to register user" });
        }
    } catch (error) {
        self.postMessage({ success: false, message: "An error occurred while registering" });
    }
};

