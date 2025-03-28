import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./componentes/moleculas/ProtectedRoute";
import { Suspense, lazy } from "react";
import './Styles/login.css'
// Lazy loading de componentes
const Login = lazy(() => import("./Pages/Login/Inicio"));
const HomeAdmin = lazy(() => import("./Pages/Admin/Home"));
const Empleado = lazy(() => import("./Pages/Empleado/User"));
const NotFound = lazy(() => import("./Notfound/NotFound"));

// Componente de carga
const LoadingFallback = () => (
  <div className="flex items-center justify-center h-screen">
    <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-blue-500 border-solid"></div>
    <span className="ml-2 text-gray-600 text-lg font-medium color">Cargando...</span>
  </div>
);

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
