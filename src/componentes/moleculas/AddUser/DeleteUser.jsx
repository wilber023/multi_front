import  { useState, useEffect } from "react";
import "../../../Styles/Home.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function DeleteUser() {
    const [email, setEmail] = useState("");
    const [isConfirmVisible, setIsConfirmVisible] = useState(false);
    const [password, setPassword] = useState("");
    const [worker, setWorker] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        // Crear el worker
        const newWorker = new Worker(new URL("../../workers/deleteUser.js", import.meta.url));

        newWorker.onmessage = (event) => {
            const { success, message } = event.data;
            setIsLoading(false);
            
            if (success) {
                toast.success(message);
                setEmail("");
                setPassword("");
                setIsConfirmVisible(false);
            } else {
                toast.error(message);
            }
        };

        // Manejar errores del worker
        newWorker.onerror = (error) => {
            setIsLoading(false);
            toast.error("Error en el worker: " + error.message);
        };

        setWorker(newWorker);

        // Limpiar el worker cuando el componente se desmonta
        return () => newWorker.terminate();
    }, []);

    // Validación de email más robusta
    const handleDeleteClick = () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (!email) {
            toast.error("Por favor, introduce un email.");
            return;
        }
        
        if (!emailRegex.test(email)) {
            toast.error("Por favor, introduce un email válido.");
            return;
        }
        
        setIsConfirmVisible(true);
    };

    // Manejar confirmación de eliminación con estado de carga
    const handleConfirmDelete = () => {
        // Validar que la contraseña no esté vacía
        if (!password) {
            toast.error("Por favor, introduce tu contraseña.");
            return;
        }

        if (worker) {
            setIsLoading(true);
            worker.postMessage({ 
                email, 
                password,
                timeout: 10000 // Añadir timeout de 10 segundos
            });
        }
    };

    // Cancelar eliminación
    const handleCancel = () => {
        setIsConfirmVisible(false);
        setEmail("");
        setPassword("");
    };

    return (
        <div className="delete-user">
            <h3>Eliminar Usuario</h3>
            <input
                type="email"
                placeholder="Introduce email para eliminar"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{ 
                    marginLeft: "auto", 
                    marginRight: "auto",
                    padding: "8px",
                    width: "250px"
                }}
            />
            <button 
                onClick={handleDeleteClick} 
                style={{ 
                    marginLeft: "auto", 
                    marginRight: "auto",
                    padding: "8px 16px",
                    backgroundColor: "#ff4d4f",
                    color: "white",
                    border: "none",
                    borderRadius: "4px"
                }}
            >
                Eliminar
            </button>

            {isConfirmVisible && (
                <div className="confirmation-popup">
                    <div className="closeDelte" onClick={handleCancel}>
                        <p className="closeDelte">X</p>
                    </div>
                    <h4>Introduce tu contraseña para confirmar la eliminación</h4>
                    <input
                        type="password"
                        placeholder="Introduce contraseña"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        style={{
                            padding: "8px",
                            width: "250px",
                            marginBottom: "10px"
                        }}
                    />
                    <button 
                        onClick={handleConfirmDelete} 
                        style={{ 
                            backgroundColor: "red",
                            color: "white",
                            padding: "8px 16px",
                            border: "none",
                            borderRadius: "4px"
                        }}
                        disabled={isLoading}
                    >
                        {isLoading ? "Eliminando..." : "Confirmar"}
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
                style={{ 
                    width: "300px", 
                    marginLeft: "20px", 
                    whiteSpace: "nowrap" 
                }}
            />
        </div>
    );
}

export default DeleteUser;