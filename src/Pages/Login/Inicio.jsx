import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../Styles/login.css";
import Input_Main from "../../componentes/atomos/Input-Main";
import { FaEnvelope, FaKey } from "react-icons/fa";
import logo from "../../Images/logo.png";

function Login() {


    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const [worker, setWorker] = useState(null);

    useEffect(() => {
        const newWorker = new Worker(new URL("../../workers/login.js", import.meta.url));

        newWorker.onmessage = (event) => {
            const { success, role, message } = event.data;
            if (success) {
                toast.success("Inicio de sesión exitoso");
                if (role === "admin") {
                    navigate("/home");
                } else if (role === "employee") {
                    navigate("/homeUser");
                } else {
                    toast.error("Rol desconocido");
                }
            } else {
                toast.error(message);
            }
        };

        setWorker(newWorker);

        return () => newWorker.terminate(); // Limpia el worker cuando el componente se desmonta
    }, []);

    const handleLogin = (e) => {
        e.preventDefault();
        if (worker) {
            worker.postMessage({ email, password });
        }
    };

    return (
        <div className="container">
<div className="main">
    <div className="text">
        <h1>system access</h1>
        <img className="logoInicio" src={logo} alt="The Sea Cava" />
        <p id="complete">Por favor, complete todos los campos</p>
    </div>

    <form onSubmit={handleLogin}>
        <section className="section-input">
            <div className="input-container">
                <label htmlFor="email">Correo Electrónico</label>
                <div className="input-wrapper">
                    <FaEnvelope/>
                    <Input_Main
                        type="email"
                        id="email"
                        placeholder="email address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        name="email"
                    />
                </div>
            </div>
            <div className="input-container">
                <label htmlFor="password">Contraseña</label>
                <div className="input-wrapper">
                    <FaKey />
                    <Input_Main
                        type="password"
                        id="password"
                        placeholder="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        name="password"
                    />
                </div>
            </div>
        </section>

        <button type="submit" style={{ width: "240px" }}>Ingresar</button>
    </form>
</div>


            <ToastContainer
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                style={{ width: "350px", marginLeft: "20px", whiteSpace: "nowrap" }}
            />
        </div>
    );
}

export default Login;
