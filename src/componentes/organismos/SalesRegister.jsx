import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../Styles/Sales.css";
import Input_Main from "../atomos/Input-Main";

function Sales() {

 

 
    const [userId, setUserId] = useState("");
    const [quantity, setQuantity] = useState(0);
    const [fishDetails, setFishDetails] = useState([]);
    const [showSummary, setShowSummary] = useState(false);
    const [worker, setWorker] = useState(null);

    useEffect(() => {
        const newWorker = new Worker(new URL("../../workers/registerSaleWorker.js", import.meta.url));

        newWorker.onmessage = (event) => {
            const { success, message } = event.data;
            if (success) {
                toast.success(message);
                setUserId("");
                setQuantity(0);
                setFishDetails([]);
                setShowSummary(false);
            } else {
                toast.error(message);
            }
        };

        setWorker(newWorker);

        return () => newWorker.terminate(); // Limpia el worker cuando el componente se desmonta
    }, []);

    const handleQuantityChange = (e) => {
        const value = parseInt(e.target.value) || 0;
        setQuantity(value);
        setFishDetails(Array.from({ length: value }, () => ({ weight: "", type: "", price: "" })));
    };

    const handleFishDetailChange = (index, field, value) => {
        const newFishDetails = [...fishDetails];
        newFishDetails[index] = {
            ...newFishDetails[index],
            [field]: value,
        };
        setFishDetails(newFishDetails);
    };

    const handleReviewSale = () => {
        setShowSummary(true);
    };

    const handleConfirmSale = () => {
        if (worker) {
            worker.postMessage({ userId, quantity, fishDetails });
        }
    };

    const handleCancel = () => {
        setShowSummary(false);
    };

    return (
        <div className="main-sales">
            <h1>SALES REGISTRATION</h1>

            <section>
                <Input_Main
                    label="ID User:"
                    type="number"
                    placeholder="ID address"
                    required
                    name="userId"
                    value={userId}
                    onChange={(e) => setUserId(e.target.value)}
                />
                <Input_Main
                    label="Quantity (No. of Fish):"
                    type="number"
                    placeholder="num pez address"
                    required
                    name="quantity"
                    value={quantity}
                    onChange={handleQuantityChange}
                />
            </section>

            <section className="select-pez">
                {fishDetails.map((fish, index) => (
                    <div key={index} style={{ marginBottom: "1rem" }}>
                        <Input_Main
                            label={`Fish ${index + 1} Weight:`}
                            type="number"
                            placeholder="Enter weight"
                            required
                            value={fish.weight}
                            onChange={(e) => handleFishDetailChange(index, "weight", e.target.value)}
                        />
                        <label>Type:</label>
                        <select value={fish.type} onChange={(e) => handleFishDetailChange(index, "type", e.target.value)}>
                            <option value="">Select Type</option>
                            <option value="Tilapia">Tilapia</option>
                            <option value="Bagre">Bagre</option>
                            <option value="Otro">Otro</option>
                        </select>
                        <Input_Main
                            label="Price:"
                            type="number"
                            placeholder="Enter price"
                            required
                            value={fish.price}
                            onChange={(e) => handleFishDetailChange(index, "price", e.target.value)}
                        />
                    </div>
                ))}
            </section>

            <button onClick={handleReviewSale}>Review sale</button>

            {showSummary && (
                <div className="popup-background">
                    <section className="resumen">
                        <h2>Sales summary</h2>
                        <p>
                            <strong>ID User:</strong> {userId}
                        </p>
                        <p>
                            <strong>Quantity:</strong> {quantity}
                        </p>
                        {fishDetails.map((fish, index) => (
                            <p key={index}>
                                <strong>Fish {index + 1}:</strong> Weight - {fish.weight}, Type - {fish.type}, Price -{" "}
                                {fish.price}
                            </p>
                        ))}
                        <button onClick={handleConfirmSale} style={{ width: "200px" }}>
                            Confirm and Register Sale
                        </button>
                        <button onClick={handleCancel} style={{ backgroundColor: "red", width: "200px" }}>
                            Cancel
                        </button>
                    </section>
                </div>
            )}

            <ToastContainer
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={true}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                style={{ width: "300px", marginLeft: "20px", whiteSpace: "nowrap" }}
            />
        </div>
    );
}

export default Sales;
