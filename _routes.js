import { Home } from './pages/home/home';
import Login from './pages/login/login';
import { Register } from './pages/register/register';
import { Terms } from './pages/term/terms';
import { Inicio } from './pages/inicio/inicio'
import { CoralForm } from './pages/addpost/addpost'
import Biblioteca from './pages/biblioteca/biblioteca';

export const routes = [
    { path: '/', element: <Home /> },
    { path: '/register', element: <Register /> },
    { path: '/login', element: <Login />},
    { path: '/terms', element: <Terms />},
    { path: '/inicio', element: <Inicio />},
    { path: '/post', element: <CoralForm />},
    { path: '/biblioteca', element: <Biblioteca />}
];