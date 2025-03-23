import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./componentes/moleculas/ProtectedRoute";
import { Suspense, lazy } from "react";
 
 
 

// Lazy loading de componentes
const Login = lazy(() => import("./Pages/Login/Inicio"));
const HomeAdmin = lazy(() => import("./Pages/Admin/Home"));
const Empleado = lazy(() => import("./Pages/Empleado/User"));
const NotFound = lazy(() => import("./Notfound/NotFound"));

const LoadingFallback = () => <div>Cargando...</div>;

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <Login />
   
      </Suspense>
    ),
  },
  {
    path: "/home",
    element: (
      <ProtectedRoute>
        <Suspense fallback={<LoadingFallback />}>
          <HomeAdmin />
        </Suspense>
      </ProtectedRoute>
    ),
  },
  {
    path: "/homeUser",
    element: (
      <ProtectedRoute>
        <Suspense fallback={<LoadingFallback />}>
          <Empleado />
        </Suspense>
      </ProtectedRoute>
    ),
  },
  {
    path: "*", 
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <NotFound />
      </Suspense>
    ),
  }
]);

function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;