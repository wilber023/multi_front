// registerSaleWorker.js
self.onmessage = async function (event) {
    const { userId, quantity, fishDetails } = event.data;

    if (!userId || quantity <= 0 || fishDetails.length === 0) {
        self.postMessage({ success: false, message: "Invalid sale data" });
        return;
    }

    try {
        const response = await fetch("http://localhost:3000/api/sales", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ userId, quantity, fishDetails }),
        });

        if (response.ok) {
            self.postMessage({ success: true, message: "Sale registered successfully!" });
        } else {
            self.postMessage({ success: false, message: "Failed to register sale" });
        }
    } catch (error) {
        self.postMessage({ success: false, message: "Error connecting to server" });
    }
};