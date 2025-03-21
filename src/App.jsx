import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./componentes/moleculas/ProtectedRoute";
import Login from "./Pages/Login/Inicio";
import HomeAdmin from "./Pages/Admin/Home";
import Empleado from "./Pages/Empleado/User";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/home",
    element: (
      <ProtectedRoute>
        <HomeAdmin />
      </ProtectedRoute>
    ),
  },
  {
    path: "/homeUser",
    element: (
      <ProtectedRoute>
        <Empleado />
      </ProtectedRoute>
    ),
  },
]);

function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;
