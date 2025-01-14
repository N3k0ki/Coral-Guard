import { Home } from './pages/home/home';
import Login from './pages/login/login';
import { Register } from './pages/register/register';
import { Terms } from './pages/term/terms';
import { Inicio } from './pages/inicio/inicio'
import CoralForm from './pages/addpost/addpost';
import Biblioteca from './pages/biblioteca/biblioteca';
import SuccessPage from './pages/addpost/sucess/sucess';
import Admin from './pages/admin/admin';
import ProtectedRoute from './protectroute';

export const routes = [
    { path: '/', element: <Home /> },
    { path: '/register', element: <Register /> },
    { path: '/login', element: <Login />},
    { path: '/terms', element: <ProtectedRoute><Terms /></ProtectedRoute>},
    { path: '/inicio', element: <ProtectedRoute><Inicio /></ProtectedRoute>},
    { path: '/post', element: <ProtectedRoute><CoralForm /></ProtectedRoute>},
    { path: '/biblioteca', element: <ProtectedRoute><Biblioteca /></ProtectedRoute>},
    { path: '/success', element: <ProtectedRoute><SuccessPage/></ProtectedRoute>},
    { path: '/admin', element: <ProtectedRoute requiredRole="adm"><Admin/></ProtectedRoute>}
];