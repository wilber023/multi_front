import { useState, useEffect } from "react";
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

    useEffect(() => {
        const newWorker = new Worker(new URL("../../workers/registerUserWorker.js", import.meta.url));

        newWorker.onmessage = (event) => {
            const { success, message } = event.data;
            if (success) {
                toast.success(message);
                setFormData({ name: "", email: "", password: "", rol: "" });
            } else {
                toast.error(message);
            }
            setIsSubmitting(false);
        };

        setWorker(newWorker);

        return () => newWorker.terminate(); // Limpia el worker cuando el componente se desmonta
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const validate = () => {
        if (!formData.name.trim()) {
            toast.error("Name is required");
            return false;
        }
        if (!formData.email) {
            toast.error("Email is required");
            return false;
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            toast.error("Email address is invalid");
            return false;
        }
        if (!formData.password) {
            toast.error("Password is required");
            return false;
        } else if (formData.password.length < 6) {
            toast.error("Password must be at least 6 characters");
            return false;
        }
        if (!formData.rol.trim()) {
            toast.error("Role is required");
            return false;
        }
        return true;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            setIsSubmitting(true);
            if (worker) {
                worker.postMessage({ formData });
            }
        }
    };

    return (
        <form className="Form-user" onSubmit={handleSubmit}>
            <h3>Add User</h3>
            <Input_Main label="name" type="text" placeholder="Insert name" name="name" value={formData.name} onChange={handleChange} />
            <Input_Main label="e-mail" type="email" placeholder="Insert email" name="email" value={formData.email} onChange={handleChange} />
            <Input_Main label="password" type="password" placeholder="Insert password" name="password" value={formData.password} onChange={handleChange} />
            <Input_Main label="rol" type="text" placeholder="Insert role" name="rol" value={formData.rol} onChange={handleChange} />
            <button className="register-btn" type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Registering..." : "Register"}
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
