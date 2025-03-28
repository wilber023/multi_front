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
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const [worker, setWorker] = useState(null);

    useEffect(() => {
        const newWorker = new Worker(new URL("../../workers/login.js", import.meta.url));

        newWorker.onmessage = (event) => {
            const { success, role, message } = event.data;
            
         
            setIsLoading(false);

            if (success) {
   
                sessionStorage.setItem('userRole', role);
                
                toast.success("Inicio de sesión exitoso");
                
               
                switch(role) {
                    case "admin":
                        navigate("/home");
                        break;
                    case "employee":
                        navigate("/homeUser");
                        break;
                    default:
                        toast.error("Rol de usuario no reconocido");
                }
            } else {
                toast.error(message);
            }
        };

        newWorker.onerror = (error) => {
            setIsLoading(false);
            toast.error(`Error del sistema: ${error.message}`);
        };

        setWorker(newWorker);

        return () => newWorker.terminate();
    }, [navigate]);

    const handleLogin = (e) => {
        e.preventDefault();
        
       
        if (isLoading) return;

 
        const trimmedEmail = email.trim();
        const trimmedPassword = password.trim();


        if (!trimmedEmail || !trimmedPassword) {
            toast.error("Por favor, complete todos los campos");
            return;
        }

        setIsLoading(true);


        if (worker) {
            worker.postMessage({ 
                email: trimmedEmail, 
                password: trimmedPassword 
            });
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
                                    disabled={isLoading}
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
                                    disabled={isLoading}
                                />
                            </div>
                        </div>
                    </section>

                    <button 
                        type="submit" 
                        style={{ width: "240px" }}
                        disabled={isLoading}
                    >
                        {isLoading ? "Iniciando sesión..." : "Ingresar"}
                    </button>
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