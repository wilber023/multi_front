import { useState, useEffect, useMemo } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../Styles/Sales.css";

function Sales() {
    const [userId, setUserId] = useState("");
    const [quantity, setQuantity] = useState(0);
    const [fishDetails, setFishDetails] = useState([]);
    const [showSummary, setShowSummary] = useState(false);
    const [worker, setWorker] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    
    const isFormValid = useMemo(() => {
       
        if (!userId || userId.trim() === "") {
            return false;
        }

       
        if (quantity <= 0 || quantity > 10) {
            return false;
        }

 
        return fishDetails.every(fish => 
            fish.weight && 
            parseFloat(fish.weight) > 0 && 
            fish.type && 
            fish.price && 
            parseFloat(fish.price) > 0
        );
    }, [userId, quantity, fishDetails]);

    useEffect(() => {
        const newWorker = new Worker(new URL("../../workers/registerSale.js", import.meta.url));

        newWorker.onmessage = (event) => {
            const { success, message, saleId } = event.data;
            setIsLoading(false);

            if (success) {
                toast.success(message);
                console.log(`Sale registered with ID: ${saleId}`);
                resetForm();
            } else {
                toast.error(message);
            }
        };

        newWorker.onerror = (error) => {
            setIsLoading(false);
            toast.error(`Worker error: ${error.message}`);
        };

        setWorker(newWorker);

        return () => newWorker.terminate();
    }, []);

    const resetForm = () => {
        setUserId("");
        setQuantity(0);
        setFishDetails([]);
        setShowSummary(false);
        setIsLoading(false);
    };

    const handleQuantityChange = (e) => {
        const value = Math.min(Math.max(parseInt(e.target.value) || 0, 0), 10);
        setQuantity(value);
        setFishDetails(
            Array.from({ length: value }, () => ({ 
                weight: "", 
                type: "", 
                price: "" 
            }))
        );
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
        if (!isFormValid) {
            toast.error("Please complete all fields correctly");
            return;
        }
        setShowSummary(true);
    };

    const handleConfirmSale = () => {
        if (!isFormValid) {
            toast.error("Please check all sale details");
            return;
        }

        if (worker && !isLoading) {
            setIsLoading(true);
            worker.postMessage({ 
                userId, 
                quantity, 
                fishDetails 
            });
        }
    };

    const handleCancel = () => {
        setShowSummary(false);
    };

    return (
        <div className="main-sales">
            <h1>SALES REGISTRATION</h1>

            <section>
                <input
                    type="text"
                    value={userId}
                    onChange={(e) => setUserId(e.target.value)}
                    placeholder="User ID"
                    disabled={isLoading}
                />
                <input
                    type="number"
                    value={quantity}
                    onChange={handleQuantityChange}
                    placeholder="Number of Fish"
                    min="0"
                    max="10"
                    disabled={isLoading}
                />
            </section>

            <section className="fish-details">
                {fishDetails.map((fish, index) => (
                    <div key={index}>
                        <input
                            type="number"
                            value={fish.weight}
                            onChange={(e) => handleFishDetailChange(index, "weight", e.target.value)}
                            placeholder={`Fish ${index + 1} Weight`}
                            disabled={isLoading}
                        />
                        <select
                            value={fish.type}
                            onChange={(e) => handleFishDetailChange(index, "type", e.target.value)}
                            disabled={isLoading}
                        >
                            <option value="">Select Fish Type</option>
                            <option value="Tilapia">Tilapia</option>
                            <option value="Bagre">Bagre</option>
                            <option value="Otro">Otro</option>
                        </select>
                        <input
                            type="number"
                            value={fish.price}
                            onChange={(e) => handleFishDetailChange(index, "price", e.target.value)}
                            placeholder={`Fish ${index + 1} Price`}
                            disabled={isLoading}
                        />
                    </div>
                ))}
            </section>

            <button 
                onClick={handleReviewSale} 
                disabled={isLoading || !isFormValid}
            >
                Review Sale
            </button>

            {showSummary && (
                <div className="popup-summary">
                    <h2>Sale Summary</h2>
                    <p>User ID: {userId}</p>
                    <p>Quantity: {quantity}</p>
                    {fishDetails.map((fish, index) => (
                        <div key={index}>
                            <p>Fish {index + 1}: 
                                Weight: {fish.weight}, 
                                Type: {fish.type}, 
                                Price: {fish.price}
                            </p>
                        </div>
                    ))}
                    <button 
                        onClick={handleConfirmSale}
                        disabled={isLoading}
                    >
                        {isLoading ? "Processing..." : "Confirm Sale"}
                    </button>
                    <button 
                        onClick={handleCancel}
                        disabled={isLoading}
                    >
                        Cancel
                    </button>
                </div>
            )}

            <ToastContainer />
        </div>
    );
}

export default Sales;