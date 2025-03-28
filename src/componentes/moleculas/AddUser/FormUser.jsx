import  { useState, useEffect, useCallback } from "react";
import Input_Main from "../../atomos/Input-Main";
import "../../../Styles/Home.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Form() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        rol: "",
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [worker, setWorker] = useState(null);

    // Crear worker con manejo de errores mejorado
    useEffect(() => {
        const newWorker = new Worker(new URL("../../workers/registerUser.js", import.meta.url));

        newWorker.onmessage = (event) => {
            const { success, message } = event.data;
            
            // Gestionar respuestas del worker
            if (success) {
                toast.success(message);
                // Resetear formulario
                setFormData({ name: "", email: "", password: "", rol: "" });
            } else {
                toast.error(message);
            }
            
            // Siempre desactivar estado de carga
            setIsSubmitting(false);
        };

        // Manejar errores del worker
        newWorker.onerror = (error) => {
            toast.error(`Error en worker: ${error.message}`);
            setIsSubmitting(false);
        };

        setWorker(newWorker);

        // Limpiar worker al desmontar
        return () => newWorker.terminate();
    }, []);

    // Manejar cambios en inputs
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    // Validación de formulario más robusta
    const validate = useCallback(() => {
        const errors = [];

        // Validación de nombre
        if (!formData.name.trim()) {
            errors.push("Nombre es requerido");
        } else if (formData.name.length < 2) {
            errors.push("Nombre debe tener al menos 2 caracteres");
        }

        // Validación de email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!formData.email.trim()) {
            errors.push("Email es requerido");
        } else if (!emailRegex.test(formData.email)) {
            errors.push("Email no es válido");
        }

        // Validación de contraseña
        if (!formData.password) {
            errors.push("Contraseña es requerida");
        } else {
            // Validaciones de contraseña más estrictas
            if (formData.password.length < 8) {
                errors.push("Contraseña debe tener al menos 8 caracteres");
            }
            if (!/[A-Z]/.test(formData.password)) {
                errors.push("Contraseña debe contener al menos una mayúscula");
            }
            if (!/[0-9]/.test(formData.password)) {
                errors.push("Contraseña debe contener al menos un número");
            }
        }

        // Validación de rol
        if (!formData.rol.trim()) {
            errors.push("Rol es requerido");
        }

        // Mostrar errores
        if (errors.length > 0) {
            errors.forEach(error => toast.error(error));
            return false;
        }

        return true;
    }, [formData]);

    // Manejar envío de formulario
    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Resetear estado de envío
        setIsSubmitting(false);

        // Validar antes de enviar
        if (validate()) {
            setIsSubmitting(true);
            
            if (worker) {
                worker.postMessage({ 
                    formData,
                    timeout: 10000 // Timeout de 10 segundos
                });
            }
        }
    };

    return (
        <form className="Form-user" onSubmit={handleSubmit}>
            <h3>Registrar Usuario</h3>
            <Input_Main 
                label="Nombre" 
                type="text" 
                placeholder="Ingresa nombre" 
                name="name" 
                value={formData.name} 
                onChange={handleChange} 
            />
            <Input_Main 
                label="Correo" 
                type="email" 
                placeholder="Ingresa correo" 
                name="email" 
                value={formData.email} 
                onChange={handleChange} 
            />
            <Input_Main 
                label="Contraseña" 
                type="password" 
                placeholder="Ingresa contraseña" 
                name="password" 
                value={formData.password} 
                onChange={handleChange} 
            />
            <Input_Main 
                label="Rol" 
                type="text" 
                placeholder="Ingresa rol" 
                name="rol" 
                value={formData.rol} 
                onChange={handleChange} 
            />
            <button 
                className="register-btn" 
                type="submit" 
                disabled={isSubmitting}
            >
                {isSubmitting ? "Registrando..." : "Registrar"}
            </button>
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
        </form>
    );
}

export default Form;