    // deleteUserWorker.js
    self.onmessage = async function (event) {
        const { email, password } = event.data;
    
        try {
            const response = await fetch("http://localhost:3000/api/deleteUser", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });
    
            if (response.ok) {
                self.postMessage({ success: true, message: "Account deleted successfully" });
            } else {
                self.postMessage({ success: false, message: "Failed to delete account" });
            }
        } catch (error) {
            self.postMessage({ success: false, message: "Error connecting to server" });
        }
    };