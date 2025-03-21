import { useState } from "react";
import Input_Main from "../../componentes/atomos/Input-Main";
import { FaEnvelope, FaKey } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import logo from '../../Images/logo.png'

import "../../Styles/login.css";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
    
        if (!email || !password) {
            toast.info("Por favor, complete todos los campos");
            return;
        }
    
        setErrorMessage("");
    
        try {
            const response = await fetch("http://localhost:3000/api/users/user", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });
    
            const data = await response.json();
    
            if (response.ok) {
                toast.success("Inicio de sesión exitoso");
    
                if (data.role === "admin") {
                    navigate('/home');
                } else if (data.role === "employee") {
                    navigate('/homeUser');
                } else {
                    toast.error("Rol desconocido");
                }
            } else {
                toast.error(data.message || "Error en el inicio de sesión");
            }
        } catch (error) {
            toast.error("Error de red, por favor intenta más tarde");
            console.error("Error:", error);
        }
    };

    return (
        <div className="container">
            <div className="main">
                <div className="text">
                    <h1>Login</h1>
                    <img className="logoInicio" src={logo} alt="The Sea Cava" />
                     <p>Por favor, complete todos los campos</p>
                </div>

                {errorMessage && <p className="error-message">{errorMessage}</p>}

                <form onSubmit={handleLogin}>
                    <section>
                        <div className="input-container">
                            <FaEnvelope style={{ marginRight: "8px" }} />
                            <Input_Main
                                type="email"
                                placeholder="email address"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                name="email"
                            />
                        </div>
                        <div className="input-container">
                            <FaKey style={{ marginRight: "8px" }} />
                            <Input_Main
                                type="password"
                                placeholder="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                name="password"
                            />
                        </div>
                    </section>

                    <button type="submit" style={{width:'240px'}}>Ingresar</button>
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
                style={{ width: "350px", marginLeft: "20px",  whiteSpace: "nowrap"}} />

            
        </div>
    );
}

export default Login;
