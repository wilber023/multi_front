import { useState, useEffect } from "react";
import "../../../Styles/Home.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";



function DeleteUser() {
    

    const [email, setEmail] = useState("");
    const [isConfirmVisible, setIsConfirmVisible] = useState(false);
    const [password, setPassword] = useState("");
    const [worker, setWorker] = useState(null);

    useEffect(() => {
        const newWorker = new Worker(new URL("../../workers/deleteUser.js", import.meta.url));

        newWorker.onmessage = (event) => {
            const { success, message } = event.data;
            if (success) {
                toast.success(message);
                setEmail("");
                setPassword("");
                setIsConfirmVisible(false);
            } else {
                toast.error(message);
            }
        };

        setWorker(newWorker);

        return () => newWorker.terminate(); // Limpia el worker cuando el componente se desmonta
    }, []);

    const handleDeleteClick = () => {
        if (email) {
            setIsConfirmVisible(true);
        } else {
            toast.error("Please enter an email address.");
        }
    };

    const handleConfirmDelete = () => {
        if (worker) {
            worker.postMessage({ email, password });
        }
    };

    const handleCancel = () => {
        setIsConfirmVisible(false);
        setEmail("");
        setPassword("");
    };

    return (
        <div className="delete-user">
            <h3>Delete User</h3>
            <input
                type="email"
                placeholder="Enter email to delete"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{ marginLeft: "auto", marginRight: "auto" }}
            />
            <button onClick={handleDeleteClick} style={{ marginLeft: "auto", marginRight: "auto" }}>
                Delete
            </button>

            {isConfirmVisible && (
                <div className="confirmation-popup">
                    <div className="closeDelte" onClick={handleCancel}>
                        <p className="closeDelte">X</p>
                    </div>
                    <h4>Please enter your password to confirm the deletion.</h4>
                    <input
                        type="password"
                        placeholder="Enter password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button onClick={handleConfirmDelete} style={{ backgroundColor: "red" }}>
                        Confirm
                    </button>
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

export default DeleteUser;
